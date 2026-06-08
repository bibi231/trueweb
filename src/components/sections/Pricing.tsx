"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Landing Page",
    price: "₦150,000",
    tag: "one-time",
    desc: "A single high-converting landing page for a product, event, or campaign.",
    features: [
      "Up to 5 sections",
      "Mobile-responsive",
      "Performance-optimised",
      "Basic SEO setup",
      "Contact form",
      "1 round of revisions",
      "Handed off or hosted",
    ],
    cta: "Get a quote",
    highlight: false,
  },
  {
    name: "Business Website",
    price: "₦350,000",
    tag: "one-time",
    desc: "A full marketing site with multiple pages, blog, and everything to convert visitors.",
    features: [
      "Up to 8 pages",
      "CMS integration",
      "SEO + OG + sitemaps",
      "Contact & lead forms",
      "Google Analytics",
      "2 rounds of revisions",
      "3 months free support",
    ],
    cta: "Start this project",
    highlight: true,
  },
  {
    name: "SaaS / Web App",
    price: "Custom",
    tag: "scope-based",
    desc: "Full-stack product with auth, payments, database, real-time features, and deployment.",
    features: [
      "Product scoping session",
      "Auth (Firebase / Supabase)",
      "Payments (Squad / Paystack)",
      "Admin dashboard",
      "API + database",
      "CI/CD setup",
      "Ongoing support plan",
    ],
    cta: "Book a call",
    highlight: false,
  },
];

const ADDONS = [
  { name: "AI chatbot integration", price: "₦80,000" },
  { name: "E-commerce store", price: "₦120,000" },
  { name: "Multilingual (EN/Pidgin/Yoruba/Hausa)", price: "₦60,000" },
  { name: "Monthly maintenance plan", price: "₦25,000/mo" },
  { name: "SEO content package (5 pages)", price: "₦40,000" },
];

export function Pricing() {
  const [activeAddon, setActiveAddon] = useState<string | null>(null);

  return (
    <section id="pricing" className="section">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,212,212,0.04) 0%, transparent 70%)",
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
          <span className="eyebrow">Transparent pricing</span>
          <div className="teal-line" style={{ margin: "16px auto" }} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Fair rates, no surprises
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 17,
              maxWidth: 480,
              margin: "16px auto 0",
              lineHeight: 1.65,
            }}
          >
            Prices are in Naira. We work with Nigerian SMEs, startups, and enterprise clients.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 48,
          }}
        >
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: p.highlight ? "rgba(0,212,212,0.05)" : "var(--surface)",
                border: p.highlight
                  ? "1px solid rgba(0,212,212,0.25)"
                  : "1px solid var(--border)",
                borderRadius: 20,
                padding: 32,
                position: "relative",
                boxShadow: p.highlight ? "0 0 40px rgba(0,212,212,0.08)" : "none",
              }}
            >
              {p.highlight && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--teal)",
                    color: "#050507",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "4px 14px",
                    borderRadius: 20,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most popular
                </span>
              )}

              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{p.tag}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{p.name}</h3>
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 36,
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    color: p.highlight ? "var(--teal)" : "#fff",
                  }}
                >
                  {p.price}
                </span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
                {p.desc}
              </p>

              <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 8 }}>
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-muted)" }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "rgba(0,212,212,0.12)",
                        border: "1px solid rgba(0,212,212,0.2)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        color: "var(--teal)",
                        fontSize: 11,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#build"
                className={p.highlight ? "btn-teal" : "btn-ghost"}
                style={{ width: "100%", justifyContent: "center", borderRadius: 12 }}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h3
            style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, textAlign: "center", color: "var(--text-muted)" }}
          >
            Add-ons & extras
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {ADDONS.map((a) => (
              <div
                key={a.name}
                onClick={() => setActiveAddon(activeAddon === a.name ? null : a.name)}
                style={{
                  padding: "14px 18px",
                  borderRadius: 12,
                  background: activeAddon === a.name ? "rgba(0,212,212,0.05)" : "var(--surface)",
                  border: activeAddon === a.name ? "1px solid rgba(0,212,212,0.2)" : "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{a.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)", whiteSpace: "nowrap" }}>
                  {a.price}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--text-faint)", textAlign: "center", marginTop: 20 }}>
            All prices exclusive of hosting costs. Custom enterprise pricing available.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
