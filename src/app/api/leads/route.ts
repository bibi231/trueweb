import { NextResponse } from "next/server";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  siteType: z.string().max(100).optional(),
  pages: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  budget: z.string().max(60).optional(),
  timeline: z.string().max(60).optional(),
  idea: z.string().max(3000).optional(),
  source: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = LeadSchema.safeParse(body);
    if (!data.success) {
      return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
    }

    const lead = data.data;

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const text = [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Site type: ${lead.siteType || "—"}`,
        `Pages: ${lead.pages?.join(", ") || "—"}`,
        `Features: ${lead.features?.join(", ") || "—"}`,
        `Budget: ${lead.budget || "—"}`,
        `Timeline: ${lead.timeline || "—"}`,
        `Idea: ${lead.idea || "—"}`,
      ].join("\n");

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TrueWeb Leads <noreply@trueweb.com.ng>",
          to: ["hello@trueweb.com.ng"],
          subject: `New project brief from ${lead.name} — ${lead.siteType || "Website"}`,
          text,
          reply_to: lead.email,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
