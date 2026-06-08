"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Upload, Check, ShoppingCart } from "lucide-react";
import { TemplateGallery, type Template } from "./TemplateGallery";

/* ─── Data ──────────────────────────────────────────────────── */
const SITE_TYPES = ["Marketing Site", "E-Commerce Store", "SaaS / Web App", "AI Integration", "Blog / Publication", "Portfolio", "Landing Page", "Other"];
const PAGE_OPTS   = ["Home", "About", "Services", "Pricing", "Blog", "Contact", "Store", "Dashboard", "Docs", "FAQ", "Portfolio"];
const FEATURES    = ["User Auth", "Payments (Squad/Paystack)", "CMS", "AI Chatbot", "Admin Panel", "Email Notifications", "Multi-language", "Analytics", "SEO Package", "API Integration", "Realtime", "File Upload"];
const BUDGETS     = ["Under ₦100k", "₦100k – ₦300k", "₦300k – ₦600k", "₦600k – ₦1M", "₦1M+", "Not sure yet"];
const TIMELINES   = ["ASAP (< 2 weeks)", "1 month", "2–3 months", "Flexible"];

/* ─── Quote logic ───────────────────────────────────────────── */
const RATES: Record<string, number> = {
  "Marketing Site": 28000000,
  "E-Commerce Store": 45000000,
  "SaaS / Web App": 60000000,
  "AI Integration": 50000000,
  "Blog / Publication": 22000000,
  "Portfolio": 18000000,
  "Landing Page": 15000000,
  Other: 25000000,
};
const FEATURE_COSTS: Record<string, number> = {
  "User Auth": 4000000,
  "Payments (Squad/Paystack)": 5000000,
  CMS: 3000000,
  "AI Chatbot": 8000000,
  "Admin Panel": 6000000,
  "Email Notifications": 2000000,
  "Multi-language": 3000000,
  "SEO Package": 2500000,
  "API Integration": 4000000,
  Realtime: 5000000,
  "File Upload": 1500000,
};

function calcQuote(siteType: string, features: string[], templateBase: number): number {
  const base = Math.max(RATES[siteType] ?? 25000000, templateBase);
  const extras = features.reduce((s, f) => s + (FEATURE_COSTS[f] ?? 0), 0);
  return base + extras;
}

function fmt(kobo: number) {
  return `₦${(kobo / 100).toLocaleString("en-NG")}`;
}

/* ─── Wizard steps ──────────────────────────────────────────── */
type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_LABELS = ["Project type", "Pages & features", "Template", "Budget & time", "Your idea", "Contact"];

