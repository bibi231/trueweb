export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { messages, conversations } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { isTeam, getOrCreateClientConversation } from "@/lib/messaging";
import { enforceRateLimit } from "@/lib/rateLimit";

/** A client may only touch their own conversation; team can touch any. */
async function authorizeConversation(session: { user?: { id?: string } } | null, conversationId: number, team: boolean) {
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, conversationId)).limit(1);
  if (!conv) return null;
  if (!team && conv.clientId !== session?.user?.id) return null;
  return conv;
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const conversationId = Number(searchParams.get("conversationId") ?? 0);

  try {
    const team = await isTeam(session);
    let convId = conversationId;
    if (!team && !convId) convId = (await getOrCreateClientConversation(session.user.id)).id;

    const conv = await authorizeConversation(session, convId, team);
    if (!conv) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

    const rows = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, convId))
      .orderBy(asc(messages.createdAt))
      .limit(500);

    // Mark this side's unread as cleared.
    await db
      .update(conversations)
      .set(team ? { unreadAdmin: 0 } : { unreadClient: 0 })
      .where(eq(conversations.id, convId));

    return NextResponse.json({ messages: rows, conversationId: convId });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  // 30 messages per IP per minute — generous for real chat, blocks flooding.
  const limited = enforceRateLimit(req, "messages", 30, 60 * 1000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const content = (body.content ?? "").toString().trim();
    const type = (body.type ?? "text").toString();
    const meta = body.meta ?? null;
    if (!content && type === "text") return NextResponse.json({ error: "EMPTY" }, { status: 400 });

    const team = await isTeam(session);
    let convId = Number(body.conversationId ?? 0);
    if (!team) convId = (await getOrCreateClientConversation(session.user.id)).id;

    const conv = await authorizeConversation(session, convId, team);
    if (!conv) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

    const senderRole = team ? "admin" : "client";
    const [created] = await db
      .insert(messages)
      .values({ conversationId: convId, senderId: session.user.id, senderRole, content, type, meta })
      .returning();

    // Bump thread metadata + unread counter for the OTHER side.
    await db
      .update(conversations)
      .set({
        lastMessageAt: new Date(),
        lastMessageText: content.slice(0, 140),
        ...(team
          ? { unreadClient: sql`${conversations.unreadClient} + 1` }
          : { unreadAdmin: sql`${conversations.unreadAdmin} + 1` }),
      })
      .where(eq(conversations.id, convId));

    return NextResponse.json({ message: created });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
