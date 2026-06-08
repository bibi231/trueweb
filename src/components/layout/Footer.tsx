"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NETWORK = [
  { name: "ReplyAI", url: "https://replyai.com.ng", favicon: "https://replyai.com.ng/favicon.ico", color: "#6366f1" },
  { name: "HarvestAI", url: "https://harvestai.com.ng", favicon: "https://harvestai.com.ng/favicon.ico", color: "#d97706" },
  { name: "SupportAI", url: "https://supportai.com.ng", favicon: "https://supportai.com.ng/favicon.ico", color: "#0ea5e9" },
];

function FaviconImg({ url, name, color }: { url: string; name: string; color: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span style={{ width: 22, height: 22, borderRadius: 5, background: color, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>
        {name[0]}
      </span>
    );
  }
  return (
    <Image src={url} alt="" width={22} height={22} unoptimized style={{ borderRadius: 4, objectFit: "contain", flexShrink: 0 }} onError={() => setFailed(true)} />
  );
}

export function Footer() {
  const [networkOpen, setNetworkOpen] = useState(false);
  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const year = new Date().getFullYear();

  const handleNl = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(nlEmail)) { setNlStatus("err"); return; }
    setNlStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail, source: "trueweb-footer" }),
      });
      if (!res.ok) throw new Error();
      setNlStatus("ok");
    } catch {
      setNlStatus("err");
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #07070c 0%, #030305 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,212,212,0.5), rgba(99,102,241,0.3), transparent)",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px 28px" }}>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 14 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #00d4d4, #00a8a8)", display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 17, color: "#050507", boxShadow: "0 4px 14px rgba(0,212,212,0.3)" }}>T</span>
              <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 21, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #fff 0%, #cdd2dc 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>TrueWeb</span>
            </Link>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#8892a4", maxWidth: 280, marginBottom: 18 }}>
              Web design & development agency. Fast, beautiful digital products built in Nigeria for the world.
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              {["X", "Li", "IG"].map((s) => (
                <a key={s} href="https://twitter.com/truewebhq" target="_blank" rel="noopener noreferrer"
                  style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "grid", placeItems: "center", color: "#9aa1b3", fontSize: 11, fontWeight: 700, textDecoration: "none", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9aa1b3"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Services</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {["Web Design", "SaaS Development", "AI Integration", "E-Commerce", "SEO"].map((l) => (
                <li key={l}><a href="#services" style={{ fontSize: 13.5, color: "#8892a4", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8892a4")}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Company</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ label: "About", href: "#about" }, { label: "Work", href: "#portfolio" }, { label: "Pricing", href: "#pricing" }, { label: "Contact", href: "#contact" }, { label: "Client Portal", href: "/portal" }].map((l) => (
                <li key={l.label}><a href={l.href} style={{ fontSize: 13.5, color: "#8892a4", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8892a4")}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal + Network */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Legal</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {["/privacy", "/terms", "/refund", "/cookies"].map((href) => (
                <li key={href}><Link href={href} style={{ fontSize: 13.5, color: "#8892a4", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8892a4")}>{href.slice(1).charAt(0).toUpperCase() + href.slice(2)}</Link></li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setNetworkOpen((o) => !o)}
                  style={{ background: "none", border: 0, padding: 0, cursor: "pointer", fontSize: 13.5, color: "#8892a4", display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "inherit", transition: "color 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8892a4")}
                >
                  TrueWeb Network
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.25s", transform: networkOpen ? "rotate(180deg)" : "rotate(0)" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Network panel */}
        {networkOpen && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, padding: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 32 }}>
            {NETWORK.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`; (e.currentTarget as HTMLElement).style.background = `${p.color}08`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
              >
                <FaviconImg url={p.favicon} name={p.name} color={p.color} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{p.name}</span>
              </a>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", padding: "20px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 32 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 700, marginBottom: 4 }}>TrueWeb Newsletter</p>
            <p style={{ fontSize: 13, color: "#8892a4", lineHeight: 1.5 }}>Product updates & Naija-only deals — one email per week.</p>
          </div>
          {nlStatus === "ok" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#86efac", padding: "8px 14px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 9 }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#22c55e", color: "#0a0e1a", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 11 }}>✓</span>
              Subscribed!
            </div>
          ) : (
            <form onSubmit={handleNl} style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <input type="email" required placeholder="your@email.com" value={nlEmail}
                onChange={(e) => { setNlEmail(e.target.value); if (nlStatus === "err") setNlStatus("idle"); }}
                disabled={nlStatus === "loading"}
                style={{ width: 200, padding: "9px 13px", fontSize: 13.5, background: "rgba(255,255,255,0.04)", border: `1px solid ${nlStatus === "err" ? "#fca5a5" : "rgba(255,255,255,0.1)"}`, borderRadius: 9, color: "#fff", fontFamily: "inherit", outline: "none" }}
                onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.5)")}
                onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button type="submit" disabled={nlStatus === "loading"}
                style={{ padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", background: "linear-gradient(135deg, #00d4d4, #00a8a8)", color: "#050507", border: 0, borderRadius: 9, whiteSpace: "nowrap", opacity: nlStatus === "loading" ? 0.6 : 1 }}
              >
                {nlStatus === "loading" ? "…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12.5, color: "#8892a4" }}>
            © {year} <strong style={{ color: "#fff" }}>TrueWeb Solutions</strong>. Made with care in Nigeria 🇳🇬
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#8892a4" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block", animation: "tw-pulse 3s ease infinite" }} />
            All systems operational
          </span>
        </div>
      </div>
      <style>{`@keyframes tw-pulse { 0%,100% { opacity:1 } 50% { opacity:.5 } } @media (max-width: 900px) { footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px) { footer > div > div:first-child { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}
