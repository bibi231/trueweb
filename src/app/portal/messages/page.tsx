"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, Star, CreditCard, X, Paperclip, Video, FileText, Download } from "lucide-react";

type Msg = {
  id: number;
  senderRole: "client" | "admin";
  content: string;
  type?: "text" | "payment_link" | "review_request" | "file" | "zoom_invite";
  meta?: { amount?: number; url?: string; ref?: string; name?: string; size?: number; mimeType?: string } | null;
  createdAt?: string;
};

function timeOf(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function fmtSize(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function ReviewModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: { rating: number; quote: string; authorRole: string }) => void }) {
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [hover, setHover] = useState(0);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 18, padding: "28px", width: "min(440px, 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Leave a review</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={18} /></button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
              <Star size={28} fill={n <= (hover || rating) ? "#f59e0b" : "none"} color={n <= (hover || rating) ? "#f59e0b" : "var(--text-faint)"} />
            </button>
          ))}
        </div>
        <textarea rows={3} placeholder="Tell others what TrueWeb built for you and the results you saw..." value={quote} onChange={(e) => setQuote(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none", marginBottom: 12 }} />
        <input type="text" placeholder="Your title / company (optional)" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 18 }} />
        <button onClick={() => { if (quote.length >= 10) { onSubmit({ rating, quote, authorRole }); onClose(); } }} disabled={quote.length < 10}
          style={{ width: "100%", padding: "12px", background: "var(--teal)", color: "#050507", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: quote.length >= 10 ? "pointer" : "not-allowed", opacity: quote.length < 10 ? 0.5 : 1, fontFamily: "inherit" }}>
          Submit review
        </button>
        <p style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", marginTop: 8 }}>Reviews are approved before going live on the site.</p>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const convId = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const url = convId.current ? `/api/messages?conversationId=${convId.current}` : "/api/messages";
      const res = await fetch(url);
      const data = await res.json();
      if (data.conversationId) convId.current = data.conversationId;
      if (Array.isArray(data.messages)) setMsgs(data.messages);
    } catch { /* offline */ }
  }, []);

  useEffect(() => { load(); const t = setInterval(load, 4000); return () => clearInterval(t); }, [load]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (opts?: { type?: string; content?: string; meta?: object }) => {
    const text = opts?.content ?? input.trim();
    if (!text || sending) return;
    setSending(true);
    if (!opts) setInput("");
    setMsgs((m) => [...m, { id: Date.now(), senderRole: "client", content: text, type: (opts?.type ?? "text") as Msg["type"], createdAt: new Date().toISOString() }]);
    try {
      await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: text, type: opts?.type, meta: opts?.meta }) });
      await load();
    } catch { /* keep optimistic */ }
    setSending(false);
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/portal/upload", { method: "POST", body: fd });
    const d = await r.json();
    setUploading(false);
    if (!r.ok) { alert(d.error || "Upload failed"); return; }
    await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "file", content: file.name, meta: { url: d.url, name: file.name, size: file.size, mimeType: file.type } }) });
    e.target.value = "";
    await load();
  };

  const submitReview = async ({ rating, quote, authorRole }: { rating: number; quote: string; authorRole: string }) => {
    try {
      await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating, quote, authorRole }) });
      await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: `Submitted a ${rating}-star review: "${quote}"` }) });
      await load();
    } catch { /* silent */ }
  };

  const requestZoom = () => send({ type: "zoom_request", content: "I'd like to schedule a Zoom call — please share a meeting link when available." });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100svh - 64px)" }}>
      {showReview && <ReviewModal onClose={() => setShowReview(false)} onSubmit={submitReview} />}

      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Messages</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Chat directly with the TrueWeb team.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={requestZoom} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <Video size={14} /> Schedule Zoom
          </button>
          <button onClick={() => setShowReview(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <Star size={14} /> Leave a review
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
        {msgs.length === 0 && (
          <p style={{ color: "var(--text-faint)", fontSize: 14, textAlign: "center", marginTop: 40 }}>No messages yet. Say hello — we usually reply within a few hours.</p>
        )}
        {msgs.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.senderRole === "client" ? "flex-end" : "flex-start" }}>
            {m.type === "payment_link" && m.meta?.url ? (
              <div style={{ maxWidth: "72%", background: "rgba(0,212,212,0.06)", border: "1px solid rgba(0,212,212,0.2)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <CreditCard size={16} color="var(--teal)" /><span style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)" }}>Payment Request</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text)", marginBottom: 10 }}>{m.content}</p>
                {m.meta?.amount != null && <p style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-syne)", color: "var(--teal)", marginBottom: 10 }}>₦{(m.meta.amount / 100).toLocaleString("en-NG")}</p>}
                <a href={m.meta.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "var(--teal)", color: "#050507", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  <CreditCard size={13} /> Pay now via Squad
                </a>
                {m.meta?.ref && <p style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}>Ref: {m.meta.ref}</p>}
              </div>
            ) : m.type === "zoom_invite" && m.meta?.url ? (
              <div style={{ maxWidth: "72%", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Video size={16} color="#818cf8" /><span style={{ fontSize: 13, fontWeight: 700, color: "#818cf8" }}>Zoom Meeting</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text)", marginBottom: 12 }}>{m.content}</p>
                <a href={m.meta.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#4f46e5", color: "#fff", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  <Video size={13} /> Join Zoom call
                </a>
                <p style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}>{timeOf(m.createdAt)}</p>
              </div>
            ) : m.type === "file" && m.meta?.url ? (
              <div style={{ maxWidth: "72%", background: m.senderRole === "client" ? "rgba(0,212,212,0.06)" : "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                <FileText size={22} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.meta.name || m.content}</p>
                  {m.meta.size != null && <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 2 }}>{fmtSize(m.meta.size)}</p>}
                </div>
                <a href={m.meta.url} download={m.meta.name} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", padding: 8, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)", flexShrink: 0 }}>
                  <Download size={14} />
                </a>
              </div>
            ) : (
              <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: m.senderRole === "client" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.senderRole === "client" ? "var(--teal)" : "var(--surface-2)", border: m.senderRole === "client" ? "none" : "1px solid var(--border)", fontSize: 14, color: m.senderRole === "client" ? "#050507" : "var(--text)", lineHeight: 1.55 }}>
                {m.content}
                <p style={{ fontSize: 10, marginTop: 4, opacity: 0.5, textAlign: "right" }}>{timeOf(m.createdAt)}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 8, paddingTop: 14, borderTop: "1px solid var(--border)", alignItems: "center" }}>
        <button onClick={() => fileRef.current?.click()} disabled={uploading} title="Attach file" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", cursor: uploading ? "not-allowed" : "pointer", color: uploading ? "var(--text-faint)" : "var(--text-muted)", flexShrink: 0 }}>
          <Paperclip size={16} />
        </button>
        <input ref={fileRef} type="file" style={{ display: "none" }} onChange={uploadFile} />
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()} placeholder="Type a message…"
          style={{ flex: 1, padding: "11px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
        <button onClick={() => send()} disabled={!input.trim() || sending} className="btn-teal" style={{ padding: "10px 16px", borderRadius: 10, flexShrink: 0 }}><Send size={15} /></button>
      </div>
    </div>
  );
}
