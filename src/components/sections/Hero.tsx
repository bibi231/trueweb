"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PRODUCTS = [
  { name: "ReplyAI", url: "https://replyai.com.ng", tag: "AI Email" },
  { name: "HarvestAI", url: "https://harvestai.com.ng", tag: "Web Intelligence" },
  { name: "SupportAI", url: "https://supportai.com.ng", tag: "Customer Support" },
  { name: "NaijaLingo", url: "#", tag: "Language Learning" },
  { name: "NaijaHub", url: "#", tag: "Community" },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Animated particle grid */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / 60);
      const rows = Math.ceil(h / 60);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = (i / cols) * w;
          const y = (j / rows) * h;
          const wave = Math.sin(t * 0.8 + i * 0.4 + j * 0.3) * 0.5 + 0.5;
          const alpha = wave * 0.12;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 212, ${alpha})`;
          ctx.fill();
        }
      }
      t += 0.016;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg)",
        paddingTop: 68,
      }}
    >
      {/* Animated mesh */}
      <div className="mesh-gradient noise" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* Teal bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to top, var(--bg), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="section-inner" style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 760 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Web Design & Development · Nigeria</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(42px, 6vw, 76px)",
              lineHeight: 1.05,
              marginTop: 20,
              marginBottom: 24,
            }}
          >
            We build{" "}
            <span className="gradient-text">fast, beautiful</span>
            <br />
            digital products.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--text-muted)",
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            TrueWeb Solutions crafts websites, SaaS platforms, and AI-powered
            tools for Nigerian businesses that need to move fast and stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <a href="#build" className="btn-teal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Start a Project
            </a>
            <a href="#portfolio" className="btn-ghost">See our work</a>
          </motion.div>

          {/* Product chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              marginTop: 64,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <p
              style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)" }}
            >
              Products in the TrueWeb Network
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PRODUCTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.03)",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--teal)",
                      opacity: 0.7,
                    }}
                  />
                  {p.name}
                  <span style={{ color: "var(--text-faint)", fontSize: 11 }}>— {p.tag}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
