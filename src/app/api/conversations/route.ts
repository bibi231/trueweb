export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { isTeam, getOrCreateClientConversation } from "@/lib/messaging";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  try {
    if (await isTeam(session)) {
      const rows = await db
        .select({
          id: conversations.id,
          clientId: conversations.clientId,
          subject: conversations.subject,
          status: conversations.status,
          lastMessageAt: conversations.lastMessageAt,
          lastMessageText: conversations.lastMessageText,
          unreadAdmin: conversations.unreadAdmin,
          clientName: users.name,
          clientEmail: users.email,
        })
        .from(conversations)
        .leftJoin(users, eq(users.id, conversations.clientId))
        .orderBy(desc(conversations.lastMessageAt))
        .limit(200);
      return NextResponse.json({ conversations: rows, isTeam: true });
    }

    // Client: their single thread.
    const conv = await getOrCreateClientConversation(session.user.id);
    return NextResponse.json({ conversations: [conv], isTeam: false });
  } catch {
    return NextResponse.json({ conversations: [], isTeam: false });
  }
}
