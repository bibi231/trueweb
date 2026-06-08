import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  email: z.string().email(),
  source: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = Schema.safeParse(body);
    if (!data.success) {
      return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
    }

    const { email, source } = data.data;

    /* Mirror to Resend audience */
    const resendKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (resendKey && audienceId) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          unsubscribed: false,
          data: { source: source || "trueweb-footer" },
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
