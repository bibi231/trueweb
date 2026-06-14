export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getOrCreateAffiliate } from "@/lib/affiliate";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  try {
    const aff = await getOrCreateAffiliate(session.user.id);
    return NextResponse.json({
      code: aff.code,
      link: `https://trueweb.com.ng/?ref=${aff.code}`,
      commissionRate: parseFloat(aff.commissionRate ?? "0.04"),
      totalEarnedKobo: aff.totalEarnedKobo ?? 0,
      pendingPayoutKobo: aff.pendingPayoutKobo ?? 0,
      paidOutKobo: aff.paidOutKobo ?? 0,
      payoutRequested: aff.payoutRequested ?? false,
    });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
