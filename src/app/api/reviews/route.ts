export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

const SubmitSchema = z.object({
  projectId: z.number().optional(),
  rating: z.number().min(1).max(5),
  quote: z.string().min(10).max(400),
  authorRole: z.string().optional(),
});

export async function GET() {
  try {
    const rows = await db.select().from(reviews).where(eq(reviews.approved, true)).orderBy(desc(reviews.createdAt)).limit(20);
    return NextResponse.json({ reviews: rows });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const body = await req.json();
    const data = SubmitSchema.safeParse(body);
    if (!data.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });

    const { projectId, rating, quote, authorRole } = data.data;

    const [review] = await db.insert(reviews).values({
      projectId: projectId ?? null,
      userId: session.user.id,
      rating,
      quote,
      authorName: session.user.name ?? "Client",
      authorRole: authorRole ?? null,
      approved: false,
    }).returning();

    return NextResponse.json({ success: true, review });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
