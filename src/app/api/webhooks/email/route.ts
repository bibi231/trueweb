export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletter } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Resend sends webhook events: email.bounced, email.complained, email.delivered, etc.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const type = body.type as string | undefined;
  const data = (body.data ?? {}) as Record<string, unknown>;
  const toEmail = (data.to as string[] | string | undefined);
  const email = Array.isArray(toEmail) ? toEmail[0] : toEmail;

  if (!email) return NextResponse.json({ ok: true });

  try {
    if (type === "email.bounced") {
      // Mark as bounced in newsletter table if present
      await db.update(newsletter)
        .set({ unsubscribed: true })
        .where(eq(newsletter.email, email));
      console.log(`[email-webhook] bounced: ${email}`);
    }

    if (type === "email.complained") {
      await db.update(newsletter)
        .set({ unsubscribed: true })
        .where(eq(newsletter.email, email));
      console.log(`[email-webhook] spam complaint: ${email}`);
    }
  } catch (err) {
    console.error("[email-webhook] db error:", err);
  }

  return NextResponse.json({ ok: true });
}
