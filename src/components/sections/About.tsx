"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Zap, Globe, Shield } from "lucide-react";

const STATS = [
  { value: "5+", label: "Products shipped" },
  { value: "₦0", label: "Hidden fees" },
  { value: "4", label: "Nigerian languages" },
  { value: "100%", label: "Remote-first" },
];

const VALUES = [
  { Icon: Zap, title: "Ship fast", desc: "We bias toward action. Good shipped beats perfect delayed." },
  { Icon: Globe, title: "Nigeria-first", desc: "Naira pricing, local payment rails, and languages your customers actually speak." },
  { Icon: Shield, title: "No lock-in", desc: "We hand over the code, repos, and hosting. You own everything, always." },
  { Icon: MapPin, title: "Built here", desc: "Based in Abuja. We understand the market because we operate in it." },
];

function FounderPortraitHover() {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="/founder" style={{ display: "block", borderRadius: 18, overflow: "hidden", position: "relative", flexShrink: 0, aspectRatio: "3/4", background: "var(--surface)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/founder/Bitrus_white_agbada.jpg" alt="Bitrus J-K Gadzama, founder TrueWeb Solutions" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.5s", position: "absolute", inset: 0, opacity: hovered ? 0 : 1, borderRadius: 18 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/founder/Bitrus_bw_durag.jpg" alt="Bitrus Gadzama" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 18, opacity: hovered ? 1 : 0, transition: "opacity 0.5s" }} />
    </a>
  );
}

export function AboutContent({ showFaq: _showFaq }: { showFaq?: boolean }) {
  return (
    <>
      {/* Founder teaser — above main about copy */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 48, alignItems: "center", marginBottom: 0 }} className="tw-founder-teaser">
            <FounderPortraitHover />
            <div>
              <span className="eyebrow">Meet the founder</span>
              <div className="teal-line" />
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", marginBottom: 14 }}>Bitrus J-K Gadzama</h2>
              <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
                Software engineer and product builder based in Abuja. Founded TrueWeb Solutions and built ReplyAI, HarvestAI, and SupportAI — products designed specifically for the Nigerian market.
              </p>
              <a href="/founder" className="btn-ghost" style={{ fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
                Read the founder&apos;s story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
        <style>{`
          .founder-hover-wrap:hover .founder-img-primary,
          .founder-hover-wrap:focus .founder-img-primary { opacity: 0 !important; }
          .founder-hover-wrap:hover .founder-img-hover,
          .founder-hover-wrap:focus .founder-img-hover { opacity: 1 !important; }
          @media (max-width: 640px) { .tw-founder-teaser { grid-template-columns: 1fr !important; } .tw-founder-teaser > a { max-width: 200px; } }
        `}</style>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="tw-about-grid">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
              <span className="eyebrow">Who we are</span>
              <div className="teal-line" />
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", marginBottom: 20 }}>
                A Nigerian agency that ships.
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 16 }}>
                TrueWeb Solutions was built in Abuja by builders who got tired of slow, overpriced agencies that disappear after launch. We&apos;re the team you call when deadlines are real and quality is non-negotiable.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 32 }}>
                We build and operate five products ourselves — ReplyAI, HarvestAI, SupportAI, NaijaLingo, and NaijaHub — so when we touch your project, we bring product-company thinking, not just service delivery.
              </p>
              <a
                href="mailto:hello@trueweb.com.ng"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--teal)", fontWeight: 600 }}
              >
                hello@trueweb.com.ng
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay: 0.1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                {STATS.map((s) => (
                  <div key={s.label} className="card" style={{ textAlign: "center", padding: "24px 16px" }}>
                    <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 34, color: "var(--teal)", marginBottom: 4, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "18px 22px", background: "rgba(0,212,212,0.04)", border: "1px solid rgba(0,212,212,0.12)", borderRadius: 13 }}>
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.65 }}>
                  <strong style={{ color: "var(--teal)" }}>Nigeria-first.</strong> All our products support Naira payments (Squad/Paystack), Nigerian phone numbers, and local languages. We build for this market because we live in it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 40 }}
          >
            <span className="eyebrow">Our values</span>
            <div className="teal-line" style={{ margin: "14px auto" }} />
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>What drives us</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card"
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,212,0.08)", border: "1px solid rgba(0,212,212,0.15)", display: "grid", placeItems: "center", color: "var(--teal)", marginBottom: 14 }}>
                  <v.Icon size={18} strokeWidth={1.8} />
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{v.title}</h4>
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 768px) { .tw-about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </>
  );
}

export function About() {
  return <AboutContent />;
}
