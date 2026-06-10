import { Text, Row, Column } from "@react-email/components";
import * as React from "react";
import { BaseEmail, emailHeading, emailText, emailMuted } from "../templates/base";

interface PaymentReceiptEmailProps {
  site: "trueweb" | "supportai" | "replyai" | "harvestai";
  name?: string;
  amountNgn: number;
  txRef: string;
  plan?: string;
  date: string;
}

export function PaymentReceiptEmail({ site, name, amountNgn, txRef, plan, date }: PaymentReceiptEmailProps) {
  const formatted = `₦${(amountNgn / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  const siteName = { trueweb: "TrueWeb", supportai: "SupportAI", replyai: "ReplyAI", harvestai: "HarvestAI" }[site];

  return (
    <BaseEmail site={site} preview={`Payment confirmed — ${formatted} received. Transaction ref: ${txRef}`}>
      <Text style={emailHeading}>Payment confirmed ✓</Text>
      <Text style={{ ...emailText, marginBottom: 24 }}>
        {name ? `Hi ${name}, ` : ""}your payment to {siteName} was successful.
      </Text>

      {/* Receipt table */}
      <div style={{ background: "#0a0a0f", border: "1px solid #1e1e2e", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
        <Row style={{ marginBottom: 8 }}>
          <Column><Text style={{ color: "#71717a", fontSize: 12, margin: 0 }}>Amount</Text></Column>
          <Column style={{ textAlign: "right" }}><Text style={{ color: "#e4e4e7", fontSize: 14, fontWeight: 700, margin: 0 }}>{formatted}</Text></Column>
        </Row>
        {plan && (
          <Row style={{ marginBottom: 8 }}>
            <Column><Text style={{ color: "#71717a", fontSize: 12, margin: 0 }}>Plan</Text></Column>
            <Column style={{ textAlign: "right" }}><Text style={{ color: "#e4e4e7", fontSize: 13, margin: 0 }}>{plan}</Text></Column>
          </Row>
        )}
        <Row style={{ marginBottom: 8 }}>
          <Column><Text style={{ color: "#71717a", fontSize: 12, margin: 0 }}>Date</Text></Column>
          <Column style={{ textAlign: "right" }}><Text style={{ color: "#e4e4e7", fontSize: 13, margin: 0 }}>{date}</Text></Column>
        </Row>
        <Row>
          <Column><Text style={{ color: "#71717a", fontSize: 12, margin: 0 }}>Reference</Text></Column>
          <Column style={{ textAlign: "right" }}><Text style={{ color: "#71717a", fontSize: 11, fontFamily: "monospace", margin: 0 }}>{txRef}</Text></Column>
        </Row>
      </div>

      <Text style={emailMuted}>
        Keep this email as your receipt. For disputes or refunds, quote the reference above to support@trueweb.com.ng.
      </Text>
    </BaseEmail>
  );
}

