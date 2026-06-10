"use client";

import Link from "next/link";

export default function PortalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "min(420px, 100%)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "40px 36px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "linear-gradient(135deg, var(--teal), var(--teal-dim))",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: 22,
            color: "#050507",
            margin: "0 auto 20px",
          }}
        >
          T
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Portal is warming up</h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
          Our database is reconnecting. Try again in a moment, or sign in.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={reset}
            style={{
              width: "100%",
              padding: "12px 20px",
              background: "var(--teal)",
              color: "#050507",
              border: "none",
              borderRadius: 11,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Try again
          </button>
          <Link
            href="/portal/login"
            style={{
              display: "block",
              padding: "12px 20px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: 11,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text)",
              textDecoration: "none",
            }}
          >
            Go to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
