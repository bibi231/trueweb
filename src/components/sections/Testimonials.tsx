"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "TrueWeb built our e-commerce site in 3 weeks. Sales from the website went from zero to ₦2M in the first month.",
    name: "Adaeze O.",
    role: "Founder, Adaeze Fashion House · Lagos",
  },
  {
    quote: "The SupportAI chatbot they integrated handles 70% of our customer questions automatically. Our team finally has breathing room.",
    name: "Emeka N.",
    role: "CTO, LogistiNG · Abuja",
  },
  {
    quote: "We needed something that could speak Pidgin and Yoruba to our customers. TrueWeb were the only agency who understood that requirement immediately.",
    name: "Chidinma A.",
    role: "Head of Digital, FoodMart NG · Enugu",
  },
  {
    quote: "Professional, fast, transparent on pricing. Our new website load time went from 8s to 1.2s. Night and day.",
    name: "Babatunde L.",
    role: "MD, BrightPath Consulting · Lagos",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <span className="eyebrow">Client results</span>
          <div className="teal-line" style={{ margin: "16px auto" }} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>What clients say</h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card"
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <svg
                width="24"
                height="20"
                viewBox="0 0 30 24"
                fill="none"
                style={{ color: "var(--teal)", opacity: 0.5 }}
              >
                <path
                  d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6.4 7.2 10.4H12V24H0zm18 0V14.4C18 6.4 22.8 1.6 32.4 0L34 2.4C28.4 3.6 25.6 6.4 25.2 10.4H30V24H18z"
                  fill="currentColor"
                />
              </svg>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
