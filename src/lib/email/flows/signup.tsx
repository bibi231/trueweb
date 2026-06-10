import { Text, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail, emailHeading, emailText, emailMuted } from "../templates/base";
import { EmailButton } from "../templates/button";

interface SignupEmailProps {
  site: "trueweb" | "supportai" | "replyai" | "harvestai";
  name?: string;
  dashboardUrl: string;
}

const SITE_CONFIG = {
  trueweb:  { cta: "Go to portal →",  blurb: "You now have access to your client portal. View project progress, send messages, and download invoices anytime." },
  supportai: { cta: "Create your first bot →", blurb: "Build an AI support bot that speaks your customers' language — English, Pidgin, Yoruba, or Hausa." },
  replyai:  { cta: "Open your inbox →", blurb: "Connect your Gmail or Outlook and let AI draft replies for you — typically in under 60 seconds." },
  harvestai: { cta: "Start harvesting leads →", blurb: "Paste any URL and extract leads in seconds. Export to CSV or push directly to your CRM." },
};

export function SignupEmail({ site, name, dashboardUrl }: SignupEmailProps) {
  const cfg = SITE_CONFIG[site];
  const siteName = site === "trueweb" ? "TrueWeb" : site === "supportai" ? "SupportAI" : site === "replyai" ? "ReplyAI" : "HarvestAI";

  return (
    <BaseEmail site={site} preview={`Welcome to ${siteName}${name ? `, ${name}` : ""}! You're all set.`}>
      <Text style={emailHeading}>Welcome{name ? `, ${name}` : ""}! 🎉</Text>
      <Text style={{ ...emailText, marginBottom: 16 }}>
        Your {siteName} account is live. {cfg.blurb}
      </Text>
      <EmailButton href={dashboardUrl} site={site}>{cfg.cta}</EmailButton>
      <Text style={emailMuted}>
        Questions? Reply to this email or reach us at{" "}
        <Link href="mailto:support@trueweb.com.ng" style={{ color: "inherit" }}>support@trueweb.com.ng</Link>.
      </Text>
    </BaseEmail>
  );
}

