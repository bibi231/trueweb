"use client";

import { useState } from "react";
import { Check, X, Star } from "lucide-react";

export function ReviewActions({ reviewId, approved, featured }: { reviewId: number; approved: boolean; featured: boolean }) {
  const [state, setState] = useState({ approved, featured });
  const [loading, setLoading] = useState(false);

  const patch = async (updates: Partial<typeof state>) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setState((s) => ({ ...s, ...updates }));
    } finally { setLoading(false); }
  };

  return (
    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
      {!state.approved ? (
        <button onClick={() => patch({ approved: true })} disabled={loading}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <Check size={12} /> Approve
        </button>
      ) : (
        <button onClick={() => patch({ approved: false })} disabled={loading}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <X size={12} /> Unpublish
        </button>
      )}
      <button onClick={() => patch({ featured: !state.featured })} disabled={loading}
        style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 8, background: state.featured ? "rgba(245,158,11,0.08)" : "var(--surface-2)", border: `1px solid ${state.featured ? "rgba(245,158,11,0.25)" : "var(--border)"}`, color: state.featured ? "#f59e0b" : "var(--text-faint)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
        <Star size={11} fill={state.featured ? "#f59e0b" : "none"} />
      </button>
    </div>
  );
}
