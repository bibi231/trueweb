"use client";

import { motion } from "framer-motion";

const PRODUCTS = [
  {
    name: "ReplyAI",
    tag: "AI Email Tool",
    desc: "Intelligent email reply generation for professionals. Processes any email thread and outputs polished, context-aware replies in seconds. Squad billing, Firebase auth, Neon Postgres.",
    url: "https://replyai.com.ng",
    color: "#6366f1",
    stat: "Live · replyai.com.ng",
    tech: ["Vite + React", "Express", "Neon/Drizzle", "Firebase", "Squad"],
  },
  {
    name: "HarvestAI",
    tag: "Web Intelligence",
    desc: "AI-powered web scraping and lead generation. Extracts structured data, contact info, and business leads from any URL — used by marketing and sales teams across Nigeria.",
    url: "https://harvestai.com.ng",
    color: "#d97706",
    stat: "Live · harvestai.com.ng",
    tech: ["Vite + React", "Express", "Neon/Drizzle", "Firebase", "Squad"],
  },
  {
    name: "SupportAI",
    tag: "AI Customer Support",
    desc: "Embeddable chatbot trained on your business data. Speaks English, Pidgin, Yoruba, and Hausa. Captures leads, handles FAQs, and escalates to humans — deployed via one script tag.",
    url: "https://supportai.com.ng",
    color: "#0ea5e9",
    stat: "Deploying · supportai.com.ng",
    tech: ["Vite + React", "Express", "MongoDB Atlas", "Socket.io", "Squad"],
  },
  {
    name: "NaijaLingo",
    tag: "Language Learning",
    desc: "Learn Yoruba, Hausa, Igbo, and Nigerian Pidgin with AI. Gamified lessons, speech recognition, adaptive SRS engine, and native speaker-quality TTS — Africa's Duolingo alternative.",
    url: "#",
    color: "#16a34a",
    stat: "Coming soon",
    tech: ["Next.js 15", "Drizzle/Neon", "Supabase Auth", "Gemini + Groq"],
  },
  {
    name: "NaijaHub",
    tag: "Community Forum",
    desc: "Modern, mobile-first forum for Nigerian conversations — threads, votes, ranked feed, realtime notifications, verified badges, and self-serve ad booking for businesses.",
    url: "#",
    color: "#dc2626",
    stat: "In development",
    tech: ["Next.js 16", "Express", "Firebase", "Drizzle/Neon"],
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,212,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <span className="eyebrow">Our work</span>
          <div className="teal-line" style={{ margin: "16px auto" }} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Products we&apos;ve built &amp; launched
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 17,
              maxWidth: 500,
              margin: "16px auto 0",
              lineHeight: 1.65,
            }}
          >
            Five live and in-development products that power Nigerian businesses
            and communities — all built in-house.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "32px 36px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 24,
                alignItems: "start",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${p.color}18`,
                      border: `1px solid ${p.color}30`,
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-syne)",
                      fontWeight: 800,
                      fontSize: 18,
                      color: p.color,
                    }}
                  >
                    {p.name[0]}
                  </span>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{p.name}</h3>
                    <span style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 500 }}>{p.tag}</span>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      color: p.stat.startsWith("Live") ? "#4ade80" : "var(--text-faint)",
                      padding: "3px 10px",
                      borderRadius: 6,
                      background: p.stat.startsWith("Live") ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${p.stat.startsWith("Live") ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.06)"}`,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.stat}
                  </span>
                </div>

                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 620, marginBottom: 18 }}>
                  {p.desc}
                </p>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {p.url !== "#" && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--text-muted)",
                    transition: "background 0.15s, border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${p.color}18`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`;
                    (e.currentTarget as HTMLElement).style.color = p.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
