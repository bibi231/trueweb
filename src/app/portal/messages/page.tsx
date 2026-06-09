"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Star, CreditCard, X } from "lucide-react";

type Msg = {
  id: number;
  sender: "user" | "trueweb";
  text: string;
  ts: string;
  type?: "text" | "payment_link" | "review_request";
  meta?: { amount?: number; url?: string; ref?: string };
};

const INITIAL: Msg[] = [
  { id: 1, sender: "trueweb", text: "Welcome to your TrueWeb client portal! We're here to answer any questions about your project.", ts: "9:00 AM" },
];

function ReviewModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: { rating: number; quote: string; authorRole: string }) => void }) {
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [hover, setHover] = useState(0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 18, padding: "28px 28px", width: "min(440px, 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Leave a review</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={18} /></button>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
              <Star size={28} fill={n <= (hover || rating) ? "#f59e0b" : "none"} color={n <= (hover || rating) ? "#f59e0b" : "var(--text-faint)"} />
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>Your review</label>
          <textarea rows={3} placeholder="Tell others what TrueWeb built for you and the results you saw..."
            value={quote} onChange={(e) => setQuote(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none" }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>Your title / company (optional)</label>
          <input type="text" placeholder="e.g. CEO, My Company · Lagos" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
          />
        </div>
        <button
          onClick={() => { if (quote.length >= 10) { onSubmit({ rating, quote, authorRole }); onClose(); } }}
          disabled={quote.length < 10}
          style={{ width: "100%", padding: "12px", background: "var(--teal)", color: "#050507", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: quote.length >= 10 ? "pointer" : "not-allowed", opacity: quote.length < 10 ? 0.5 : 1, fontFamily: "inherit" }}
        >
          Submit review
        </button>
        <p style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", marginTop: 8 }}>Reviews are approved before going live on the site.</p>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [showReview, setShowReview] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg: Msg = { id: Date.now(), sender: "user", text: input.trim(), ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMsgs((m) => [...m, newMsg]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { id: Date.now() + 1, sender: "trueweb", text: "Thanks! A team member will respond within a few hours.", ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1200);
  };

  const submitReview = async ({ rating, quote, authorRole }: { rating: number; quote: string; authorRole: string }) => {
    try {
      await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating, quote, authorRole }) });
      setMsgs((m) => [...m, { id: Date.now(), sender: "user", text: `Submitted a ${rating}-star review: "${quote}"`, ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } catch { /* silent */ }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100svh - 64px)" }}>
      {showReview && <ReviewModal onClose={() => setShowReview(false)} onSubmit={submitReview} />}

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Messages</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Chat directly with the TrueWeb team.</p>
          </div>
          <button
            onClick={() => setShowReview(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 9,
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
              color: "#f59e0b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            <Star size={14} /> Leave a review
          </button>
        </div>
      </div>

      {/* Message list */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
        {msgs.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}>
            {/* Payment link message type */}
            {m.type === "payment_link" && m.meta?.url ? (
              <div style={{ maxWidth: "72%", background: "rgba(0,212,212,0.06)", border: "1px solid rgba(0,212,212,0.2)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <CreditCard size={16} color="var(--teal)" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)" }}>Payment Request</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text)", marginBottom: 10 }}>{m.text}</p>
                {m.meta?.amount && (
                  <p style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-syne)", color: "var(--teal)", marginBottom: 10 }}>
                    ₦{(m.meta.amount / 100).toLocaleString("en-NG")}
                  </p>
                )}
                <a href={m.meta.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "var(--teal)", color: "#050507", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  <CreditCard size={13} /> Pay now via Squad
                </a>
                <p style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}>Ref: {m.meta.ref}</p>
              </div>
            ) : (
              <div style={{
                maxWidth: "70%", padding: "10px 14px",
                borderRadius: m.sender === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.sender === "user" ? "var(--teal)" : "var(--surface-2)",
                border: m.sender === "user" ? "none" : "1px solid var(--border)",
                fontSize: 14, color: m.sender === "user" ? "#050507" : "var(--text)", lineHeight: 1.55,
              }}>
                {m.text}
                <p style={{ fontSize: 10, marginTop: 4, opacity: 0.5, textAlign: "right" }}>{m.ts}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "10px" }} aria-label="Attach file">
          <Paperclip size={16} />
        </button>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Type a message…"
          style={{ flex: 1, padding: "11px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
        />
        <button onClick={send} disabled={!input.trim()}
          className="btn-teal" style={{ padding: "10px 16px", borderRadius: 10 }}>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
