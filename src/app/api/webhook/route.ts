export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/squad";
import { db } from "@/lib/db";
import { leads, invoices, users } from "@/lib/db/schema";
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
    const txRef = data.transaction_ref as string;
    const amountNgn = Number(data.amount ?? 0);
    const customerEmail = (data.customer?.email ?? data.email ?? "") as string;
    const date = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

    // Update lead as paid
    try {
      await db
        .update(leads)
        .set({ status: "paid" })
        .where(eq(leads.id, Number(data?.metadata?.leadId ?? 0)));
    } catch { /* no-op if no leadId */ }

    // Update invoice if exists
    if (data?.metadata?.invoiceId) {
      try {
        await db
          .update(invoices)
          .set({ status: "paid", paidAt: new Date() })
          .where(eq(invoices.id, Number(data.metadata.invoiceId)));
      } catch { /* no-op */ }
    }

    // Send payment receipt email
    if (process.env.RESEND_API_KEY && customerEmail) {
      try {
        const { sendPaymentReceipt } = await import("@/lib/email/send");
        // Determine site from txRef prefix
        const site =
          txRef.startsWith("TW-") ? "trueweb" :
          txRef.startsWith("SAI-") ? "supportai" :
          txRef.startsWith("RAI-") ? "replyai" :
          txRef.startsWith("HAI-") ? "harvestai" : "trueweb";

        // Look up name from users table
        let customerName: string | undefined;
        try {
          const [user] = await db.select({ name: users.name }).from(users).where(eq(users.email, customerEmail));
          customerName = user?.name ?? undefined;
        } catch { /* no-op */ }

        await sendPaymentReceipt(site, customerEmail, {
          name: customerName,
          amountNgn,
          txRef,
          plan: data?.metadata?.plan as string | undefined,
          date,
        });
      } catch (emailErr) {
        console.error("[webhook] payment receipt email failed:", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
