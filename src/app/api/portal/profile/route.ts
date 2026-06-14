import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!(session?.user as { id?: string } | undefined)?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session!.user as { id: string }).id;

  const body = await req.json();
  const { name, currentPassword, newPassword, image } = body;

  const { db } = await import("@/lib/db");
  const { users } = await import("@/lib/db/schema");
  const { eq } = await import("drizzle-orm");

  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name?.trim() || null;
  if (image !== undefined) updates.image = image;

  if (newPassword) {
    if (!currentPassword) return NextResponse.json({ error: "Current password required" }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });

    const bcrypt = (await import("bcryptjs")).default;
    const [user] = await db.select({ password: users.password }).from(users).where(eq(users.id, userId)).limit(1);
    if (!user?.password) return NextResponse.json({ error: "Password changes are not available for OAuth accounts" }, { status: 400 });
    if (!(await bcrypt.compare(currentPassword, user.password)))
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    updates.password = await bcrypt.hash(newPassword, 12);
  }

  if (Object.keys(updates).length > 0)
    await db.update(users).set(updates).where(eq(users.id, userId));

  return NextResponse.json({ ok: true });
}
