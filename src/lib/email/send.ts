import { getResend } from "./client";
import { randomUUID } from "crypto";
import * as React from "react";
import type { ReactElement } from "react";

export type Site = "trueweb" | "supportai" | "replyai" | "harvestai";
export type Flow =
  | "signup-welcome"
  | "payment-receipt"
  | "payment-failed"
  | "password-reset"
  | "lead-captured"
  | "review-request"
  | "review-approved"
  | "newsletter-digest"
  | "invoice-issued"
  | "subscription-reminder"
  | "support-handoff";

const FROM: Record<Site, string> = {
  trueweb:   "TrueWeb Solutions <hello@trueweb.com.ng>",
  supportai: "SupportAI <hello@supportai.com.ng>",
  replyai:   "ReplyAI <hello@replyai.com.ng>",
  harvestai: "HarvestAI <hello@harvestai.com.ng>",
};

const REPLY_TO: Record<Site, string> = {
  trueweb:   "support@trueweb.com.ng",
  supportai: "support@supportai.com.ng",
  replyai:   "support@replyai.com.ng",
  harvestai: "support@harvestai.com.ng",
};

interface SendOptions {
  site: Site;
  flow: Flow;
  to: string | string[];
  subject: string;
  react: ReactElement;
  tags?: Record<string, string>;
}

export async function sendEmail({ site, flow, to, subject, react, tags }: SendOptions) {
  const resend = getResend();
  const sendId = randomUUID();

  const result = await resend.emails.send({
    from: FROM[site],
    replyTo: REPLY_TO[site],
    to: Array.isArray(to) ? to : [to],
    subject,
    react,
    headers: {
      "X-TrueWeb-Site": site,
      "X-TrueWeb-Flow": flow,
      "X-TrueWeb-ID": sendId,
      ...tags,
    },
  });

  if (result.error) {
    console.error(`[email] ${site}/${flow} failed:`, result.error);
    throw new Error(`Email send failed: ${result.error.message}`);
  }

  return { id: result.data?.id, sendId };
}

// Convenience helpers — used across the codebase

export async function sendWelcomeEmail(
  site: Site,
  to: string,
  name: string | undefined,
  dashboardUrl: string
) {
  const { SignupEmail } = await import("./flows/signup");
  return sendEmail({
    site,
    flow: "signup-welcome",
    to,
    subject: `Welcome to ${site === "trueweb" ? "TrueWeb" : site === "supportai" ? "SupportAI" : site === "replyai" ? "ReplyAI" : "HarvestAI"}!`,
    react: React.createElement(SignupEmail, { site, name, dashboardUrl }),
  });
}

export async function sendPaymentReceipt(
  site: Site,
  to: string,
  opts: { name?: string; amountNgn: number; txRef: string; plan?: string; date: string }
) {
  const { PaymentReceiptEmail } = await import("./flows/payment-receipt");
  return sendEmail({
    site,
    flow: "payment-receipt",
    to,
    subject: `Payment confirmed — ₦${(opts.amountNgn / 100).toLocaleString()}`,
    react: React.createElement(PaymentReceiptEmail, { site, ...opts }),
  });
}

export async function sendLeadNotification(
  to: string,
  opts: { name: string; email: string; siteType?: string; budget?: string; timeline?: string; idea?: string }
) {
  const { LeadCapturedEmail } = await import("./flows/lead-captured");
  return sendEmail({
    site: "trueweb",
    flow: "lead-captured",
    to,
    subject: `New lead: ${opts.name} — ${opts.siteType ?? "inquiry"}`,
    react: React.createElement(LeadCapturedEmail, {
      ...opts,
      adminUrl: "https://trueweb.com.ng/admin/leads",
    }),
  });
}

export async function sendPasswordReset(site: Site, to: string, resetUrl: string) {
  const { PasswordResetEmail } = await import("./flows/password-reset");
  return sendEmail({
    site,
    flow: "password-reset",
    to,
    subject: "Reset your password",
    react: React.createElement(PasswordResetEmail, { site, resetUrl }),
  });
}

export async function sendReviewRequest(
  site: Site,
  to: string,
  opts: { name: string; projectTitle: string; reviewUrl: string }
) {
  const { ReviewRequestEmail } = await import("./flows/review-request");
  return sendEmail({
    site,
    flow: "review-request",
    to,
    subject: `How was ${opts.projectTitle}? Share your thoughts`,
    react: React.createElement(ReviewRequestEmail, { site, ...opts }),
  });
}
