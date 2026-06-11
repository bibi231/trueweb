"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Trash2, CreditCard, X } from "lucide-react";
import { useCart } from "@/store/cart";

/* ─── Plans ──────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "landing",
    name: "Landing Page",
    price: 15000000,
    tag: "one-time",
    desc: "A single high-converting landing page for a product, event, or campaign.",
    features: ["Up to 5 sections", "Mobile-responsive", "Performance-optimised", "Basic SEO setup", "Contact form", "1 round of revisions"],
    cta: "Add to cart",
    highlight: false,
  },
  {
    id: "business",
    name: "Business Website",
    price: 35000000,
    tag: "one-time",
    desc: "A full marketing site with multiple pages, blog-ready, and everything to convert visitors.",
    features: ["Up to 8 pages", "CMS integration", "SEO + OG + sitemaps", "Contact & lead forms", "Google Analytics", "2 rounds of revisions", "3 months free support"],
    cta: "Add to cart",
    highlight: true,
  },
  {
    id: "saas",
    name: "SaaS / Web App",
    price: 0,
    tag: "custom",
    desc: "Full-stack product with auth, payments, database, real-time features, and deployment.",
    features: ["Product scoping session", "Auth (Firebase / Supabase)", "Payments (Squad/Paystack)", "Admin dashboard", "API + database", "CI/CD setup", "Ongoing support plan"],
    cta: "Book a call",
    highlight: false,
  },
];

const SUBSCRIPTIONS = [
  {
    id: "care",
    name: "Care",
    price: 2500000,
    desc: "Hosting, weekly backups, uptime monitoring, security patches.",
    features: ["Vercel/Render hosting", "Weekly backups", "Uptime monitoring", "48h support SLA"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 5000000,
    desc: "Everything in Care plus content updates, SEO reports, and 2 feature tickets.",
    features: ["All Care features", "2 content updates/mo", "Monthly SEO report", "2 feature tickets/mo"],
  },
  {
    id: "scale",
    name: "Scale",
    price: 12000000,
    desc: "Dedicated bandwidth, priority support, unlimited minor changes, and a monthly strategy call.",
    features: ["All Growth features", "Unlimited minor changes", "Priority support (4h SLA)", "Monthly strategy call"],
  },
];

const ADDONS = [
  { id: "addon-logo", label: "Logo design", price: 4500000 },
  { id: "addon-copy", label: "Copywriting (5 pages)", price: 3500000 },
  { id: "addon-seo", label: "SEO content pack", price: 4000000 },
  { id: "addon-chat", label: "AI chatbot integration", price: 8000000 },
  { id: "addon-rush", label: "Rush delivery (< 1 week)", price: 6000000 },
  { id: "addon-i18n", label: "Multi-language (EN/Pidgin/YH)", price: 5000000 },
];

function fmt(kobo: number) {
  return `₦${(kobo / 100).toLocaleString("en-NG")}`;
}

/* ─── Cart sheet ─────────────────────────────────────────────── */
function CartSheet({ onClose }: { onClose: () => void }) {
  const { items, remove, total } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkout = async () => {
    if (!email || items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, items }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError("Couldn't start checkout. Please try again or contact us.");
      }
    } catch {
      setError("Network error — check your connection and try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        style={{
          width: "min(400px, 96vw)",
          height: "100dvh",
          background: "var(--bg)",
          borderLeft: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 16px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <ShoppingCart size={18} color="var(--teal)" />
            Cart <span style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 500 }}>({items.length} items)</span>
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <p style={{ color: "var(--text-faint)", fontSize: 14, textAlign: "center", marginTop: 40 }}>Cart is empty</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 600 }}>{item.label}</p>
                    <p style={{ fontSize: 11, color: "var(--teal)", fontWeight: 700 }}>{fmt(item.price)}{item.recurring ? "/mo" : ""}</p>
                  </div>
                  <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", padding: 6 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: "16px 24px 28px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 20, color: "var(--teal)" }}>{fmt(total())}</span>
          </div>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="tw-input"
            style={{ marginBottom: 12 }}
          />
          {error && (
            <p style={{ fontSize: 12.5, color: "#f87171", marginBottom: 10, textAlign: "center" }}>{error}</p>
          )}
          <button
            onClick={checkout}
            disabled={items.length === 0 || !email || loading}
            className="btn-teal"
            style={{ width: "100%", justifyContent: "center", gap: 8 }}
          >
            <CreditCard size={15} />
            {loading ? "Redirecting…" : `Pay ${fmt(total())} via Squad`}
          </button>
          <p style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", marginTop: 8 }}>Secure checkout · Naira · No hidden fees</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export function PricingContent({ showCart = false }: { showCart?: boolean }) {
  const { add, items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = items.length;

  const addItem = (id: string, label: string, price: number, recurring = false) => {
    add({ id, label, price, type: recurring ? "subscription" : "base", recurring });
  };

  return (
    <>
      {/* Sticky cart button (when on /pricing) */}
      {showCart && cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 90,
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 20px", borderRadius: 50,
            background: "var(--teal)", color: "#050507",
            fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,212,212,0.4)",
          }}
        >
          <ShoppingCart size={16} />
          Cart ({cartCount}) · {fmt(useCart.getState().total())}
        </button>
      )}

      {cartOpen && <CartSheet onClose={() => setCartOpen(false)} />}

      {/* Plans */}
      <section className="section">
        <div className="section-inner">
          <motion.div className="section-header" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
            <span className="eyebrow">Transparent pricing</span>
            <div className="teal-line" style={{ margin: "14px auto" }} />
            <h2>Fair rates, no surprises</h2>
            <p>All prices in Naira. No VAT added. Deposit on confirmation, balance on launch.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 60 }}>
            {PLANS.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{
                  background: p.highlight ? "rgba(0,212,212,0.04)" : "var(--surface)",
                  border: `2px solid ${p.highlight ? "rgba(0,212,212,0.25)" : "var(--border)"}`,
                  borderRadius: 20, padding: 30, position: "relative",
                  boxShadow: p.highlight ? "0 0 40px rgba(0,212,212,0.07)" : "none",
                }}
              >
                {p.highlight && (
                  <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--teal)", color: "#050507", fontSize: 11, fontWeight: 800, padding: "4px 14px", borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Most popular
                  </span>
                )}
                <span style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{p.tag}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "6px 0 10px" }}>{p.name}</h3>
                {p.price > 0 ? (
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ fontSize: 34, fontFamily: "var(--font-syne)", fontWeight: 800, color: p.highlight ? "var(--teal)" : "var(--text)" }}>
                      {fmt(p.price)}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-muted)", marginBottom: 12 }}>Custom</div>
                )}
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: 22, lineHeight: 1.65 }}>{p.desc}</p>
                <ul style={{ listStyle: "none", marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, color: "var(--text-muted)" }}>
                      <Check size={14} color="var(--teal)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                {p.price > 0 ? (
                  <button
                    onClick={() => { addItem(p.id, p.name, p.price); if (showCart) setCartOpen(true); }}
                    className={p.highlight ? "btn-teal" : "btn-ghost"}
                    style={{ width: "100%", justifyContent: "center", gap: 8, borderRadius: 12 }}
                  >
                    <ShoppingCart size={14} />
                    {p.cta}
                  </button>
                ) : (
                  <a href="/contact" className="btn-ghost" style={{ width: "100%", justifyContent: "center", borderRadius: 12 }}>
                    {p.cta}
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Monthly subscriptions */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h3 style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: 8 }}>Monthly maintenance plans</h3>
              <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Keep your site fast, secure, and growing after launch.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 48 }}>
              {SUBSCRIPTIONS.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 22px" }}
                >
                  <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{s.name}</h4>
                  <div style={{ fontSize: 24, fontFamily: "var(--font-syne)", fontWeight: 800, color: "var(--teal)", marginBottom: 8 }}>
                    {fmt(s.price)}<span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)" }}>/mo</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.6 }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
                    {s.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-muted)" }}>
                        <Check size={12} color="var(--teal)" strokeWidth={3} style={{ flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { addItem(s.id, `${s.name} Plan (monthly)`, s.price, true); if (showCart) setCartOpen(true); }}
                    className="btn-ghost"
                    style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "9px 0", borderRadius: 10 }}
                  >
                    Subscribe
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Add-ons */}
            <h3 style={{ fontSize: 17, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "var(--text-muted)" }}>Add-ons &amp; extras</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {ADDONS.map((a) => {
                const inCart = useCart.getState().items.some((i) => i.id === a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => !inCart && addItem(a.id, a.label, a.price)}
                    style={{
                      padding: "13px 16px", borderRadius: 11, cursor: inCart ? "default" : "pointer",
                      background: inCart ? "rgba(0,212,212,0.05)" : "var(--surface)",
                      border: `1px solid ${inCart ? "rgba(0,212,212,0.25)" : "var(--border)"}`,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      transition: "all 0.15s", fontFamily: "var(--font-inter, inherit)",
                    }}
                    onMouseEnter={(e) => { if (!inCart) (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)"; }}
                    onMouseLeave={(e) => { if (!inCart) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                  >
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{a.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: inCart ? "var(--teal)" : "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                      {inCart ? <><Check size={11} strokeWidth={3} /> Added</> : fmt(a.price)}
                    </span>
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: 12, color: "var(--text-faint)", textAlign: "center", marginTop: 16 }}>
              Prices exclusive of hosting. Enterprise pricing available on request.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export function Pricing() {
  return <PricingContent />;
}
