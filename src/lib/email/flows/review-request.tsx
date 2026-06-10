import { Text } from "@react-email/components";
import * as React from "react";
import { BaseEmail, emailHeading, emailText, emailMuted } from "../templates/base";
import { EmailButton } from "../templates/button";

interface ReviewRequestEmailProps {
  site: "trueweb" | "supportai" | "replyai" | "harvestai";
  name: string;
  projectTitle: string;
  reviewUrl: string;
}

export function ReviewRequestEmail({ site, name, projectTitle, reviewUrl }: ReviewRequestEmailProps) {
  return (
    <BaseEmail site={site} preview={`${name}, how was your experience with ${projectTitle}?`}>
      <Text style={emailHeading}>How did we do? ⭐</Text>
      <Text style={{ ...emailText, marginBottom: 16 }}>
        Hi {name}, it&apos;s been a week since we completed <strong style={{ color: "#e4e4e7" }}>{projectTitle}</strong>. We&apos;d love to hear your thoughts.
      </Text>
      <Text style={{ ...emailText, marginBottom: 20 }}>
        A short review helps other Nigerian businesses find us — and helps us keep improving.
      </Text>
      <EmailButton href={reviewUrl} site={site}>Leave a review (2 min) →</EmailButton>
      <Text style={emailMuted}>No account needed. Tap the link and rate your experience.</Text>
    </BaseEmail>
  );
}

