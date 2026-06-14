"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, CreditCard, Star, X, Video, FileText, Download } from "lucide-react";

type Conv = {
  id: number;
  clientId: string;
  clientName: string | null;
  clientEmail: string | null;
  lastMessageText: string | null;
  lastMessageAt: string | null;
  unreadAdmin: number | null;
};
type Msg = {
  id: number;
  senderRole: "client" | "admin";
  content: string;
  type?: "text" | "payment_link" | "review_request" | "file" | "zoom_invite" | "zoom_request";
  meta?: { amount?: number; url?: string; ref?: string; name?: string; size?: number; mimeType?: string } | null;
  createdAt?: string;
};

const naira = (kobo: number) => `₦${(kobo / 100).toLocaleString("en-NG")}`;
const timeOf = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "";
const fmtSize = (b?: number) => !b ? "" : b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

export function AdminInbox() {
  const [convs, setConvs] = useState<Conv[]>([]);
  const [active, setActive] = useState<Conv | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [payDesc, setPayDesc] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const activeId = useRef<number | null>(null);

  const loadConvs = useCallback(async () => {
    try {
      const res = await fetch("/api/conversations");
      const data = await res.json();
      if (Array.isArray(data.conversations)) setConvs(data.conversations);
    } catch { /* offline */ }
  }, []);

  const loadMsgs = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/messages?conversationId=${id}`);
      const data = await res.json();
      if (Array.isArray(data.messages)) setMsgs(data.messages);
    } catch { /* offline */ }
  }, []);

  useEffect(() => {
    loadConvs();
    const t = setInterval(() => {
      loadConvs();
      if (activeId.current) loadMsgs(activeId.current);
    }, 4000);
    return () => clearInterval(t);
  }, [loadConvs, loadMsgs]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const open = (c: Conv) => { setActive(c); activeId.current = c.id; loadMsgs(c.id); };

  const sendMsg = async (opts: { content: string; type?: string; meta?: object }) => {
    if (!opts.content.trim() || !active) return;
    setInput("");
    setMsgs((m) => [...m, { id: Date.now(), senderRole: "admin", content: opts.content, type: (opts.type ?? "text") as Msg["type"], createdAt: new Date().toISOString() }]);
    await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversationId: active.id, content: opts.content, type: opts.type, meta: opts.meta }) });
    loadMsgs(active.id);
    loadConvs();
  };

  const sendPayment = async () => {
    if (!active) return;
    const amount = parseFloat(payAmount);
    if (!amount || amount <= 0 || payDesc.trim().length < 2) return;
    const kobo = Math.round(amount * 100);
    try {
      const res = await fetch("/api/payment-link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: kobo, description: payDesc.trim(), email: active.clientEmail }) });
      const data = await res.json();
      if (!data.checkoutUrl) return;
      await sendMsg({ content: payDesc.trim(), type: "payment_link", meta: { amount: kobo, url: data.checkoutUrl, ref: data.reference } });
      setPayOpen(false); setPayAmount(""); setPayDesc("");
    } catch { /* no-op */ }
  };

  const sendZoom = async () => {
    if (!active) return;
    const zoomUrl = process.env.NEXT_PUBLIC_ZOOM_LINK || "";
    if (!zoomUrl) {
      alert("Set NEXT_PUBLIC_ZOOM_LINK in Vercel env vars to use this feature.");
      return;
    }
    await sendMsg({ content: "I've started a Zoom meeting — click below to join.", type: "zoom_invite", meta: { url: zoomUrl } });
  };

  const askReview = () => sendMsg({ content: "We'd love your feedback — could you leave us a quick review from the button above your messages? It really helps." });

  return (
    <div style={{ display: "flex", height: "calc(100svh - 56px)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
      {/* Conversation list */}
      <div style={{ width: 280, flexShrink: 0, borderRight: "1px solid var(--border)", overflowY: "auto", background: "var(--surface)" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 700 }}>Conversations ({convs.length})</div>
        {convs.length === 0 && <p style={{ padding: 16, fontSize: 13, color: "var(--text-faint)" }}>No conversations yet.</p>}
        {convs.map((c) => (
          <button key={c.id} onClick={() => open(c)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", border: "none", borderBottom: "1px solid var(--border)", background: active?.id === c.id ? "var(--surface-2)" : "transparent", cursor: "pointer", fontFamily: "inherit" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.clientName || c.clientEmail || "Client"}</span>
              {(c.unreadAdmin ?? 0) > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: "#050507", background: "var(--teal)", borderRadius: 10, padding: "1px 7px" }}>{c.unreadAdmin}</span>}
            </div>
            <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.lastMessageText || "No messages yet"}</p>
          </button>
        ))}
      </div>

      {/* Thread */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg)" }}>
        {!active ? (
          <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--text-faint)", fontSize: 14 }}>Select a conversation to reply.</div>
        ) : (
          <>
            {/* Thread header */}
            <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700 }}>{active.clientName || active.clientEmail}</p>
                <p style={{ fontSize: 11, color: "var(--text-faint)" }}>{active.clientEmail}</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setPayOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, padding: "6px 11px", borderRadius: 8, background: "rgba(0,212,212,0.08)", border: "1px solid rgba(0,212,212,0.25)", color: "var(--teal)", cursor: "pointer", fontFamily: "inherit" }}><CreditCard size={13} /> Request payment</button>
                <button onClick={sendZoom} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, padding: "6px 11px", borderRadius: 8, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8", cursor: "pointer", fontFamily: "inherit" }}><Video size={13} /> Start Zoom call</button>
                <button onClick={askReview} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, padding: "6px 11px", borderRadius: 8, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b", cursor: "pointer", fontFamily: "inherit" }}><Star size={13} /> Ask for review</button>
              </div>
            </div>

            {/* Payment modal */}
            {payOpen && (
              <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", background: "var(--surface)", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <input value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder="Amount (₦)" type="number" style={{ width: 120, padding: "8px 10px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: 13 }} />
                <input value={payDesc} onChange={(e) => setPayDesc(e.target.value)} placeholder="What is this for?" style={{ flex: 1, minWidth: 160, padding: "8px 10px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: 13 }} />
                <button onClick={sendPayment} className="btn-teal" style={{ fontSize: 12, padding: "8px 14px", borderRadius: 8 }}>Send request</button>
                <button onClick={() => setPayOpen(false)} style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer" }}><X size={16} /></button>
              </div>
            )}

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, padding: "16px 18px" }}>
              {msgs.map((m) => (
                <div key={m.id} style={{ display: "flex", justifyContent: m.senderRole === "admin" ? "flex-end" : "flex-start" }}>
                  {m.type === "payment_link" && m.meta?.url ? (
                    <div style={{ maxWidth: "72%", background: "rgba(0,212,212,0.06)", border: "1px solid rgba(0,212,212,0.2)", borderRadius: 14, padding: "12px 15px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--teal)", marginBottom: 5 }}>Payment Request{m.meta?.amount != null ? ` · ${naira(m.meta.amount)}` : ""}</p>
                      <p style={{ fontSize: 13.5, color: "var(--text)" }}>{m.content}</p>
                      <p style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}>Sent to client · Ref {m.meta?.ref}</p>
                    </div>
                  ) : m.type === "zoom_invite" && m.meta?.url ? (
                    <div style={{ maxWidth: "72%", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: "12px 15px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", marginBottom: 5 }}>Zoom meeting sent</p>
                      <p style={{ fontSize: 13, color: "var(--text)", marginBottom: 4 }}>{m.content}</p>
                      <p style={{ fontSize: 10, color: "var(--text-faint)" }}>{m.meta.url}</p>
                    </div>
                  ) : m.type === "zoom_request" ? (
                    <div style={{ maxWidth: "72%", background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 14, padding: "12px 15px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", marginBottom: 4 }}>Zoom call request</p>
                      <p style={{ fontSize: 13.5, color: "var(--text)" }}>{m.content}</p>
                      <p style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 4 }}>Reply with &quot;Start Zoom call&quot; to send a link ↑</p>
                    </div>
                  ) : m.type === "file" && m.meta?.url ? (
                    <div style={{ maxWidth: "72%", background: m.senderRole === "admin" ? "rgba(0,212,212,0.06)" : "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                      <FileText size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.meta.name || m.content}</p>
                        {m.meta.size != null && <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 2 }}>{fmtSize(m.meta.size)}</p>}
                      </div>
                      <a href={m.meta.url} download={m.meta.name} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", padding: 7, borderRadius: 7, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-muted)", flexShrink: 0 }}>
                        <Download size={13} />
                      </a>
                    </div>
                  ) : (
                    <div style={{ maxWidth: "70%", padding: "9px 13px", borderRadius: m.senderRole === "admin" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.senderRole === "admin" ? "var(--teal)" : "var(--surface-2)", border: m.senderRole === "admin" ? "none" : "1px solid var(--border)", fontSize: 14, color: m.senderRole === "admin" ? "#050507" : "var(--text)", lineHeight: 1.5 }}>
                      {m.content}
                      <p style={{ fontSize: 10, marginTop: 3, opacity: 0.5, textAlign: "right" }}>{timeOf(m.createdAt)}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Reply bar */}
            <div style={{ display: "flex", gap: 10, padding: "12px 18px", borderTop: "1px solid var(--border)" }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMsg({ content: input })} placeholder={`Reply to ${active.clientName || "client"}…`}
                style={{ flex: 1, padding: "11px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              <button onClick={() => sendMsg({ content: input })} disabled={!input.trim()} className="btn-teal" style={{ padding: "10px 16px", borderRadius: 10 }}><Send size={15} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
