"use client";

import { useState } from "react";
import { Banknote, Check } from "lucide-react";

export function PayoutAction({ affiliateId, pendingKobo }: { affiliateId: string; pendingKobo: number }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const markPaid = async () => {
    if (pendingKobo <= 0) return;
    if (!confirm(`Mark ₦${(pendingKobo / 100).toLocaleString("en-NG")} as paid out? Do this after you've sent the bank transfer.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/affiliates/${affiliateId}`, { method: "POST" });
      if (res.ok) setDone(true);
    } finally { setLoading(false); }
  };

  if (done) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#4ade80", fontWeight: 600 }}>
        <Check size={13} /> Paid
      </span>
    );
  }

  return (
    <button onClick={markPaid} disabled={loading || pendingKobo <= 0}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: pendingKobo > 0 ? "rgba(74,222,128,0.08)" : "var(--surface-2)", border: `1px solid ${pendingKobo > 0 ? "rgba(74,222,128,0.2)" : "var(--border)"}`, color: pendingKobo > 0 ? "#4ade80" : "var(--text-faint)", fontSize: 12, fontWeight: 600, cursor: pendingKobo > 0 ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
      <Banknote size={13} /> Mark paid
    </button>
  );
}
