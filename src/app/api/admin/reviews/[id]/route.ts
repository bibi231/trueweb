export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrus@trueweb.ng"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.email || !OWNER_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const { id } = await params;
    const reviewId = parseInt(id, 10);
    if (isNaN(reviewId)) return NextResponse.json({ error: "INVALID_ID" }, { status: 400 });

    const body = await req.json();
    const updates: Record<string, unknown> = {};
    if (typeof body.approved === "boolean") updates.approved = body.approved;
    if (typeof body.featured === "boolean") updates.featured = body.featured;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "NO_CHANGES" }, { status: 400 });
    }

    await db.update(reviews).set(updates).where(eq(reviews.id, reviewId));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
