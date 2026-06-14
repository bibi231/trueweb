export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/squad";
import { db } from "@/lib/db";
import { leads, invoices, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { recordConversion } from "@/lib/affiliate";

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

    // Affiliate commission: if this payment carried a referral code, credit the
    // referrer. Idempotent on txRef so webhook retries won't double-pay.
    const affiliateRef = (data?.metadata?.affiliateRef ?? "") as string;
    if (affiliateRef) {
      try {
        // Squad sends amount in naira; commissions are tracked in kobo.
        await recordConversion({
          code: affiliateRef,
          amountKobo: Math.round(amountNgn * 100),
          referredEmail: customerEmail || undefined,
          paymentRef: txRef,
        });
      } catch (affErr) {
        console.error("[webhook] affiliate conversion failed:", affErr);
      }
    }

    // Auto-provision a client account for the paying email (TrueWeb payments).
    // If they don't already have an account, create one with a generated
    // password and email them their login so they land straight in the portal.
    if (customerEmail && txRef.startsWith("TW-")) {
      try {
        const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, customerEmail)).limit(1);
        if (!existing) {
          const bcrypt = (await import("bcryptjs")).default;
          const crypto = await import("crypto");
          const tempPassword = crypto.randomBytes(6).toString("base64url");
          const hashed = await bcrypt.hash(tempPassword, 10);
          const name = (data.customer?.name ?? data.customer_name ?? customerEmail.split("@")[0]) as string;
          await db.insert(users).values({ id: crypto.randomUUID(), email: customerEmail, name, password: hashed, role: "client" });

          if (process.env.RESEND_API_KEY) {
            const { getResend } = await import("@/lib/email/client");
            await getResend().emails.send({
              from: process.env.EMAIL_FROM ?? "TrueWeb <hello@trueweb.com.ng>",
              to: customerEmail,
              subject: "Your TrueWeb client account is ready",
              html: `<div style="font-family:system-ui,Arial,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
                <h2 style="color:#0d9488">Welcome to TrueWeb, ${name}</h2>
                <p>Thanks for your payment. We've created a client portal account for you, where you can track your project, message our team, and view invoices.</p>
                <p style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:14px 16px">
                  <strong>Email:</strong> ${customerEmail}<br/>
                  <strong>Temporary password:</strong> <code style="font-size:15px">${tempPassword}</code>
                </p>
                <p><a href="https://trueweb.com.ng/portal/login" style="display:inline-block;background:#0d9488;color:#fff;text-decoration:none;padding:11px 22px;border-radius:9px;font-weight:600">Open your portal</a></p>
                <p style="color:#64748b;font-size:13px">For your security, please change this password after you sign in.</p>
              </div>`,
            });
          }
        }
      } catch (provErr) {
        console.error("[webhook] account provisioning failed:", provErr);
      }
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
