import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HoverPortrait } from "@/components/ui/HoverPortrait";
import { BackgroundPaths } from "@/components/ui/BackgroundPaths";
import { FounderProducts } from "@/components/sections/FounderProducts";

export const metadata: Metadata = {
  title: "Bitrus J-K Gadzama — Founder",
  description:
    "Bitrus J-K Gadzama is a software engineer and product builder based in Abuja, Nigeria. Founder of TrueWeb Solutions and creator of ReplyAI, HarvestAI, and SupportAI.",
  alternates: { canonical: "https://trueweb.com.ng/founder" },
  openGraph: {
    title: "Bitrus J-K Gadzama — Founder of TrueWeb Solutions",
    description:
      "Software engineer, product builder, and founder of TrueWeb Solutions. Based in Abuja, Nigeria.",
    images: [{ url: "/founder/agbada.png", width: 800, height: 1000 }],
  },
};

const SKILLS = [
  { cat: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"] },
  { cat: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"] },
  { cat: "Backend", items: ["Node.js", "Express", "Drizzle ORM", "Socket.io", "REST APIs"] },
  { cat: "Databases", items: ["PostgreSQL (Neon)", "MongoDB Atlas", "Redis"] },
  { cat: "DevOps", items: ["Vercel", "Render", "Docker", "GitHub Actions", "Nginx"] },
  { cat: "AI / ML", items: ["Gemini API", "Groq / LLaMA", "RAG pipelines", "LangChain"] },
];

const EXPERIENCE = [
  {
    role: "Founder & Lead Engineer",
    org: "TrueWeb Solutions",
    period: "2024 – Present",
    desc: "Founded and bootstrapped a Nigerian software agency serving local businesses. Built and launched ReplyAI, HarvestAI, and SupportAI as standalone SaaS products. Architected full-stack systems with Next.js, Express, Neon Postgres, Firebase, and Squad payments.",
  },
  {
    role: "Full-Stack Developer",
    org: "Freelance / Contract",
    period: "2022 – Present",
    desc: "Delivered custom web applications, e-commerce stores, and dashboard tools for clients across Nigeria and internationally. Specialised in performance-first Next.js builds and Naira payment integration.",
  },
  {
    role: "Software Engineering Student",
    org: "University / Self-directed",
    period: "2019 – 2023",
    desc: "Studied computer science while shipping real projects — built e-commerce platforms, chat applications, and data tools during academic years. Contributed to open-source projects on GitHub.",
  },
];



const ACCOLADES = [
  { label: "5+ products shipped", sub: "From idea to production in weeks" },
  { label: "Nigeria-first stack", sub: "Squad/Paystack, Naira pricing, 4 local languages" },
  { label: "Full-stack to infra", sub: "Frontend through CI/CD and monitoring" },
  { label: "Open source contributor", sub: "GitHub: bibi231" },
];

const LINKS = [
  {
    label: "Portfolio",
    href: "https://beetrus.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/bibi231",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02 0 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58C20.56 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bitrus-joe-kyari-gadzama-076093178/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@trueweb.com.ng",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* Hero */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg)",
            paddingBottom: 80,
          }}
          className="section"
        >
          <BackgroundPaths opacity={0.08} />
          <div
            className="section-inner"
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "380px 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Portrait */}
            <div style={{ position: "relative" }}>
              <HoverPortrait
                primarySrc="/founder/agbada.png"
                hoverSrc="/founder/hf_portrait.png"
                name="Bitrus J-K Gadzama"
                width={480}
                height={600}
                className="founder-portrait"
              />
              {/* Teal glow accent */}
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: 22,
                  background: "linear-gradient(135deg, rgba(0,212,212,0.15), transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Bio */}
            <div>
              <span className="eyebrow">Founder</span>
              <div className="teal-line" />
              <h1
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  marginBottom: 8,
                  letterSpacing: "-0.04em",
                }}
              >
                Bitrus J-K Gadzama
              </h1>
              <p style={{ fontSize: 18, color: "var(--teal)", fontWeight: 700, marginBottom: 20 }}>
                Founder &amp; Lead Engineer, TrueWeb Solutions
              </p>
              <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 16, maxWidth: 520 }}>
                Software engineer and product builder based in Abuja, Nigeria. I build fast, modern digital
                products for African businesses — from SaaS platforms to AI-powered tools — and run them
                through TrueWeb Solutions.
              </p>
              <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                My work sits at the intersection of engineering and product thinking. I care about shipping
                things that actually reach people — not just code that compiles.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: 14, padding: "10px 18px", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {l.icon}
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .founder-portrait { max-width: 280px; margin: 0 auto; } }`}</style>
        </section>

        {/* Highlights */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
              }}
            >
              {ACCOLADES.map((a) => (
                <div
                  key={a.label}
                  className="card"
                  style={{ textAlign: "center", padding: "24px 20px" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 800,
                      fontSize: 17,
                      color: "var(--teal)",
                      marginBottom: 4,
                    }}
                  >
                    {a.label}
                  </p>
                  <p style={{ fontSize: 12.5, color: "var(--text-faint)" }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section">
          <div className="section-inner tw-story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 64, alignItems: "start" }}>
            <div>
              <span className="eyebrow">The story</span>
              <div className="teal-line" />
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", marginBottom: 24 }}>
                Building for Africa&apos;s market
              </h2>
              {[
                "I started building websites in secondary school — not because anyone asked me to, but because I wanted to make things people could use. That curiosity turned into a career and eventually a company.",
                "TrueWeb Solutions grew out of a simple observation: most software tools weren't built with Nigeria in mind. Foreign-built SaaS products don't accept Naira, don't speak Pidgin, and don't understand the Nigerian business context. So I built alternatives.",
                "ReplyAI, HarvestAI, and SupportAI are all products I built because I needed them (or knew someone who did). Each one is designed to be self-sustaining — real revenue, real users, built on the Nigerian payment rails I actually trust.",
                "I work across the full stack: from product design through backend architecture to deployment. I care deeply about performance, developer experience, and shipping things that work on a 3G connection in Lagos as well as fibre in Abuja.",
                "Outside of code: I think a lot about how technology distributes power. The goal is to make the tools that help Nigerian businesses compete — not just locally, but globally.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 16.5, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16 }}>
                  {p}
                </p>
              ))}
            </div>

            <div style={{ position: "sticky", top: 88 }}>
              <div className="card" style={{ overflow: "hidden", padding: 0 }}>
                <div style={{ position: "relative", aspectRatio: "3/4" }}>
                  <Image
                    src="/founder/hf_portrait.png"
                    alt="Bitrus Gadzama"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    &quot;Build things that work. Ship them to people who need them. Iterate until they&apos;re excellent.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section" style={{ background: "var(--surface)" }}>
          <div className="section-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="eyebrow">Background</span>
              <div className="teal-line" style={{ margin: "14px auto" }} />
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>Experience</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720, margin: "0 auto" }}>
              {EXPERIENCE.map((e, i) => (
                <div
                  key={e.role}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    padding: "24px 28px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    position: "relative",
                    paddingLeft: 48,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 20,
                      top: 28,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "var(--teal)",
                      boxShadow: "0 0 8px rgba(0,212,212,0.5)",
                    }}
                  />
                  {i < EXPERIENCE.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 24,
                        top: 40,
                        width: 1,
                        bottom: -20,
                        background: "var(--border)",
                      }}
                    />
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{e.role}</h3>
                      <p style={{ fontSize: 13, color: "var(--teal)", fontWeight: 600 }}>{e.org}</p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-faint)",
                        padding: "3px 10px",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {e.period}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section">
          <div className="section-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="eyebrow">Technical skills</span>
              <div className="teal-line" style={{ margin: "14px auto" }} />
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>Stack &amp; tools</h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {SKILLS.map((s) => (
                <div key={s.cat} className="card">
                  <p style={{ fontSize: 11, color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>
                    {s.cat}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontSize: 12.5,
                          padding: "4px 10px",
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          borderRadius: 7,
                          color: "var(--text-muted)",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="section" style={{ background: "var(--surface)" }}>
          <div className="section-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="eyebrow">Products built</span>
              <div className="teal-line" style={{ margin: "14px auto" }} />
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>The TrueWeb portfolio</h2>
            </div>
            <FounderProducts />
          </div>
        </section>

        {/* Connect */}
        <section className="section">
          <div className="section-inner" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <span className="eyebrow">Connect</span>
            <div className="teal-line" style={{ margin: "14px auto" }} />
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", marginBottom: 16 }}>
              Let&apos;s work together
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 36 }}>
              Whether you want to build a product, collaborate, or just say hi — my inbox is always open.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, padding: "11px 20px" }}
                >
                  {l.icon}
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              {[
                { src: "/founder/agbada.png", alt: "Bitrus in white agbada" },
                { src: "/founder/hf_portrait.png", alt: "Bitrus in casual portrait" },
              ].map((img) => (
                <div
                  key={img.src}
                  style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", aspectRatio: "3/4", position: "relative" }}
                >
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .tw-story-grid { grid-template-columns: 1fr !important; }
          .tw-story-grid > div:last-child { position: static !important; }
        }
        .founder-portrait { max-height: 560px; }
        @media (max-width: 900px) {
          section:first-of-type .section-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .founder-portrait { max-width: 300px; margin: 0 auto; }
        }
      `}</style>
    </>
  );
}
