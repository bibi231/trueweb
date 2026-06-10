import { Text, Link } from "@react-email/components";
import * as React from "react";
import { BaseEmail, emailHeading, emailMuted } from "../templates/base";

interface Article {
  title: string;
  excerpt: string;
  url: string;
  site: string;
}

interface NewsletterDigestProps {
  articles: Article[];
  productUpdate?: string;
  unsubscribeUrl: string;
  weekLabel: string;
}

export function NewsletterDigestEmail({ articles, productUpdate, unsubscribeUrl, weekLabel }: NewsletterDigestProps) {
  return (
    <BaseEmail site="trueweb" preview={`TrueWeb Network digest — ${weekLabel}`}>
      <Text style={emailHeading}>TrueWeb Network Digest</Text>
      <Text style={{ ...emailMuted, marginBottom: 24 }}>{weekLabel} · Built in Nigeria, for Nigeria</Text>

      {articles.slice(0, 3).map((a, i) => (
        <div key={i} style={{ borderLeft: "3px solid #00d4d4", paddingLeft: 16, marginBottom: 20 }}>
          <Text style={{ color: "#f4f4f5", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>
            <Link href={a.url} style={{ color: "#f4f4f5", textDecoration: "none" }}>{a.title}</Link>
          </Text>
          <Text style={{ color: "#71717a", fontSize: 11, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{a.site}</Text>
          <Text style={{ color: "#a1a1aa", fontSize: 13, margin: 0, lineHeight: "1.6" }}>{a.excerpt}</Text>
        </div>
      ))}

      {productUpdate && (
        <div style={{ background: "rgba(0,212,212,0.04)", border: "1px solid rgba(0,212,212,0.12)", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <Text style={{ color: "#00d4d4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>Product update</Text>
          <Text style={{ color: "#e4e4e7", fontSize: 13, margin: 0, lineHeight: "1.6" }}>{productUpdate}</Text>
        </div>
      )}

      <Text style={emailMuted}>
        <Link href={unsubscribeUrl} style={{ color: "#3f3f46" }}>Unsubscribe</Link>
        {" "}· Delivered every Tuesday 10am WAT
      </Text>
    </BaseEmail>
  );
}

