"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Website Design & Dev",
    desc: "Pixel-perfect responsive websites. Fast load times, modern design, built on Next.js or Vite.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "SaaS & Web Apps",
    desc: "Full-stack product development — auth, payments, database, real-time features, and deployment.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "AI Integration",
    desc: "Add AI features: chatbots, auto-replies, data extraction, language support, and smart workflows.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
    title: "E-Commerce",
    desc: "Online stores with cart, checkout, payment (Squad, Paystack, Flutterwave), and inventory.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Performance & SEO",
    desc: "Core Web Vitals optimization, semantic HTML, JSON-LD, sitemaps, and Google Search Console setup.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Maintenance & Support",
    desc: "Ongoing hosting, updates, security patches, and priority support for existing projects.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Services() {
  return (
    <section id="services" className="section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56, textAlign: "center" }}
        >
          <span className="eyebrow">What we do</span>
          <div className="teal-line" style={{ margin: "16px auto" }} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Everything your business needs online
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 17,
              maxWidth: 540,
              margin: "16px auto 0",
              lineHeight: 1.65,
            }}
          >
            From a single landing page to a full SaaS platform — we build it
            fast, ship it clean, and support it long-term.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.title} variants={item} className="card">
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(0,212,212,0.08)",
                  border: "1px solid rgba(0,212,212,0.15)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--teal)",
                  marginBottom: 18,
                }}
              >
                {s.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
