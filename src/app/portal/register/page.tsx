"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) { setError("Passwords don't match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const res = await fetch("/api/portal/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Registration failed."); setLoading(false); return; }
    router.push("/portal/login?registered=1");
  };

  const inp: React.CSSProperties = {
    padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)",
    borderRadius: 10, color: "var(--text)", fontSize: 14, width: "100%", boxSizing: "border-box",
    fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "min(420px, 100%)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "40px 36px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, var(--teal), var(--teal-dim))", display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 22, color: "#050507", margin: "0 auto 20px" }}>T</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Create account</h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>Join TrueWeb to track your project and message our team.</p>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input style={inp} placeholder="Full name" type="text" value={form.name} onChange={set("name")} autoComplete="name" />
          <input style={inp} placeholder="Email address" type="email" value={form.email} onChange={set("email")} required autoComplete="email" />
          <input style={inp} placeholder="Password (8+ characters)" type="password" value={form.password} onChange={set("password")} required autoComplete="new-password" />
          <input style={inp} placeholder="Confirm password" type="password" value={form.confirm} onChange={set("confirm")} required autoComplete="new-password" />

          {error && (
            <p style={{ fontSize: 13, color: "#f87171", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "8px 12px", margin: 0 }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{ padding: "12px", background: "var(--teal)", color: "#050507", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 24, textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/portal/login" style={{ color: "var(--teal)", fontWeight: 600 }}>Sign in</Link>
        </p>
        <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 8, textAlign: "center" }}>
          Or <Link href="/portal/login" style={{ color: "var(--teal)", fontWeight: 600 }}>continue with Google</Link> for a quicker setup.
        </p>
      </div>
    </div>
  );
}
