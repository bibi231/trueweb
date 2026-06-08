"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, FileText, Paintbrush, Code2, Rocket, HeartHandshake } from "lucide-react";

const STEPS = [
  { Icon: Search, num: "01", title: "Brief & Discovery", desc: "You fill our quick project brief — site type, features, budget, timeline, and vision. We review same day and jump on a call to align.", duration: "Day 1" },
  { Icon: FileText, num: "02", title: "Proposal & Quote", desc: "You receive a detailed scope document with a fixed price quote, timeline, and deliverables. No hidden costs.", duration: "Day 2–3" },
  { Icon: Paintbrush, num: "03", title: "Design Sprint", desc: "We produce high-fidelity mockups in Figma. You review and request changes before a single line of code is written.", duration: "Week 1" },
  { Icon: Code2, num: "04", title: "Build & Iterate", desc: "Weekly preview deploys so you can see progress. Feedback loops stay tight — changes ship fast.", duration: "Week 2–N" },
  { Icon: Rocket, num: "05", title: "QA & Launch", desc: "Cross-browser testing, performance audit (LCP < 2.5s), SEO check, and security scan before we go live.", duration: "Final week" },
  { Icon: HeartHandshake, num: "06", title: "Support & Growth", desc: "Post-launch: hosting, monitoring, content updates, and feature additions as your business grows.", duration: "Ongoing" },
];

export function ProcessContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

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
          <span className="eyebrow">How we work</span>
          <div className="teal-line" style={{ margin: "14px auto" }} />
          <h2>From brief to launch in weeks, not months</h2>
          <p>A predictable process that keeps you informed at every step — no surprises, no disappearing acts.</p>
        </motion.div>

        <div ref={containerRef} style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          {/* Track */}
          <div style={{ position: "absolute", left: 31, top: 0, bottom: 0, width: 1, background: "var(--border)" }} />
          <motion.div style={{ position: "absolute", left: 31, top: 0, width: 1, background: "linear-gradient(to bottom, var(--teal), var(--teal-dim))", height: lineH, boxShadow: "0 0 12px rgba(0,212,212,0.4)" }} />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 20, paddingBottom: i < STEPS.length - 1 ? 48 : 0, position: "relative" }}
            >
              <div
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "var(--surface)", border: "1px solid rgba(0,212,212,0.2)",
                  display: "grid", placeItems: "center", color: "var(--teal)", position: "relative", zIndex: 1,
                  boxShadow: "0 0 0 4px var(--bg)",
                }}
              >
                <s.Icon size={18} strokeWidth={1.8} />
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700 }}>{s.title}</h3>
                  <span style={{ fontSize: 11, color: "var(--teal)", background: "rgba(0,212,212,0.08)", border: "1px solid rgba(0,212,212,0.15)", padding: "2px 8px", borderRadius: 6, fontWeight: 600, flexShrink: 0 }}>{s.duration}</span>
                </div>
                <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return <ProcessContent />;
}
