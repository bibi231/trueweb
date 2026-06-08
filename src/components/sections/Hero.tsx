"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const ShaderLines = dynamic(() => import("@/components/ui/ShaderLines").then((m) => m.ShaderLines), {
  ssr: false,
  loading: () => null,
});

const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Scene), {
  ssr: false,
  loading: () => null,
});

const HEADLINE_WORDS = ["We", "build", "fast,", "beautiful", "digital", "products."];

const PRODUCTS = [
  { name: "ReplyAI", url: "https://replyai.com.ng", tag: "AI Email" },
  { name: "HarvestAI", url: "https://harvestai.com.ng", tag: "Web Intel" },
  { name: "SupportAI", url: "https://supportai.com.ng", tag: "AI Support" },
  { name: "NaijaLingo", url: "#", tag: "Language" },
  { name: "NaijaHub", url: "#", tag: "Community" },
];

const word = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  const [reduce, setReduce] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const t = setTimeout(() => setShow3D(true), 800);
    return () => clearTimeout(t);
  }, []);

  /* Ambient particle canvas (instant, lightweight) */
  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let t = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 1.5);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 1.5);
      ctx.scale(canvas.width / canvas.offsetWidth, canvas.height / canvas.offsetHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i <= 18; i++) {
        for (let j = 0; j <= 10; j++) {
          const x = (i / 18) * w, y = (j / 10) * h;
          const a = (Math.sin(t + i * 0.45 + j * 0.3) * 0.5 + 0.5) * 0.09;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,212,${a})`;
          ctx.fill();
        }
      }
      t += 0.014;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [reduce]);

  /* Mouse parallax */
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reduce) return;
    const el = heroRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 20;
      const y = ((e.clientY - top) / height - 0.5) * 12;
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [reduce]);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg)",
        paddingTop: 68,
      }}
    >
      {/* Shader lines (primary GPU animation) */}
      {!reduce && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.25 }}>
          <ShaderLines />
        </div>
      )}

      {/* Ambient layers */}
      <div
        className="mesh-gradient"
        style={{
          transform: reduce ? "none" : "translate(calc(var(--px, 0px) * 0.3), calc(var(--py, 0px) * 0.3))",
          transition: "transform 0.1s ease-out",
        }}
      />
      <div className="aurora"><div className="aurora-1" /></div>
      <div className="aurora"><div className="aurora-2" /></div>

      {/* Particle canvas (instant) */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5, pointerEvents: "none" }}
      />

      {/* 3D scene (deferred) */}
      {show3D && !reduce && (
        <div style={{ position: "absolute", inset: 0, opacity: 0.45, zIndex: 0, transition: "opacity 1s" }}>
          <Hero3D />
        </div>
      )}

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none", zIndex: 2 }} />

      {/* Content */}
      <div className="section-inner" style={{ position: "relative", zIndex: 3, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 780 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Web Design &amp; Development &middot; Nigeria</span>
          </motion.div>

          <h1
            style={{
              fontSize: "clamp(42px, 6.5vw, 80px)",
              lineHeight: 1.02,
              marginTop: 20,
              marginBottom: 24,
              display: "flex",
              flexWrap: "wrap",
              gap: "0 12px",
            }}
          >
            {HEADLINE_WORDS.map((w, i) => (
              <motion.span
                key={w + i}
                custom={i}
                variants={word}
                initial="hidden"
                animate="show"
                style={{ display: "inline-block" }}
                className={w === "fast," || w === "beautiful" ? "gradient-text" : ""}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.65, color: "var(--text-muted)", maxWidth: 560, marginBottom: 40 }}
          >
            TrueWeb Solutions crafts websites, SaaS platforms, and AI-powered tools for Nigerian businesses that need to move fast and stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <Link href="/start" className="btn-teal">
              <ArrowRight size={16} />
              Start a Project
            </Link>
            <Link href="/work" className="btn-ghost">See our work</Link>
          </motion.div>

          {/* TrueWeb Network chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 12 }}
          >
            <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)" }}>
              Products in the TrueWeb Network
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PRODUCTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target={p.url === "#" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "rgba(255,255,255,0.02)",
                    fontSize: 12, color: "var(--text-muted)",
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", opacity: 0.7, flexShrink: 0 }} />
                  {p.name}
                  <span style={{ color: "var(--text-faint)", fontSize: 10 }}>— {p.tag}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "var(--text-faint)", fontSize: 11, letterSpacing: "0.1em",
          zIndex: 4, pointerEvents: "none",
        }}
      >
        <span>SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
