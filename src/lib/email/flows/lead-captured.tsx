import { Text } from "@react-email/components";
import * as React from "react";
import { BaseEmail, emailHeading, emailText } from "../templates/base";
import { EmailButton } from "../templates/button";

interface LeadCapturedEmailProps {
  name: string;
  email: string;
  siteType?: string;
  budget?: string;
  timeline?: string;
  idea?: string;
  adminUrl: string;
}

export function LeadCapturedEmail({ name, email, siteType, budget, timeline, idea, adminUrl }: LeadCapturedEmailProps) {
  return (
    <BaseEmail site="trueweb" preview={`New lead: ${name} (${email}) — ${siteType ?? "inquiry"}`}>
      <Text style={emailHeading}>New lead 🎯</Text>
      <div style={{ background: "#0a0a0f", border: "1px solid #1e1e2e", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
        <Text style={{ ...emailText, marginBottom: 6 }}><strong style={{ color: "#e4e4e7" }}>Name:</strong> {name}</Text>
        <Text style={{ ...emailText, marginBottom: 6 }}><strong style={{ color: "#e4e4e7" }}>Email:</strong> {email}</Text>
        {siteType && <Text style={{ ...emailText, marginBottom: 6 }}><strong style={{ color: "#e4e4e7" }}>Type:</strong> {siteType}</Text>}
        {budget && <Text style={{ ...emailText, marginBottom: 6 }}><strong style={{ color: "#e4e4e7" }}>Budget:</strong> {budget}</Text>}
        {timeline && <Text style={{ ...emailText, marginBottom: 6 }}><strong style={{ color: "#e4e4e7" }}>Timeline:</strong> {timeline}</Text>}
        {idea && <Text style={{ ...emailText, marginBottom: 0 }}><strong style={{ color: "#e4e4e7" }}>Idea:</strong> {idea}</Text>}
      </div>
      <EmailButton href={adminUrl} site="trueweb">View in admin →</EmailButton>
    </BaseEmail>
  );
}

