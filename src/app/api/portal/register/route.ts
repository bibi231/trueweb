import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!email || typeof email !== "string") return NextResponse.json({ error: "Email required" }, { status: 400 });
    if (!password || typeof password !== "string" || password.length < 8)
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

    const { db } = await import("@/lib/db");
    const { users } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");
    const bcrypt = (await import("bcryptjs")).default;
    const { randomUUID } = await import("crypto");

    const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    if (existing.length > 0)
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });

    const hash = await bcrypt.hash(password, 12);
    await db.insert(users).values({ id: randomUUID(), name: name?.trim() || null, email: email.toLowerCase(), password: hash, role: "client" });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
