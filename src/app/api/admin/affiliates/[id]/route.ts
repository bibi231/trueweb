export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { affiliates, affiliateConversions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrus@trueweb.ng"];

/** Mark an affiliate's pending commissions as paid out (after a bank transfer). */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.email || !OWNER_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const { id } = await params;

    const [aff] = await db.select().from(affiliates).where(eq(affiliates.id, id)).limit(1);
    if (!aff) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

    const pending = aff.pendingPayoutKobo ?? 0;

    // Mark all pending conversions paid and move the pending balance to paid.
    await db
      .update(affiliateConversions)
      .set({ status: "paid" })
      .where(eq(affiliateConversions.affiliateId, aff.id));

    await db
      .update(affiliates)
      .set({
        pendingPayoutKobo: 0,
        paidOutKobo: (aff.paidOutKobo ?? 0) + pending,
        payoutRequested: false,
      })
      .where(eq(affiliates.id, aff.id));

    return NextResponse.json({ ok: true, paidKobo: pending });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
