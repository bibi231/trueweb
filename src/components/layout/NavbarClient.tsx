"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NavbarClient({ isOwner }: { isOwner: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(var(--bg-rgb), 0.88)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", WebkitBackdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s" }}>
        <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span className="tw-logo-badge" style={{ width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18 }}>T</span>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 19, color: "var(--text)", letterSpacing: "-0.02em" }}>TrueWeb</span>
          </Link>
          <ul style={{ display: "flex", gap: 4, listStyle: "none", flex: 1, justifyContent: "center" }} className="tw-desktop-nav">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} style={{ color: isActive(l.href) ? "var(--teal)" : "var(--text-muted)", fontSize: 14, fontWeight: isActive(l.href) ? 700 : 500, padding: "8px 13px", borderRadius: 8, display: "block", transition: "color 0.15s, background 0.15s" }} onMouseEnter={(e) => { if (!isActive(l.href)) { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; } }} onMouseLeave={(e) => { if (!isActive(l.href)) { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; } }}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <ThemeToggle />
            {isOwner && (
              <Link href="/admin" className="tw-admin-link" style={{ fontSize: 12, color: "var(--teal)", fontWeight: 600, padding: "6px 10px", borderRadius: 7, border: "1px solid rgba(0,212,212,0.25)", background: "rgba(0,212,212,0.06)", display: "flex", alignItems: "center", gap: 5, transition: "background 0.15s, border-color 0.15s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,212,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.4)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,212,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,212,0.25)"; }}>
                <ShieldCheck size={12} strokeWidth={2} />Admin
              </Link>
            )}
            <Link href="/portal" className="tw-portal-link" style={{ fontSize: 13.5, color: "var(--text-muted)", fontWeight: 500, padding: "8px 12px", borderRadius: 8, transition: "color 0.15s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>Portal</Link>
            <Link href="/start" className="btn-teal tw-nav-cta" style={{ fontSize: 13.5, padding: "9px 18px", borderRadius: 10 }}>Start a Project</Link>
            <button onClick={() => setMobileOpen((o) => !o)} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: 6, display: "none", flexShrink: 0 }} className="tw-hamburger" aria-label="Toggle menu">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </nav>
        {mobileOpen && (
          <div style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "16px 20px 24px" }} className="tw-mobile-nav">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", color: isActive(l.href) ? "var(--teal)" : "var(--text-muted)", fontSize: 16, fontWeight: isActive(l.href) ? 700 : 500, borderBottom: "1px solid var(--border)" }}>{l.label}<ChevronDown size={14} style={{ transform: "rotate(-90deg)" }} /></Link>
            ))}
            {isOwner && (
              <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 0", color: "var(--teal)", fontSize: 16, fontWeight: 600, borderBottom: "1px solid var(--border)" }}><ShieldCheck size={15} strokeWidth={2} />Admin</Link>
            )}
            <div style={{ marginTop: 16, display: "flex", gap: 10, flexDirection: "column" }}>
              <Link href="/portal" className="btn-ghost" style={{ justifyContent: "center" }}>Client Portal</Link>
              <Link href="/start" className="btn-teal" style={{ justifyContent: "center" }}>Start a Project</Link>
            </div>
          </div>
        )}
      </header>
      <style>{`
        @media (max-width: 900px) { .tw-desktop-nav { display: none !important; } .tw-admin-link { display: none !important; } .tw-nav-cta { display: none !important; } .tw-hamburger { display: block !important; } }
        @media (max-width: 768px) { .tw-portal-link { display: none !important; } }
        @media (min-width: 901px) { .tw-mobile-nav { display: none !important; } }
      `}</style>
    </>
  );
}
