"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--text)",
    fontSize: 14,
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Get in touch</span>
            <div className="teal-line" />
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", marginBottom: 20 }}>
              Let&apos;s build something together
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32 }}>
              Ready to start a project? Fill the form, or reach us directly below.
              We respond within 24 hours on business days.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  label: "Email",
                  value: "hello@trueweb.com.ng",
                  href: "mailto:hello@trueweb.com.ng",
                },
                {
                  label: "Support",
                  value: "support@trueweb.com.ng",
                  href: "mailto:support@trueweb.com.ng",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                >
                  <span style={{ fontSize: 11, color: "var(--text-faint)", width: 50, flexShrink: 0 }}>{c.label}</span>
                  <a
                    href={c.href}
                    style={{
                      fontSize: 14,
                      color: "var(--teal)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === "ok" ? (
              <div
                style={{
                  padding: 32,
                  background: "rgba(0,212,212,0.05)",
                  border: "1px solid rgba(0,212,212,0.2)",
                  borderRadius: 16,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(0,212,212,0.12)",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 16px",
                    color: "var(--teal)",
                    fontSize: 22,
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>Message sent!</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.4)")}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.4)")}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.4)")}
                    onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                  />
                </div>
                {status === "err" && (
                  <p style={{ fontSize: 12, color: "#fca5a5" }}>Something went wrong. Try emailing us directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-teal"
                  style={{ justifyContent: "center", borderRadius: 12 }}
                >
                  {status === "loading" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .section-inner > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
