"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

const KEY = "tw_cookie_consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "accepted");
    setShow(false);
    /* Fire GA4 if loaded */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const decline = () => {
    localStorage.setItem(KEY, "declined");
    setShow(false);
  };

  if (!mounted || !show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 300,
        width: "min(640px, calc(100vw - 32px))",
        background: "var(--surface)",
        border: "1px solid var(--border-mid)",
        borderRadius: 16,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: "0 16px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,212,212,0.06)",
        animation: "cookie-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <Cookie size={20} color="var(--teal)" style={{ flexShrink: 0 }} />

      <p style={{ flex: 1, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, minWidth: 0 }}>
        We use cookies for authentication, preferences, and analytics.{" "}
        <Link href="/cookies" style={{ color: "var(--teal)", fontWeight: 600 }}>Cookie Policy</Link>
        {" "}·{" "}
        <Link href="/privacy" style={{ color: "var(--teal)", fontWeight: 600 }}>Privacy</Link>
      </p>

      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: "7px 14px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)",
            fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.15s",
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: "7px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer",
            background: "var(--teal)", border: "none", color: "#050507",
            fontFamily: "inherit", whiteSpace: "nowrap",
          }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          aria-label="Close"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", padding: 4, display: "flex", alignItems: "center" }}
        >
          <X size={14} />
        </button>
      </div>

      <style>{`
        @keyframes cookie-in {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 480px) {
          [role="dialog"] { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
