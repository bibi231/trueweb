export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { affiliates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const MIN_PAYOUT_KOBO = 500000; // ₦5,000 minimum before a payout can be requested

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  try {
    const [aff] = await db.select().from(affiliates).where(eq(affiliates.userId, session.user.id)).limit(1);
    if (!aff) return NextResponse.json({ error: "NO_AFFILIATE" }, { status: 404 });

    if ((aff.pendingPayoutKobo ?? 0) < MIN_PAYOUT_KOBO) {
      return NextResponse.json(
        { error: "BELOW_MINIMUM", minKobo: MIN_PAYOUT_KOBO },
        { status: 400 }
      );
    }

    await db.update(affiliates).set({ payoutRequested: true }).where(eq(affiliates.id, aff.id));

    // Notify the owner that a payout was requested (best-effort).
    if (process.env.RESEND_API_KEY) {
      try {
        const { getResend } = await import("@/lib/email/client");
        await getResend().emails.send({
          from: process.env.EMAIL_FROM ?? "TrueWeb <hello@trueweb.com.ng>",
          to: "bitrus@trueweb.ng",
          subject: `Affiliate payout requested — ${aff.code}`,
          text: `Affiliate ${aff.code} (user ${session.user.email}) requested a payout of ₦${((aff.pendingPayoutKobo ?? 0) / 100).toLocaleString()}.`,
        });
      } catch { /* no-op */ }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
