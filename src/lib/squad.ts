const BASE = "https://api-d.squadco.com";
const SECRET = process.env.SQUAD_SECRET_KEY!;

export type SquadCheckoutParams = {
  email: string;
  amount: number;        // in kobo
  reference: string;     // TW-xxxxxxxx
  callbackUrl: string;
  currency?: string;
  customerName?: string;
  metadata?: Record<string, unknown>;
};

export async function initiateCheckout(params: SquadCheckoutParams) {
  const res = await fetch(`${BASE}/transaction/initiate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      currency: params.currency ?? "NGN",
      initiate_type: "inline",
      transaction_ref: params.reference,
      callback_url: params.callbackUrl,
      customer_name: params.customerName,
      metadata: params.metadata,
    }),
  });
  return res.json();
}

export async function verifyTransaction(ref: string) {
  const res = await fetch(`${BASE}/transaction/verify/${ref}`, {
    headers: { Authorization: `Bearer ${SECRET}` },
  });
  return res.json();
}

export function genRef(prefix = "TW") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

import crypto from "crypto";

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.SQUAD_WEBHOOK_SECRET!;
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  return hash.toUpperCase() === signature.toUpperCase();
}
