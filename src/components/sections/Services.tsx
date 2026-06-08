"use client";

import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/BackgroundPaths";
import { LayoutGrid, Layers, Cpu, ShoppingCart, BarChart2, Wrench, ChevronDown } from "lucide-react";
import { useState } from "react";

const SERVICES = [
  {
    Icon: LayoutGrid,
    title: "Website Design & Dev",
    desc: "Pixel-perfect responsive websites. Fast load times, modern design, built on Next.js or Vite.",
    detail: "We design in Figma first — you approve before a line of code is written. Every site is mobile-first, passes Core Web Vitals, and ships with SEO basics (meta, OG, sitemap) out of the box.",
  },
  {
    Icon: Layers,
    title: "SaaS & Web Apps",
    desc: "Full-stack product development — auth, payments, database, real-time features, and deployment.",
    detail: "From MVP to scale: we architect the right stack for your product. Firebase/Supabase auth, Squad/Paystack billing, Neon Postgres, Vercel deploys, and CI/CD from day one.",
  },
  {
    Icon: Cpu,
    title: "AI Integration",
    desc: "Add AI features: chatbots, auto-replies, data extraction, language support, and smart workflows.",
    detail: "We wire up Gemini, GPT-4, and Groq into your product. Chatbots trained on your business data, multilingual support (EN/Pidgin/Yoruba/Hausa), and RAG pipelines that stay accurate.",
  },
  {
    Icon: ShoppingCart,
    title: "E-Commerce",
    desc: "Online stores with cart, checkout, payments (Squad, Paystack, Flutterwave), and inventory.",
    detail: "Custom storefronts or headless Shopify. Naira-first pricing, local payment rails, WhatsApp order confirmation, and admin dashboards you can actually use.",
  },
  {
    Icon: BarChart2,
    title: "Performance & SEO",
    desc: "Core Web Vitals optimization, semantic HTML, JSON-LD, sitemaps, and Search Console setup.",
    detail: "We audit your existing site for speed, accessibility, and indexability. Google PageSpeed 90+, LCP under 2.5s, and structured data that earns rich results in search.",
  },
  {
    Icon: Wrench,
    title: "Maintenance & Support",
    desc: "Ongoing hosting, updates, security patches, and priority support for existing projects.",
    detail: "Monthly care plans: hosting on Vercel/Render, weekly backups, dependency updates, security monitoring, and a guaranteed 48h response SLA on issues.",
  },
];

const FAQS = [
  { q: "How long does a typical website take?", a: "A landing page is 5–7 days. A business website is 2–3 weeks. A SaaS product is scoped per project — typically 4–10 weeks depending on complexity." },
  { q: "Do you work with businesses outside Nigeria?", a: "Yes. We work remotely with clients globally. Our pricing is in Naira for local clients, but we invoice in USD or GBP for international projects." },
  { q: "Can I see designs before you start coding?", a: "Always. Our process starts with Figma mockups. You review, request changes, and approve before development begins." },
  { q: "What payment methods do you accept?", a: "Squad (card, bank transfer, USSD), Paystack, and bank transfer for Nigerian clients. Stripe or Wise for international." },
  { q: "Do you offer a warranty on your work?", a: "Yes — 30 days of bug fixes post-launch at no charge. After that, monthly maintenance plans cover ongoing support." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export function ServicesContent({ showFaq = false }: { showFaq?: boolean }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section className="section" style={{ position: "relative" }}>
        <BackgroundPaths opacity={0.12} />
        <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">What we do</span>
            <div className="teal-line" style={{ margin: "14px auto" }} />
            <h2>Everything your business needs online</h2>
            <p>From a single landing page to a full SaaS platform — we build it fast, ship it clean, and support it long-term.</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}
          >
            {SERVICES.map((s) => (
              <motion.div key={s.title} variants={item} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(0,212,212,0.08)", border: "1px solid rgba(0,212,212,0.15)",
                    display: "grid", placeItems: "center", color: "var(--teal)", flexShrink: 0,
                  }}
                >
                  <s.Icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{s.desc}</p>
                  {showFaq && s.detail && (
                    <p style={{ fontSize: 13, color: "var(--text-faint)", lineHeight: 1.6, marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                      {s.detail}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {showFaq && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner" style={{ maxWidth: 760 }}>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 40 }}
            >
              <span className="eyebrow">FAQ</span>
              <div className="teal-line" style={{ margin: "14px auto" }} />
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>Common questions</h2>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FAQS.map((f, i) => (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "18px 20px", background: "none", border: "none", cursor: "pointer",
                      color: "var(--text)", fontFamily: "inherit", fontSize: 15, fontWeight: 600, textAlign: "left", gap: 12,
                    }}
                  >
                    {f.q}
                    <ChevronDown
                      size={16}
                      color="var(--text-muted)"
                      style={{ flexShrink: 0, transition: "transform 0.25s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}
                    />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 20px 18px", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                      {f.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* Default export for homepage embed */
export function Services() {
  return <ServicesContent showFaq={false} />;
}
