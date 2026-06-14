export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { affiliates, affiliateConversions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const [aff] = await db.select().from(affiliates).where(eq(affiliates.userId, session.user.id)).limit(1);
    if (!aff) return NextResponse.json({ conversions: [] });

    const rows = await db
      .select()
      .from(affiliateConversions)
      .where(eq(affiliateConversions.affiliateId, aff.id))
      .orderBy(desc(affiliateConversions.createdAt))
      .limit(100);

    return NextResponse.json({ conversions: rows });
  } catch {
    return NextResponse.json({ conversions: [] });
  }
}
