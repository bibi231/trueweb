"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export type Template = {
  id: string;
  name: string;
  category: string;
  desc: string;
  basePrice: number;
  colors: string[];
  tags: string[];
};

const TEMPLATES: Template[] = [
  {
    id: "saas-dark",
    name: "SaaS Dark",
    category: "SaaS / App",
    desc: "Sleek dark dashboard-first SaaS template. Hero, features, pricing, and auth pages.",
    basePrice: 35000000,
    colors: ["#050507", "#00d4d4", "#6366f1"],
    tags: ["Auth", "Pricing", "Dashboard", "Dark"],
  },
  {
    id: "business-light",
    name: "Business Clean",
    category: "Business Website",
    desc: "Professional light website for service businesses, agencies, and consultancies.",
    basePrice: 25000000,
    colors: ["#f8fafc", "#0097a7", "#0f172a"],
    tags: ["Services", "About", "Contact", "SEO"],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    category: "E-Commerce",
    desc: "Product-focused store with cart, checkout (Squad/Paystack), and admin.",
    basePrice: 45000000,
    colors: ["#ffffff", "#16a34a", "#111827"],
    tags: ["Cart", "Payments", "Inventory", "Mobile"],
  },
  {
    id: "portfolio",
    name: "Portfolio Pro",
    category: "Portfolio",
    desc: "Creative portfolio for freelancers, designers, and studios. Case studies + contact.",
    basePrice: 18000000,
    colors: ["#0a0a0f", "#e879f9", "#f0abfc"],
    tags: ["Work", "Case Studies", "Blog"],
  },
  {
    id: "landing",
    name: "Launch Pad",
    category: "Landing Page",
    desc: "Single-purpose high-conversion landing page. Hero, social proof, CTA, FAQ.",
    basePrice: 15000000,
    colors: ["#09090e", "#f59e0b", "#fbbf24"],
    tags: ["Conversion", "Waitlist", "Analytics"],
  },
  {
    id: "blog",
    name: "Content Studio",
    category: "Blog / Content",
    desc: "Modern blog/publication with CMS, newsletter, and SEO-first architecture.",
    basePrice: 22000000,
    colors: ["#fafafa", "#0f172a", "#64748b"],
    tags: ["CMS", "Newsletter", "SEO", "RSS"],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.category)))];

type Props = {
  selected: string;
  onSelect: (t: Template) => void;
};

export function TemplateGallery({ selected, onSelect }: Props) {
  const [cat, setCat] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = cat === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);

  return (
    <div>
      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip ${cat === c ? "active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
        {filtered.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(t)}
            onMouseEnter={() => setHovered(t.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              background: "var(--surface)",
              border: `2px solid ${selected === t.id ? "var(--teal)" : hovered === t.id ? "var(--border-mid)" : "var(--border)"}`,
              borderRadius: 14,
              padding: "0 0 14px",
              cursor: "pointer",
              transition: "border-color 0.15s, transform 0.15s",
              transform: hovered === t.id ? "translateY(-2px)" : "none",
              textAlign: "left",
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              overflow: "hidden",
            }}
          >
            {/* Preview swatch */}
            <div
              style={{
                height: 88,
                background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[2]})`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              {/* Fake UI preview */}
              <div style={{ width: "70%", display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ height: 6, background: t.colors[1], borderRadius: 3, width: "60%", opacity: 0.9 }} />
                <div style={{ height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2, width: "80%" }} />
                <div style={{ height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2, width: "65%" }} />
                <div style={{ height: 16, background: t.colors[1], borderRadius: 4, width: "40%", marginTop: 4, opacity: 0.85 }} />
              </div>
              {selected === t.id && (
                <div style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: "var(--teal)", display: "grid", placeItems: "center" }}>
                  <Check size={12} color="#050507" strokeWidth={3} />
                </div>
              )}
            </div>

            <div style={{ padding: "0 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{t.name}</span>
                <span style={{ fontSize: 10, color: "var(--teal)", fontWeight: 700 }}>
                  from ₦{(t.basePrice / 100).toLocaleString()}
                </span>
              </div>
              <p style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 8 }}>{t.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {t.tags.slice(0, 3).map((tag) => (
                  <span key={tag} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-faint)" }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
