"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle, ChevronDown } from "lucide-react";

const PRODUCTS = [
  {
    name: "ReplyAI",
    tag: "AI Email Tool",
    desc: "Intelligent email reply generation for professionals. Processes any email thread and outputs polished, context-aware replies in seconds.",
    url: "https://replyai.com.ng",
    color: "#6366f1",
    stat: "Live",
    tech: ["Vite + React", "Express", "Neon/Drizzle", "Firebase", "Squad"],
    results: ["500+ active users", "₦0 infra cost first month", "< 1s reply generation"],
    detail: "Built on Vite + React with a lightweight Express backend. Uses Gemini 2.0 Flash for generation, Firebase for auth, Squad for ₦ credit packs. First product in the TrueWeb portfolio to reach ₦100k MRR.",
  },
  {
    name: "HarvestAI",
    tag: "Web Intelligence",
    desc: "AI-powered web scraping and lead generation. Extracts structured data, contact info, and business leads from any URL.",
    url: "https://harvestai.com.ng",
    color: "#d97706",
    stat: "Live",
    tech: ["Vite + React", "Express", "Neon/Drizzle", "Firebase", "Squad"],
    results: ["Bulk scrape 1000+ URLs", "Supports CSV + JSON export", "Proxy rotation built-in"],
    detail: "Headless browser scraping with rotating proxies + AI extraction. Handles paywalls, SPAs, and lazy-loaded content. CSV/JSON export. Pay-per-credit via Squad.",
  },
  {
    name: "SupportAI",
    tag: "AI Customer Support",
    desc: "Embeddable chatbot trained on your business data. Speaks English, Pidgin, Yoruba, and Hausa — deployed via one script tag.",
    url: "https://supportai.com.ng",
    color: "#0ea5e9",
    stat: "Deploying",
    tech: ["Vite + React", "Express", "MongoDB Atlas", "Socket.io", "Squad"],
    results: ["4 Nigerian languages", "< 5 min embed", "Lead capture built-in"],
    detail: "RAG-powered chatbot using Gemini + Groq. Socket.io streaming. MongoDB Atlas. Widget deployed via one script tag. Auto language detection across EN/Pidgin/Yoruba/Hausa.",
  },
  {
    name: "NaijaLingo",
    tag: "Language Learning",
    desc: "Learn Yoruba, Hausa, Igbo, and Nigerian Pidgin with AI. Gamified lessons, speech recognition, adaptive SRS engine.",
    url: "#",
    color: "#16a34a",
    stat: "Coming Soon",
    tech: ["Next.js 15", "Drizzle/Neon", "Supabase Auth", "Gemini + Groq"],
    results: ["4 local languages", "Duolingo-style gamification", "Native-quality TTS"],
    detail: "Spaced-repetition language learning for Nigerian languages. Daily streaks, XP leagues, AI conversation partner. Designed for diaspora learners and domestic speakers building literacy.",
  },
  {
    name: "NaijaHub",
    tag: "Community Forum",
    desc: "Modern, mobile-first forum for Nigerian conversations — threads, votes, ranked feed, realtime notifications, and self-serve ad booking.",
    url: "#",
    color: "#dc2626",
    stat: "In Development",
    tech: ["Next.js 16", "Express", "Firebase", "Drizzle/Neon"],
    results: ["Reddit-style ranking", "Self-serve ad booking", "Verified badges"],
    detail: "Three-package monorepo (forum/backend/admin). Infinite ranked feed, mod queue, realtime notifications. Self-serve ad booking with Squad payment. Creator tips + Paystack.",
  },
];

export function PortfolioContent() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="section">
      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Our work</span>
          <div className="teal-line" style={{ margin: "14px auto" }} />
          <h2>Products we&apos;ve built &amp; launched</h2>
          <p>Five live and in-development products that power Nigerian businesses and communities — all built in-house by TrueWeb.</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {PRODUCTS.map((p, i) => {
            const isOpen = expanded === p.name;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                layout
                style={{
                  background: isOpen ? `${p.color}06` : "var(--surface)",
                  border: `1px solid ${isOpen ? `${p.color}30` : "var(--border)"}`,
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) (e.currentTarget as HTMLElement).style.borderColor = `${p.color}35`;
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                }}
                onClick={() => setExpanded(isOpen ? null : p.name)}
              >
                {/* Always-visible row */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "20px 24px",
                  flexWrap: "wrap",
                }}>
                  <span
                    style={{
                      width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                      background: `${p.color}18`, border: `1px solid ${p.color}30`,
                      display: "grid", placeItems: "center",
                      fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18, color: p.color,
                    }}
                  >{p.name[0]}</span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 800 }}>{p.name}</h3>
                      <span style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 500 }}>{p.tag}</span>
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.55 }}>{p.desc}</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, whiteSpace: "nowrap",
                      color: p.stat === "Live" ? "#4ade80" : "var(--text-faint)",
                      background: p.stat === "Live" ? "rgba(74,222,128,0.08)" : "var(--surface-2)",
                      border: `1px solid ${p.stat === "Live" ? "rgba(74,222,128,0.2)" : "var(--border)"}`,
                    }}>{p.stat}</span>
                    {p.url !== "#" && (
                      <a
                        href={p.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                          background: "var(--surface-2)", border: "1px solid var(--border)",
                          display: "grid", placeItems: "center", color: "var(--text-muted)",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = p.color; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "var(--text-faint)", display: "flex" }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20,
                        padding: "0 24px 24px", borderTop: `1px solid ${p.color}15`,
                        paddingTop: 20,
                      }} className="tw-portfolio-grid">
                        {/* Context */}
                        <div>
                          <p style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 8 }}>Context</p>
                          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{p.detail}</p>
                        </div>
                        {/* Results */}
                        <div>
                          <p style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 8 }}>Highlights</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {p.results.map((r) => (
                              <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <CheckCircle size={13} color="var(--teal)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{r}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Stack */}
                        <div>
                          <p style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 8 }}>Stack</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {p.tech.map((t) => (
                              <span key={t} style={{
                                fontSize: 11, padding: "3px 9px", borderRadius: 6,
                                background: "var(--surface-2)", border: `1px solid ${p.color}20`,
                                color: "var(--text-muted)", fontWeight: 500,
                              }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .tw-portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

export function Portfolio() {
  return <PortfolioContent />;
}
