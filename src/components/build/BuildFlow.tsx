"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SITE_TYPES = ["Landing Page", "Business Website", "E-Commerce Store", "SaaS / Web App", "Portfolio", "Blog / Content Site", "Other"];
const PAGE_OPTS = ["Home", "About", "Services", "Pricing", "Blog", "Contact", "E-Commerce", "Dashboard", "Docs", "FAQ"];
const FEATURES = ["AI Chatbot", "Payment Integration", "User Authentication", "Admin Panel", "Email Notifications", "Multi-language", "Analytics", "SEO Setup", "CMS", "API Integration"];
const BUDGETS = ["Under ₦100k", "₦100k – ₦300k", "₦300k – ₦600k", "₦600k – ₦1M", "₦1M+", "Not sure yet"];
const TIMELINES = ["ASAP (< 2 weeks)", "1 month", "2–3 months", "Flexible / no rush"];

type Step = 0 | 1 | 2 | 3 | 4;

export function BuildFlow() {
  const [step, setStep] = useState<Step>(0);
  const [siteType, setSiteType] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [idea, setIdea] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggleArr = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const STEPS = [
    { label: "Site type", valid: !!siteType },
    { label: "Pages & features", valid: true },
    { label: "Budget & timeline", valid: !!budget && !!timeline },
    { label: "Tell us more", valid: idea.length >= 10 },
    { label: "Contact", valid: !!name && /^\S+@\S+\.\S+$/.test(email) },
  ];

  const canNext = STEPS[step]?.valid;

  const quoteEstimate = () => {
    if (!siteType || !budget) return null;
    if (siteType === "Landing Page") return "₦150k – ₦200k";
    if (siteType === "Business Website") return "₦280k – ₦450k";
    if (siteType === "E-Commerce Store") return "₦400k – ₦650k";
    if (siteType === "SaaS / Web App") return "Custom — from ₦600k";
    return "₦200k – ₦500k";
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, siteType, pages, features, budget, timeline, idea, source: "build-flow" }),
      });
    } catch { /* non-fatal */ }
    setDone(true);
    setSubmitting(false);
  };

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        border: active ? "1px solid rgba(0,212,212,0.5)" : "1px solid var(--border)",
        background: active ? "rgba(0,212,212,0.08)" : "var(--surface)",
        color: active ? "var(--teal)" : "var(--text-muted)",
        transition: "all 0.15s",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      {label}
    </button>
  );

  const stepContent: Record<Step, React.ReactNode> = {
    0: (
      <div>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16 }}>What kind of site do you need?</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {SITE_TYPES.map((t) => chip(t, siteType === t, () => setSiteType(t)))}
        </div>
      </div>
    ),
    1: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Pages you need <span style={{ color: "var(--text-faint)" }}>(select all)</span></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PAGE_OPTS.map((t) => chip(t, pages.includes(t), () => toggleArr(pages, setPages, t)))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Features required</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FEATURES.map((t) => chip(t, features.includes(t), () => toggleArr(features, setFeatures, t)))}
          </div>
        </div>
      </div>
    ),
    2: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Budget range</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {BUDGETS.map((t) => chip(t, budget === t, () => setBudget(t)))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Timeline</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TIMELINES.map((t) => chip(t, timeline === t, () => setTimeline(t)))}
          </div>
        </div>
        {quoteEstimate() && (
          <div
            style={{
              padding: "14px 18px",
              background: "rgba(0,212,212,0.06)",
              border: "1px solid rgba(0,212,212,0.2)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>⚡</span>
            <div>
              <p style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 2 }}>Estimated range for your project</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "var(--teal)" }}>{quoteEstimate()}</p>
            </div>
          </div>
        )}
      </div>
    ),
    3: (
      <div>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>
          Describe your vision, competitors you like, or anything else we should know
        </p>
        <textarea
          rows={6}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. We need a website like Company X, but for the Abuja market. The main goal is to get people to book a consultation call..."
          style={{
            width: "100%",
            padding: "14px 16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            color: "var(--text)",
            fontSize: 14,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            resize: "vertical",
            outline: "none",
          }}
          onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.4)")}
          onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
        />
        <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 8 }}>{idea.length} chars · min 10</p>
      </div>
    ),
    4: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Almost done — where should we send your quote?</p>
        {[
          { label: "Your name", value: name, set: setName, type: "text", placeholder: "Full name" },
          { label: "Email address", value: email, set: setEmail, type: "email", placeholder: "you@example.com" },
        ].map((f) => (
          <div key={f.label}>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
            <input
              type={f.type}
              required
              placeholder={f.placeholder}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                color: "var(--text)",
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
              }}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.4)")}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            />
          </div>
        ))}
      </div>
    ),
  };

  return (
    <section id="build" className="section">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,212,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="eyebrow">Start a project</span>
          <div className="teal-line" style={{ margin: "16px auto" }} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Build your site in minutes
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 480, margin: "16px auto 0", lineHeight: 1.65 }}>
            Answer 5 quick questions and get an instant quote estimate — no calls required.
          </p>
        </motion.div>

        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            {STEPS.map((s, i) => (
              <div key={s.label} style={{ flex: 1 }}>
                <div
                  style={{
                    height: 3,
                    borderRadius: 2,
                    background: i <= step ? "var(--teal)" : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s",
                  }}
                />
                <p style={{ fontSize: 10, color: i === step ? "var(--teal)" : "var(--text-faint)", marginTop: 6, fontWeight: i === step ? 700 : 500 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Card */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "36px 36px 28px",
            }}
          >
            {done ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(0,212,212,0.12)",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 16px",
                    color: "var(--teal)",
                    fontSize: 26,
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 10 }}>Brief received!</h3>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 8 }}>
                  We&apos;ll review your brief and send a detailed quote to <strong style={{ color: "#fff" }}>{email}</strong> within 24 hours.
                </p>
                {quoteEstimate() && (
                  <p style={{ fontSize: 14, color: "var(--teal)", fontWeight: 700 }}>
                    Estimated range: {quoteEstimate()}
                  </p>
                )}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  {stepContent[step]}
                </motion.div>
              </AnimatePresence>
            )}

            {!done && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
                  disabled={step === 0}
                  className="btn-ghost"
                  style={{ fontSize: 13, padding: "10px 20px", borderRadius: 10, opacity: step === 0 ? 0.3 : 1 }}
                >
                  Back
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => canNext && setStep((s) => Math.min(4, s + 1) as Step)}
                    disabled={!canNext}
                    className="btn-teal"
                    style={{ fontSize: 13, padding: "10px 24px", borderRadius: 10, opacity: canNext ? 1 : 0.4 }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canNext || submitting}
                    className="btn-teal"
                    style={{ fontSize: 13, padding: "10px 24px", borderRadius: 10, opacity: canNext ? 1 : 0.4 }}
                  >
                    {submitting ? "Sending…" : "Send my brief →"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
