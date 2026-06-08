"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "5+", label: "Products shipped" },
  { value: "₦0", label: "Hidden fees" },
  { value: "4", label: "Nigerian languages" },
  { value: "100%", label: "Remote-first" },
];

export function About() {
  return (
    <section id="about" className="section">
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "40%",
          background:
            "radial-gradient(ellipse 100% 60% at 0% 50%, rgba(0,212,212,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="section-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">Who we are</span>
          <div className="teal-line" />
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", marginBottom: 20 }}>
            A Nigerian agency that ships.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-muted)",
              lineHeight: 1.75,
              marginBottom: 16,
            }}
          >
            TrueWeb Solutions was built in Abuja by builders who got tired of slow,
            overpriced agencies that disappear after launch. We're the team you
            call when deadlines are real and quality is non-negotiable.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-muted)",
              lineHeight: 1.75,
              marginBottom: 32,
            }}
          >
            We build and operate five products ourselves — ReplyAI, HarvestAI,
            SupportAI, NaijaLingo, and NaijaHub — so when we touch your project,
            we bring product-company thinking, not just service delivery.
          </p>
          <a
            href="mailto:hello@trueweb.com.ng"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "var(--teal)",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
          >
            hello@trueweb.com.ng
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="card"
                style={{ textAlign: "center", padding: "28px 20px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    fontSize: 36,
                    color: "var(--teal)",
                    marginBottom: 6,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-faint)", fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              padding: "20px 24px",
              background: "rgba(0,212,212,0.04)",
              border: "1px solid rgba(0,212,212,0.12)",
              borderRadius: 14,
            }}
          >
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65 }}>
              <strong style={{ color: "var(--teal)" }}>Nigeria-first.</strong> All our products
              support Naira payments (Squad/Paystack), Nigerian phone numbers, and
              local languages. We build for this market because we live in it.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .section-inner { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
