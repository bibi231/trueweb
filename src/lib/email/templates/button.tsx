import { Button } from "@react-email/components";
import * as React from "react";

const BRAND_COLORS: Record<string, string> = {
  trueweb: "#00d4d4",
  supportai: "#0ea5e9",
  replyai: "#8b5cf6",
  harvestai: "#f59e0b",
};

interface EmailButtonProps {
  href: string;
  site: string;
  children: React.ReactNode;
}

export function EmailButton({ href, site, children }: EmailButtonProps) {
  const color = BRAND_COLORS[site] ?? "#00d4d4";
  return (
    <Button
      href={href}
      style={{
        backgroundColor: color,
        color: "#050507",
        fontWeight: 700,
        fontSize: 14,
        padding: "12px 24px",
        borderRadius: 9,
        textDecoration: "none",
        display: "inline-block",
        margin: "8px 0 16px",
      }}
    >
      {children}
    </Button>
  );
}
