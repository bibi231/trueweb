"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";

export function ContactContent() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch { setStatus("err"); }
  };

  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }} className="tw-contact-grid">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
            <span className="eyebrow">Get in touch</span>
            <div className="teal-line" />
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", marginBottom: 20 }}>
              Let&apos;s build something together
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 36 }}>
              Ready to start a project? Fill the form or reach us directly. We respond within 24 hours on business days.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { Icon: Mail, label: "General / Sales", value: "hello@trueweb.com.ng", href: "mailto:hello@trueweb.com.ng" },
                { Icon: MessageSquare, label: "Support", value: "support@trueweb.com.ng", href: "mailto:support@trueweb.com.ng" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(0,212,212,0.08)", border: "1px solid rgba(0,212,212,0.15)", display: "grid", placeItems: "center", color: "var(--teal)", flexShrink: 0 }}>
                    <c.Icon size={16} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 1 }}>{c.label}</p>
                    <a href={c.href} style={{ fontSize: 14, color: "var(--teal)", fontWeight: 600 }}>{c.value}</a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }}>
            {status === "ok" ? (
              <div style={{ padding: 36, background: "rgba(0,212,212,0.04)", border: "1px solid rgba(0,212,212,0.2)", borderRadius: 18, textAlign: "center" }}>
                <CheckCircle size={48} color="var(--teal)" style={{ margin: "0 auto 16px", display: "block" }} strokeWidth={1.5} />
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Message sent!</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)" }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="tw-contact-form-row">
                  {[{ key: "name", label: "Name", type: "text", placeholder: "Your name" }, { key: "email", label: "Email", type: "email", placeholder: "you@example.com" }].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm((prev) => ({ ...prev, [f.key as keyof typeof form]: e.target.value }))}
                        className="tw-input"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>Message</label>
                  <textarea required rows={5} placeholder="Tell us about your project..."
                    value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="tw-input" style={{ resize: "vertical", minHeight: 120 }}
                  />
                </div>
                {status === "err" && <p style={{ fontSize: 12, color: "#fca5a5" }}>Something went wrong. Email us directly.</p>}
                <button type="submit" disabled={status === "loading"} className="btn-teal" style={{ justifyContent: "center", gap: 8 }}>
                  <Send size={15} />
                  {status === "loading" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .tw-contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        @media (max-width: 480px) { .tw-contact-form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

export function Contact() {
  return <ContactContent />;
}
