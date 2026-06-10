import { Text, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail, emailHeading, emailText, emailMuted } from "../templates/base";
import { EmailButton } from "../templates/button";

interface PaymentFailedEmailProps {
  site: "trueweb" | "supportai" | "replyai" | "harvestai";
  name?: string;
  txRef: string;
  retryUrl: string;
}

export function PaymentFailedEmail({ site, name, txRef, retryUrl }: PaymentFailedEmailProps) {
  const siteName = { trueweb: "TrueWeb", supportai: "SupportAI", replyai: "ReplyAI", harvestai: "HarvestAI" }[site];

  return (
    <BaseEmail site={site} preview={`Payment failed — please retry your ${siteName} payment`}>
      <Text style={emailHeading}>Payment unsuccessful</Text>
      <Text style={{ ...emailText, marginBottom: 16 }}>
        {name ? `Hi ${name}, ` : ""}your payment to {siteName} could not be processed (ref: <span style={{ fontFamily: "monospace", color: "#71717a" }}>{txRef}</span>).
      </Text>
      <Text style={{ ...emailText, marginBottom: 20 }}>
        Common causes: card limit, insufficient funds, or bank network issue. Try with a different card or call your bank if the problem persists.
      </Text>
      <EmailButton href={retryUrl} site={site}>Retry payment →</EmailButton>
      <Text style={emailMuted}>
        Need help? Email <Link href="mailto:support@trueweb.com.ng" style={{ color: "inherit" }}>support@trueweb.com.ng</Link> with your reference number.
      </Text>
    </BaseEmail>
  );
}

