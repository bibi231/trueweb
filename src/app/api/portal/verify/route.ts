import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Confirms a self-serve signup's email. The link is emailed at registration.
// Non-blocking by design: an unverified account can still sign in — verification
// just flips users.email_verified so we can gate sensitive actions later and
// prove the address is real. Invalid/expired links redirect back to login.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  const email = (url.searchParams.get("email") ?? "").toLowerCase();
  const loginUrl = new URL("/portal/login", url.origin);

  if (!token || !email) {
    loginUrl.searchParams.set("verifyError", "1");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { db } = await import("@/lib/db");
    const { users, verificationTokens } = await import("@/lib/db/schema");
    const { eq, and } = await import("drizzle-orm");

    const [vt] = await db
      .select()
      .from(verificationTokens)
      .where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, token)))
      .limit(1);

    if (!vt || new Date(vt.expires).getTime() < Date.now()) {
      loginUrl.searchParams.set("verifyError", "1");
      return NextResponse.redirect(loginUrl);
    }

    await db.update(users).set({ emailVerified: new Date() }).where(eq(users.email, email));
    // One-time use: remove the token (and any others for this email).
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

    loginUrl.searchParams.set("verified", "1");
    return NextResponse.redirect(loginUrl);
  } catch (err) {
    console.error("[verify]", err);
    loginUrl.searchParams.set("verifyError", "1");
    return NextResponse.redirect(loginUrl);
  }
}
