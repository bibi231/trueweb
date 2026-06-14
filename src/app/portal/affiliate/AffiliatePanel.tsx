"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Banknote } from "lucide-react";

type Props = {
  initialCode: string;
  initialLink: string;
  pendingPayoutKobo: number;
  payoutRequested: boolean;
};

const MIN_PAYOUT_KOBO = 500000;
const naira = (kobo: number) => `₦${(kobo / 100).toLocaleString("en-NG")}`;

export default function AffiliatePanel({ initialCode, initialLink, pendingPayoutKobo, payoutRequested }: Props) {
  const [link, setLink] = useState(initialLink);
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [requested, setRequested] = useState(payoutRequested);
  const [payoutMsg, setPayoutMsg] = useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  };

  const regenerate = async () => {
    if (!confirm("Generate a new link? Your current link will stop working.")) return;
    setRegenerating(true);
    try {
      const res = await fetch("/api/affiliate/generate", { method: "POST" });
      const data = await res.json();
      if (data.link) { setLink(data.link); setCode(data.code); }
    } catch { /* no-op */ }
    setRegenerating(false);
  };

  const requestPayout = async () => {
    setPayoutMsg(null);
    try {
      const res = await fetch("/api/affiliate/payout-request", { method: "POST" });
      const data = await res.json();
      if (res.ok) { setRequested(true); setPayoutMsg("Payout requested — we'll transfer to your bank shortly."); }
      else if (data.error === "BELOW_MINIMUM") setPayoutMsg(`You need at least ${naira(MIN_PAYOUT_KOBO)} pending to request a payout.`);
      else setPayoutMsg("Could not request payout. Try again later.");
    } catch { setPayoutMsg("Could not request payout. Try again later."); }
  };

  const canPayout = pendingPayoutKobo >= MIN_PAYOUT_KOBO && !requested;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Referral link */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px" }}>
        <p style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 10 }}>Your referral link · code <strong style={{ color: "var(--teal)" }}>{code}</strong></p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            readOnly
            value={link}
            onFocus={(e) => e.currentTarget.select()}
            style={{ flex: 1, minWidth: 220, padding: "10px 13px", fontSize: 13.5, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 9, color: "var(--text)", fontFamily: "inherit" }}
          />
          <button onClick={copy} className="btn-teal" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, padding: "10px 16px", borderRadius: 9, border: 0, cursor: "pointer" }}>
            {copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copied" : "Copy"}
          </button>
          <button onClick={regenerate} disabled={regenerating} className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, padding: "10px 16px", borderRadius: 9, cursor: "pointer" }}>
            <RefreshCw size={14} style={{ animation: regenerating ? "spin 1s linear infinite" : undefined }} />New link
          </button>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 12, lineHeight: 1.5 }}>
          Share this link. When someone visits and pays for a TrueWeb service within 30 days, you earn a commission.
        </p>
      </div>

      {/* Payout */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Request a payout</p>
          <p style={{ fontSize: 12, color: "var(--text-faint)" }}>Minimum {naira(MIN_PAYOUT_KOBO)}. Paid by bank transfer.</p>
          {payoutMsg && <p style={{ fontSize: 12, color: "var(--teal)", marginTop: 6 }}>{payoutMsg}</p>}
        </div>
        <button onClick={requestPayout} disabled={!canPayout} className="btn-teal"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, padding: "10px 18px", borderRadius: 9, border: 0, cursor: canPayout ? "pointer" : "not-allowed", opacity: canPayout ? 1 : 0.5 }}>
          <Banknote size={15} />{requested ? "Requested" : "Request payout"}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
