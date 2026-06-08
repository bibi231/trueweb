"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled
          ? "rgba(5, 5, 7, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 28px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg, #00d4d4, #00a8a8)",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: 18,
              color: "#050507",
              boxShadow: "0 0 20px rgba(0,212,212,0.3)",
            }}
          >
            T
          </span>
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: 18,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            TrueWeb
          </span>
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: "flex",
            gap: 8,
            listStyle: "none",
            alignItems: "center",
          }}
          className="nav-links"
        >
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "8px 14px",
                  borderRadius: 8,
                  transition: "color 0.15s, background 0.15s",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/portal" style={{ display: "none" }} className="portal-link">
            <span
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                fontWeight: 500,
                padding: "8px 14px",
              }}
            >
              Client Portal
            </span>
          </Link>
          <a
            href="#build"
            className="btn-teal"
            style={{ fontSize: 14, padding: "10px 20px", borderRadius: 10 }}
          >
            Start a Project
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: 8,
              display: "none",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(5,5,7,0.97)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 28px 24px",
          }}
          className="mobile-nav"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "var(--text-muted)",
                fontSize: 16,
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#build"
            onClick={() => setMobileOpen(false)}
            className="btn-teal"
            style={{ marginTop: 20, width: "100%", justifyContent: "center", borderRadius: 10 }}
          >
            Start a Project
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .portal-link { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-links { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
