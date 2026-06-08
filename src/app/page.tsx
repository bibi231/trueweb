import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "TrueWeb Solutions — Web Design & Development Agency Nigeria",
  description: "TrueWeb Solutions builds fast, beautiful websites and SaaS products for Nigerian businesses. Custom web design, development, and AI-powered software in Abuja.",
  alternates: { canonical: "https://trueweb.com.ng" },
  openGraph: {
    title: "TrueWeb Solutions — Web Design & Development Agency Nigeria",
    description: "Fast, beautiful websites and SaaS products built in Nigeria.",
    url: "https://trueweb.com.ng",
  },
};

function SectionCta({ href, label }: { href: string; label: string }) {
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <Link href={href} className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        {label} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SectionCta href="/services" label="All services + FAQ" />
        <Portfolio />
        <SectionCta href="/work" label="Full case studies" />
        <Process />
        <SectionCta href="/process" label="See the full process" />
        <Testimonials />

        {/* Pricing CTA banner */}
        <section className="section" style={{ paddingTop: 48, paddingBottom: 80 }}>
          <div className="section-inner">
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "48px 40px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 32,
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
              }}
              className="tw-cta-banner"
            >
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse 70% 60% at 10% 50%, rgba(0,212,212,0.04) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="eyebrow">Transparent pricing</span>
                <div className="teal-line" />
                <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", marginBottom: 12 }}>
                  Landing pages from ₦150,000
                </h2>
                <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 480 }}>
                  Fixed prices. No hidden fees. Scoped projects only — no hourly billing surprises.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0, position: "relative", zIndex: 1 }} className="tw-cta-btns">
                <Link href="/pricing" className="btn-teal">View pricing</Link>
                <Link href="/start" className="btn-ghost">Start a project</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .tw-cta-banner { grid-template-columns: 1fr !important; }
          .tw-cta-btns { flex-direction: row !important; flex-wrap: wrap; }
        }
      `}</style>
    </>
  );
}