function ProgressBar({ step }: { step: Step }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {STEP_LABELS.map((l, i) => (
          <div key={l} style={{ flex: 1 }}>
            <div style={{ height: 3, borderRadius: 2, background: i <= step ? "var(--teal)" : "var(--border)", transition: "background 0.3s" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--teal)", fontWeight: 700 }}>{STEP_LABELS[step]}</span>
        <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{step + 1} / {STEP_LABELS.length}</span>
      </div>
    </div>
  );
}

function QuotePanel({ quote }: { quote: number }) {
  if (!quote) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        padding: "16px 20px",
        background: "rgba(0,212,212,0.06)",
        border: "1px solid rgba(0,212,212,0.2)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 24,
      }}
    >
      <ShoppingCart size={18} color="var(--teal)" />
      <div>
        <p style={{ fontSize: 11, color: "var(--text-faint)", marginBottom: 2 }}>Estimated project cost</p>
        <p style={{ fontSize: 22, fontFamily: "var(--font-syne)", fontWeight: 800, color: "var(--teal)" }}>{fmt(quote)}</p>
      </div>
      <p style={{ fontSize: 11, color: "var(--text-faint)", marginLeft: "auto", textAlign: "right", maxWidth: 140 }}>Updates live as you select features</p>
    </motion.div>
  );
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip ${active ? "active" : ""}`}
      style={{ padding: "9px 14px", fontSize: 13 }}
    >
      {active && <Check size={11} strokeWidth={3} style={{ flexShrink: 0 }} />}
      {label}
    </button>
  );
}

export function ProjectWizard() {
  const [step, setStep] = useState<Step>(0);
  const [siteTypes, setSiteTypes] = useState<string[]>([]);
  const [pages, setPages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [template, setTemplate] = useState<Template | null>(null);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [idea, setIdea] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const quote = calcQuote(siteTypes[0] ?? "", features, template?.basePrice ?? 0);

  const canNext: Record<Step, boolean> = {
    0: siteTypes.length > 0,
    1: true,
    2: !!template,
    3: !!budget && !!timeline,
    4: idea.length >= 10,
    5: !!name && /^\S+@\S+\.\S+$/.test(email),
  };

  const next = () => canNext[step] && setStep((s) => Math.min(5, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          customerName: name,
          items: [
            { id: "base", label: template?.name ?? siteTypes[0], price: quote },
          ],
          projectBrief: { siteTypes, pages, features, templateId: template?.id, budget, timeline, idea },
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        setCheckoutUrl(data.checkoutUrl);
        setDone(true);
      }
    } catch { /* show error */ } finally { setSubmitting(false); }
  };

  const stepContent: Record<Step, React.ReactNode> = {
    0: (
      <div>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16 }}>What are you building? <span style={{ color: "var(--text-faint)" }}>(Select all that apply)</span></p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SITE_TYPES.map((t) => <Toggle key={t} label={t} active={siteTypes.includes(t)} onClick={() => toggle(siteTypes, setSiteTypes, t)} />)}
        </div>
      </div>
    ),
    1: (
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Pages needed</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PAGE_OPTS.map((t) => <Toggle key={t} label={t} active={pages.includes(t)} onClick={() => toggle(pages, setPages, t)} />)}
          </div>
        </div>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Features required <span style={{ fontSize: 11, color: "var(--text-faint)" }}>(updates quote)</span></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FEATURES.map((t) => <Toggle key={t} label={t} active={features.includes(t)} onClick={() => toggle(features, setFeatures, t)} />)}
          </div>
        </div>
      </div>
    ),
    2: (
      <div>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16 }}>Pick a starting template — we customise it completely to your brand.</p>
        <TemplateGallery selected={template?.id ?? ""} onSelect={(t) => setTemplate(t)} />
      </div>
    ),
    3: (
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Budget range</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {BUDGETS.map((t) => <Toggle key={t} label={t} active={budget === t} onClick={() => setBudget(t)} />)}
          </div>
        </div>
        <div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Timeline</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TIMELINES.map((t) => <Toggle key={t} label={t} active={timeline === t} onClick={() => setTimeline(t)} />)}
          </div>
        </div>
      </div>
    ),
    4: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>
            Describe your vision <span style={{ color: "var(--text-faint)" }}>— competitors you like, must-have content, tone</span>
          </label>
          <textarea
            rows={5}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. Something like X brand but for the Lagos market. Needs to feel premium. Main goal is getting people to call us..."
            className="tw-input"
            style={{ resize: "vertical", minHeight: 120 }}
          />
          <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4 }}>{idea.length} chars · min 10</p>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>
            Inspiration / pitch images <span style={{ color: "var(--text-faint)" }}>(optional)</span>
          </label>
          <label
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8,
              padding: "24px",
              background: "var(--surface)",
              border: `2px dashed ${imageFile ? "var(--teal)" : "var(--border)"}`,
              borderRadius: 12,
              cursor: "pointer",
              transition: "border-color 0.15s",
              color: imageFile ? "var(--teal)" : "var(--text-faint)",
              fontSize: 13,
            }}
          >
            <Upload size={20} />
            {imageFile ? imageFile.name : "Click or drop an image"}
            <input type="file" accept="image/*" hidden onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
          </label>
        </div>
      </div>
    ),
    5: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Almost done — where should we send your detailed quote?</p>
        {[
          { key: "name", label: "Full name", type: "text", placeholder: "Your name", val: name, set: setName },
          { key: "email", label: "Email address", type: "email", placeholder: "you@example.com", val: email, set: setEmail },
        ].map((f) => (
          <div key={f.key}>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
            <input type={f.type} required placeholder={f.placeholder} value={f.val} onChange={(e) => f.set(e.target.value)} className="tw-input" />
          </div>
        ))}

        {/* Quote summary */}
        <div style={{ padding: "16px 18px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontSize: 11, color: "var(--text-faint)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Project summary</p>
          {[
            { label: "Types", value: siteTypes.join(", ") || "—" },
            { label: "Template", value: template?.name ?? "—" },
            { label: "Features", value: features.length ? `${features.length} selected` : "—" },
            { label: "Budget", value: budget || "—" },
            { label: "Timeline", value: timeline || "—" },
            { label: "Estimate", value: fmt(quote) },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
              <span style={{ color: "var(--text-faint)" }}>{row.label}</span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  if (done && checkoutUrl) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(0,212,212,0.12)", display: "grid", placeItems: "center", margin: "0 auto 20px", color: "var(--teal)" }}>
          <Check size={26} />
        </div>
        <h3 style={{ fontSize: 22, marginBottom: 10 }}>Brief received!</h3>
        <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.65 }}>
          We&apos;ll send a detailed quote to <strong style={{ color: "var(--text)" }}>{email}</strong> within 24 hours.
        </p>
        <p style={{ fontSize: 14, color: "var(--teal)", fontWeight: 700, marginBottom: 24 }}>Estimated: {fmt(quote)}</p>
        <a href={checkoutUrl} className="btn-teal" style={{ display: "inline-flex", gap: 8 }}>
          <ShoppingCart size={16} />
          Pay deposit to reserve your slot
        </a>
        <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 12 }}>50% upfront deposit, 50% on launch. Powered by Squad.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Check size={48} color="var(--teal)" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>Brief sent!</h3>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar step={step} />
      {step >= 1 && quote > 0 && <QuotePanel quote={quote} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18 }}
        >
          {stepContent[step]}
        </motion.div>
      </AnimatePresence>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="btn-ghost"
          style={{ fontSize: 13, padding: "9px 18px", opacity: step === 0 ? 0.3 : 1, display: "flex", alignItems: "center", gap: 6 }}
        >
          <ArrowLeft size={14} />
          Back
        </button>
        {step < 5 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canNext[step]}
            className="btn-teal"
            style={{ fontSize: 13, padding: "9px 22px", opacity: canNext[step] ? 1 : 0.4, display: "flex", alignItems: "center", gap: 6 }}
          >
            Next
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canNext[5] || submitting}
            className="btn-teal"
            style={{ fontSize: 13, padding: "9px 22px", opacity: canNext[5] ? 1 : 0.4, display: "flex", alignItems: "center", gap: 6 }}
          >
            {submitting ? "Sending…" : "Get my quote"}
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
