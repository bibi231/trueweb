"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";

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
  },
];

export function PortfolioContent() {
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

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "32px 32px",
                transition: "border-color 0.2s",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 20,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${p.color}35`)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                <span
                  style={{
                    width: 42, height: 42, borderRadius: 11,
                    background: `${p.color}18`, border: `1px solid ${p.color}30`,
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 19, color: p.color, flexShrink: 0,
                  }}
                >{p.name[0]}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 2 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800 }}>{p.name}</h3>
                    <span style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 500 }}>{p.tag}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 11, fontWeight: 600,
                        padding: "3px 10px", borderRadius: 6,
                        color: p.stat === "Live" ? "#4ade80" : "var(--text-faint)",
                        background: p.stat === "Live" ? "rgba(74,222,128,0.08)" : "var(--surface-2)",
                        border: `1px solid ${p.stat === "Live" ? "rgba(74,222,128,0.2)" : "var(--border)"}`,
                        whiteSpace: "nowrap",
                      }}
                    >{p.stat}</span>
                  </div>
                  <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
                </div>
                {p.url !== "#" && (
                  <a
                    href={p.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: "var(--surface-2)", border: "1px solid var(--border)",
                      display: "grid", placeItems: "center", color: "var(--text-muted)",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${p.color}50`; (e.currentTarget as HTMLElement).style.color = p.color; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>

              {/* Results + tech */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, borderTop: "1px solid var(--border)", paddingTop: 18 }}>
                <div>
                  <p style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10, fontWeight: 600 }}>Highlights</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {p.results.map((r) => (
                      <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircle size={13} color="var(--teal)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10, fontWeight: 600 }}>Stack</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{ fontSize: 11, padding: "3px 9px", borderRadius: 6, background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontWeight: 500 }}
                      >{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 480px) { [data-portfolio-grid] { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

export function Portfolio() {
  return <PortfolioContent />;
}
