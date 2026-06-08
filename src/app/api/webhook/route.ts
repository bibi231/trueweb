import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/squad";
import { db } from "@/lib/db";
import { leads, invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("x-squad-encrypted-body") ?? "";

  if (!verifyWebhookSignature(rawBody, sig)) {
    return NextResponse.json({ error: "INVALID_SIGNATURE" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const { event: eventType, data } = event;

  if (eventType === "charge_successful" && data?.transaction_ref) {
    /* Update lead as paid */
    await db
      .update(leads)
      .set({ status: "paid" })
      .where(eq(leads.id, Number(data?.metadata?.leadId ?? 0)));

    /* Update invoice if exists */
    if (data?.metadata?.invoiceId) {
      await db
        .update(invoices)
        .set({ status: "paid", paidAt: new Date() })
        .where(eq(invoices.id, Number(data.metadata.invoiceId)));
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
