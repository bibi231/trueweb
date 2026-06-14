import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rateLimit";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    // 5 signups per IP per 10 minutes — blocks automated account creation.
    const limited = enforceRateLimit(req, "register", 5, 10 * 60 * 1000);
    if (limited) return limited;

    const { name, email, password } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim()))
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
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
    const emailLower = email.toLowerCase();
    await db.insert(users).values({ id: randomUUID(), name: name?.trim() || null, email: emailLower, password: hash, role: "client" });

    // Send an email-verification link (best-effort — never block signup on it).
    try {
      const { verificationTokens } = await import("@/lib/db/schema");
      const token = randomUUID();
      await db.insert(verificationTokens).values({
        identifier: emailLower,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
      });
      if (process.env.RESEND_API_KEY) {
        const origin = process.env.NEXTAUTH_URL || process.env.AUTH_URL || "https://trueweb.com.ng";
        const verifyUrl = `${origin}/api/portal/verify?token=${token}&email=${encodeURIComponent(emailLower)}`;
        const { getResend } = await import("@/lib/email/client");
        await getResend().emails.send({
          from: process.env.EMAIL_FROM ?? "TrueWeb <hello@trueweb.com.ng>",
          to: emailLower,
          subject: "Confirm your TrueWeb email",
          html: `<div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto">
            <h2 style="color:#0b3bad">Welcome to TrueWeb${name?.trim() ? `, ${name.trim()}` : ""}!</h2>
            <p>Confirm your email address to secure your account:</p>
            <p><a href="${verifyUrl}" style="display:inline-block;background:#00d4d4;color:#050507;font-weight:700;padding:12px 22px;border-radius:8px;text-decoration:none">Verify my email</a></p>
            <p style="color:#666;font-size:13px">This link expires in 24 hours. If you didn't create a TrueWeb account, you can ignore this email.</p>
          </div>`,
        });
      }
    } catch (mailErr) {
      console.error("[register] verification email failed:", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
