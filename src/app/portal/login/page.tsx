import type { Metadata } from "next";
import { signIn } from "@/lib/auth";
const ChromeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4.5a7.5 7.5 0 0 1 6.5 3.75H12a3.75 3.75 0 0 0-3.46 2.34L6.16 7.26A7.5 7.5 0 0 1 12 4.5zM4.5 12a7.47 7.47 0 0 1 1.06-3.88l3.19 5.53A3.75 3.75 0 0 0 12 15.75h1.16l-1.84 3.19A7.5 7.5 0 0 1 4.5 12zm7.5 7.5c-.67 0-1.32-.09-1.95-.25l3.5-6.07c.52.5.84 1.19.84 1.95 0 .86-.37 1.64-.95 2.18a7.47 7.47 0 0 1-1.44 2.19zm1.95-.25 3.5-6.07a3.75 3.75 0 0 0-3.2-5.68H18a7.5 7.5 0 0 1-4.05 11.75z"/>
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02 0 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58C20.56 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export const metadata: Metadata = {
  title: "Client Portal Login",
  description: "Sign in to your TrueWeb Solutions client dashboard.",
};

export default function LoginPage() {
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
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg, var(--teal), var(--teal-dim))",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 22, color: "#050507",
            margin: "0 auto 20px",
          }}
        >T</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>TrueWeb Portal</h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32, lineHeight: 1.6 }}>
          Sign in to track your project, message our team, view invoices, or manage your affiliate earnings.
        </p>

        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", Object.fromEntries(formData));
          }}
          style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}
        >
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            style={{
              padding: "12px 14px",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--text)",
              fontSize: 14,
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            style={{
              padding: "12px 14px",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--text)",
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              background: "var(--teal)",
              color: "#050507",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Sign in with Email
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase" }}>Or</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/portal" });
            }}
          >
            <button
              type="submit"
              className="btn-ghost"
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "12px 20px", background: "var(--surface-2)", border: "1px solid var(--border)",
                borderRadius: 11, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "var(--text)",
                fontFamily: "var(--font-inter, inherit)", transition: "border-color 0.15s",
              }}
            >
              <ChromeIcon />
              Continue with Google
            </button>
          </form>
        </div>

        <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 24 }}>
          New here? Continue with Google to join — or <a href="/start" style={{ color: "var(--teal)", fontWeight: 600 }}>start a project</a>.
        </p>
      </div>
    </div>
  );
}
