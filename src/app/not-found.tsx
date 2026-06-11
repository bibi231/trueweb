import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", background: "var(--bg)" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 96, lineHeight: 1, background: "linear-gradient(135deg, var(--teal), var(--teal-dim))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>404</div>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 26, color: "var(--text)", marginTop: 18, letterSpacing: "-0.02em" }}>Page not found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15.5, marginTop: 10, lineHeight: 1.6 }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/" className="btn-teal" style={{ fontSize: 14, padding: "10px 20px", borderRadius: 10 }}>Back home</Link>
          <Link href="/services" className="btn-ghost" style={{ fontSize: 14, padding: "10px 20px", borderRadius: 10 }}>Services</Link>
          <Link href="/contact" className="btn-ghost" style={{ fontSize: 14, padding: "10px 20px", borderRadius: 10 }}>Contact</Link>
        </div>
      </div>
    </main>
  );
}
