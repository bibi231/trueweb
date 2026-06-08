"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Brief & Discovery",
    desc: "You fill our quick project brief — site type, features, budget, timeline, and vision. We review same day and jump on a call to align.",
  },
  {
    num: "02",
    title: "Proposal & Quote",
    desc: "You receive a detailed scope document with a fixed price quote, timeline, and deliverables. No hidden costs.",
  },
  {
    num: "03",
    title: "Design Sprint",
    desc: "We produce high-fidelity mockups in Figma. You review and request changes before a single line of code is written.",
  },
  {
    num: "04",
    title: "Build & Iterate",
    desc: "Weekly preview deploys so you can see progress. Feedback loops stay tight — changes ship fast.",
  },
  {
    num: "05",
    title: "QA & Launch",
    desc: "Cross-browser testing, performance audit (LCP < 2.5s), SEO check, and security scan before we go live.",
  },
  {
    num: "06",
    title: "Support & Growth",
    desc: "Post-launch: hosting, monitoring, content updates, and feature additions as your business grows.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" className="section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <span className="eyebrow">How we work</span>
          <div className="teal-line" style={{ margin: "16px auto" }} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            From brief to launch in weeks, not months
          </h2>
        </motion.div>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 0,
          }}
        >
          {/* Animated vertical line */}
          <div
            style={{
              position: "absolute",
              left: 31,
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              left: 31,
              top: 0,
              width: 1,
              background: "linear-gradient(to bottom, var(--teal), var(--teal-dim))",
              height: lineHeight,
              boxShadow: "0 0 12px rgba(0,212,212,0.4)",
            }}
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: 24,
                paddingBottom: i < STEPS.length - 1 ? 48 : 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "var(--surface-2)",
                  border: "1px solid rgba(0,212,212,0.2)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  fontSize: 13,
                  color: "var(--teal)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.num}
              </div>
              <div style={{ paddingTop: 10 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
