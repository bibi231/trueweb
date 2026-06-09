"use client";

import { useState } from "react";
import { CreditCard, Check } from "lucide-react";

export function InvoiceActions({ invoiceId, email, amount, status }: { invoiceId: number; email: string; amount: number; status: string }) {
  const [loading, setLoading] = useState(false);
  const [payLink, setPayLink] = useState("");

  const sendPayLink = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email, description: `Invoice #${invoiceId}`, projectId: null }),
      });
      const data = await res.json();
      if (data.checkoutUrl) setPayLink(data.checkoutUrl);
    } finally { setLoading(false); }
  };

  if (payLink) return (
    <a href={payLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--teal)", textDecoration: "none" }}>
      Copy link
    </a>
  );

  return (
    <div style={{ display: "flex", gap: 6 }}>
      {status !== "paid" && (
        <button onClick={sendPayLink} disabled={loading}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 7, background: "rgba(0,212,212,0.06)", border: "1px solid rgba(0,212,212,0.2)", color: "var(--teal)", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <CreditCard size={11} />
          {loading ? "..." : "Send link"}
        </button>
      )}
      {status === "paid" && <Check size={14} color="#4ade80" />}
    </div>
  );
}
