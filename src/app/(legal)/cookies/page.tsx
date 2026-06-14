import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How TrueWeb Solutions uses cookies and similar technologies on trueweb.com.ng.",
};

const UPDATED = "14 June 2026";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12 }}>{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}

const COOKIES = [
  { name: "__Secure-next-auth.session-token", type: "Strictly necessary", expiry: "30 days", purpose: "Keeps you logged in to the client portal. Without this cookie the portal cannot function." },
  { name: "tw_theme", type: "Preference", expiry: "1 year", purpose: "Remembers your dark/light mode preference." },
  { name: "tw_cookie_consent", type: "Preference", expiry: "1 year", purpose: "Records whether you have accepted or declined analytics cookies." },
  { name: "tw_ref", type: "Functional (affiliate)", expiry: "30 days", purpose: "Records a referral code when you arrive via an affiliate link (trueweb.com.ng/?ref=…), so the referrer can be credited if you later pay for a service." },
  { name: "_ga, _ga_*", type: "Analytics (consent required)", expiry: "2 years", purpose: "Google Analytics 4 — measures page views, session duration, and traffic sources in aggregate. Only set after you accept analytics cookies." },
  { name: "va_* (Vercel Analytics)", type: "Analytics (consent required)", expiry: "Session", purpose: "Vercel Web Analytics — counts unique visitors and page views server-side. Privacy-preserving; no cross-site tracking." },
  { name: "__gads, __gpi, _gcl_*", type: "Advertising (consent required)", expiry: "Up to 13 months", purpose: "Google AdSense — serves and measures ads and limits how often you see the same ad. Only set after you accept cookies." },
  { name: "Adsterra / Monetag cookies", type: "Advertising (consent required)", expiry: "Varies", purpose: "Adsterra and Monetag ad networks use cookies to deliver and measure advertising. Set by their scripts after consent." },
];

export default function CookiesPage() {
  return (
    <article>
      <span style={{ fontSize: 11, color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>Legal</span>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginTop: 8, marginBottom: 8 }}>Cookie Policy</h1>
      <p style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: 40 }}>Last updated: {UPDATED}</p>

      <P>This policy explains how TrueWeb Solutions uses cookies and similar technologies on trueweb.com.ng. It supplements our <a href="/privacy" style={{ color: "var(--teal)" }}>Privacy Policy</a>.</P>

      <H2>What are cookies?</H2>
      <P>Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, making it more useful and secure. We also use similar technologies like local storage for the same purposes.</P>

      <H2>Cookies we use</H2>
      <div style={{ overflowX: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)" }}>
              {["Cookie name", "Category", "Expiry", "Purpose"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COOKIES.map((c) => (
              <tr key={c.name} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: "var(--teal)", whiteSpace: "nowrap" }}>{c.name}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{c.type}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-faint)", whiteSpace: "nowrap" }}>{c.expiry}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-muted)", lineHeight: 1.6 }}>{c.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Your choices</H2>
      <P>A cookie consent banner is shown on your first visit. You can:</P>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <li style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 8 }}><strong>Accept all cookies</strong> — enables analytics and advertising cookies that help us improve and fund the site.</li>
        <li style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 8 }}><strong>Decline analytics</strong> — only strictly necessary and preference cookies are set.</li>
        <li style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 8 }}><strong>Change your mind</strong> — clear the <code style={{ fontSize: 12, background: "var(--surface-2)", padding: "2px 6px", borderRadius: 4 }}>tw_cookie_consent</code> key in your browser&apos;s localStorage to see the banner again, or email us.</li>
      </ul>
      <P>Most browsers also let you block or delete cookies in their settings. Note that blocking all cookies will prevent portal login.</P>

      <H2>Third-party cookies</H2>
      <P>We use Google Analytics 4 and Vercel Analytics (measurement), Google AdSense, Adsterra and Monetag (advertising), and the SupportAI chat widget loaded from supportai.com.ng (live chat support). These third parties may set their own cookies, governed by their respective privacy policies. Advertising and analytics cookies are only set after you accept cookies via our consent banner; strictly necessary and functional cookies are always active.</P>

      <H2>Contact</H2>
      <P>For questions about our use of cookies: <a href="mailto:support@trueweb.com.ng" style={{ color: "var(--teal)" }}>support@trueweb.com.ng</a></P>
    </article>
  );
}
