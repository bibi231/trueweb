import { Text, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail, emailHeading, emailText, emailMuted } from "../templates/base";
import { EmailButton } from "../templates/button";

interface PasswordResetEmailProps {
  site: "trueweb" | "supportai" | "replyai" | "harvestai";
  resetUrl: string;
  expiresIn?: string;
}

export function PasswordResetEmail({ site, resetUrl, expiresIn = "1 hour" }: PasswordResetEmailProps) {
  const siteName = { trueweb: "TrueWeb", supportai: "SupportAI", replyai: "ReplyAI", harvestai: "HarvestAI" }[site];

  return (
    <BaseEmail site={site} preview={`Reset your ${siteName} password — link expires in ${expiresIn}`}>
      <Text style={emailHeading}>Reset your password</Text>
      <Text style={{ ...emailText, marginBottom: 20 }}>
        We received a password reset request for your {siteName} account. Click the button below to set a new password.
      </Text>
      <EmailButton href={resetUrl} site={site}>Reset password →</EmailButton>
      <Text style={emailMuted}>
        This link expires in <strong style={{ color: "#e4e4e7" }}>{expiresIn}</strong>. If you did not request a password reset, ignore this email — your account is safe.
      </Text>
      <Text style={{ ...emailMuted, marginTop: 8 }}>
        Or copy this URL: <Link href={resetUrl} style={{ color: "#71717a", fontSize: 11 }}>{resetUrl}</Link>
      </Text>
    </BaseEmail>
  );
}

