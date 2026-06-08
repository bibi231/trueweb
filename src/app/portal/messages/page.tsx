"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Paperclip } from "lucide-react";

type Msg = { id: number; sender: "user" | "trueweb"; text: string; ts: string };

const INITIAL: Msg[] = [
  { id: 1, sender: "trueweb", text: "Welcome to your TrueWeb client portal! We're here to answer any questions about your project.", ts: "9:00 AM" },
];

export default function MessagesPage() {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg: Msg = { id: Date.now(), sender: "user", text: input.trim(), ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMsgs((m) => [...m, newMsg]);
    setInput("");
    /* Auto-reply (simulate; replace with real socket/polling) */
    setTimeout(() => {
      setMsgs((m) => [...m, { id: Date.now() + 1, sender: "trueweb", text: "Thanks for your message! A team member will respond within a few hours.", ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100svh - 64px)" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Messages</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Chat directly with the TrueWeb team.</p>
      </div>

      {/* Message list */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 16 }}>
        {msgs.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}>
            <div
              style={{
                maxWidth: "70%", padding: "10px 14px", borderRadius: m.sender === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.sender === "user" ? "var(--teal)" : "var(--surface-2)",
                border: m.sender === "user" ? "none" : "1px solid var(--border)",
                fontSize: 14, color: m.sender === "user" ? "#050507" : "var(--text)", lineHeight: 1.55,
              }}
            >
              {m.text}
              <p style={{ fontSize: 10, marginTop: 4, opacity: 0.5, textAlign: "right" }}>{m.ts}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "10px" }}>
          <Paperclip size={16} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Type a message…"
          className="tw-input"
          style={{ flex: 1 }}
        />
        <button onClick={send} className="btn-teal" style={{ padding: "10px 16px", borderRadius: 10 }} disabled={!input.trim()}>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
