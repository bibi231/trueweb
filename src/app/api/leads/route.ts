import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

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

const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrusgadzama02@gmail.com", "bitrus@trueweb.ng"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = LeadSchema.safeParse(body);
    if (!data.success) {
      return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
    }

    const lead = data.data;

    // Save to DB
    try {
      await db.insert(leads).values({
        name: lead.name,
        email: lead.email,
        siteType: lead.siteType,
        budget: lead.budget,
        timeline: lead.timeline,
        features: lead.features?.join(", "),
        idea: lead.idea,
        source: lead.source ?? "build-flow",
        status: "new",
      });
    } catch (dbErr) {
      console.error("[leads] db insert failed:", dbErr);
    }

    // Email owner notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { sendLeadNotification } = await import("@/lib/email/send");
        await Promise.all(
          OWNER_EMAILS.map((ownerEmail) =>
            sendLeadNotification(ownerEmail, {
              name: lead.name,
              email: lead.email,
              siteType: lead.siteType,
              budget: lead.budget,
              timeline: lead.timeline,
              idea: lead.idea,
            })
          )
        );
      } catch (emailErr) {
        console.error("[leads] email failed:", emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
