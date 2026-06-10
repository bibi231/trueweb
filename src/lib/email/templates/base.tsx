import {
  Html, Head, Body, Container, Section, Text, Hr, Link, Preview,
} from "@react-email/components";
import * as React from "react";

const SITE_NAMES: Record<string, string> = {
  trueweb: "TrueWeb Solutions",
  supportai: "SupportAI",
  replyai: "ReplyAI",
  harvestai: "HarvestAI",
};

const BRAND_COLORS: Record<string, string> = {
  trueweb: "#00d4d4",
  supportai: "#0ea5e9",
  replyai: "#8b5cf6",
  harvestai: "#f59e0b",
};

interface BaseEmailProps {
  site: "trueweb" | "supportai" | "replyai" | "harvestai";
  preview: string;
  children: React.ReactNode;
}

export function BaseEmail({ site, preview, children }: BaseEmailProps) {
  const siteName = SITE_NAMES[site] ?? "TrueWeb Network";
  const accentColor = BRAND_COLORS[site] ?? "#00d4d4";

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#0a0a0f", fontFamily: "'Inter', -apple-system, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: "40px auto", backgroundColor: "#111116", borderRadius: 16, overflow: "hidden", border: "1px solid #1e1e2e" }}>
          {/* Header */}
          <Section style={{ padding: "28px 32px 0", borderBottom: `3px solid ${accentColor}` }}>
            <Text style={{ color: accentColor, fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>
              {siteName}
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: "28px 32px" }}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={{ padding: "20px 32px 28px", borderTop: "1px solid #1e1e2e" }}>
            <Hr style={{ borderColor: "#1e1e2e", margin: "0 0 16px" }} />
            <Text style={{ color: "#52525b", fontSize: 11, margin: 0, lineHeight: 1.6 }}>
              Sent by {siteName} · part of the{" "}
              <Link href="https://trueweb.com.ng" style={{ color: "#00d4d4" }}>TrueWeb Network</Link>
              {" "}· Nigeria 🇳🇬
            </Text>
            <Text style={{ color: "#3f3f46", fontSize: 10, margin: "6px 0 0" }}>
              If you did not expect this email, you can safely ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const emailText: React.CSSProperties = {
  color: "#e4e4e7",
  fontSize: 14,
  lineHeight: "1.7",
  margin: "0 0 16px",
};

export const emailHeading = {
  color: "#f4f4f5",
  fontSize: 22,
  fontWeight: 700,
  margin: "0 0 8px",
  lineHeight: "1.3",
};

export const emailMuted = {
  color: "#71717a",
  fontSize: 13,
  lineHeight: "1.6",
  margin: "0 0 16px",
};
