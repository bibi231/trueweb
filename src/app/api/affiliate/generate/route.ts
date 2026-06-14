export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { regenerateCode } from "@/lib/affiliate";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  try {
    const aff = await regenerateCode(session.user.id);
    return NextResponse.json({
      code: aff.code,
      link: `https://trueweb.com.ng/?ref=${aff.code}`,
    });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
