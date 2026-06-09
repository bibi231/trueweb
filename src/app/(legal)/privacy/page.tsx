import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TrueWeb Solutions privacy policy — how we collect, use, and protect your personal data under Nigeria NDPR and GDPR.",
};

const UPDATED = "9 June 2026";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12, color: "var(--text)" }}>{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}
function Li({ children }: { children: React.ReactNode }) {
  return <li style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 6 }}>{children}</li>;
}

export default function PrivacyPage() {
  return (
    <article>
      <span style={{ fontSize: 11, color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>Legal</span>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginTop: 8, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: 40 }}>Last updated: {UPDATED} · Jurisdiction: Nigeria</p>

      <P>TrueWeb Solutions (&quot;TrueWeb&quot;, &quot;we&quot;, &quot;us&quot;) operates trueweb.com.ng and the associated products (ReplyAI, HarvestAI, SupportAI). This policy explains what data we collect, why, and your rights. It complies with the Nigeria Data Protection Regulation (NDPR) 2019 and, where applicable, the EU General Data Protection Regulation (GDPR).</P>

      <H2>1. Data we collect</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li><strong>Contact data:</strong> name, email address, and phone number provided via contact forms, newsletter sign-ups, or the project brief wizard.</Li>
        <Li><strong>Account data:</strong> name, email, profile picture from Google or GitHub OAuth (via NextAuth).</Li>
        <Li><strong>Payment data:</strong> transaction reference, email, and plan details — we do <em>not</em> store card numbers. Payments are processed by Squad (GTCO) and are subject to their privacy policy.</Li>
        <Li><strong>Usage data:</strong> page views, click events, and session data collected via Google Analytics 4 and Vercel Analytics. These are pseudonymised; no names are attached.</Li>
        <Li><strong>Technical data:</strong> IP address, browser type, and referrer for fraud prevention and rate limiting (not stored beyond 30 days).</Li>
        <Li><strong>Project data:</strong> information you provide in the client portal (messages, uploaded files, project descriptions).</Li>
      </ul>

      <H2>2. How we use your data</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>To deliver the services you requested (website builds, portal access, invoice management).</Li>
        <Li>To process and verify payments via Squad.</Li>
        <Li>To send transactional emails (project updates, invoice receipts). We do not send unsolicited marketing without consent.</Li>
        <Li>To improve our products using aggregated, anonymised analytics.</Li>
        <Li>To comply with Nigerian law and respond to lawful requests.</Li>
      </ul>

      <H2>3. Legal basis for processing</H2>
      <P>We process your data on the following lawful bases:</P>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li><strong>Contract:</strong> processing necessary to deliver the service you paid for.</Li>
        <Li><strong>Legitimate interest:</strong> fraud prevention, site security, and product improvement.</Li>
        <Li><strong>Consent:</strong> newsletter subscriptions and analytics cookies (you may withdraw at any time).</Li>
      </ul>

      <H2>4. Sub-processors</H2>
      <P>We share your data only with service providers necessary to operate TrueWeb:</P>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li><strong>Vercel Inc.</strong> — hosting and serverless functions (US; EU-US DPF).</Li>
        <Li><strong>Neon Inc.</strong> — PostgreSQL database (US; SOC 2 Type II).</Li>
        <Li><strong>Squad by GTCO (HabariPay Ltd.)</strong> — payment processing (Nigeria).</Li>
        <Li><strong>Google LLC</strong> — OAuth sign-in and Google Analytics 4 (US; EU-US DPF).</Li>
        <Li><strong>Resend Inc.</strong> — transactional email (US).</Li>
      </ul>

      <H2>5. Data retention</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>Contact form submissions: 2 years or until you request deletion.</Li>
        <Li>Account data: retained while your account is active + 90 days after deletion.</Li>
        <Li>Payment references: 7 years (Nigerian tax / financial record requirements).</Li>
        <Li>Analytics: 14 months (Google Analytics default; we use data deletion controls).</Li>
        <Li>IP logs: 30 days maximum.</Li>
      </ul>

      <H2>6. Your rights</H2>
      <P>Under the NDPR and GDPR you have the right to:</P>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li><strong>Access</strong> — request a copy of the data we hold about you.</Li>
        <Li><strong>Rectification</strong> — correct inaccurate data.</Li>
        <Li><strong>Erasure</strong> — request deletion (&quot;right to be forgotten&quot;).</Li>
        <Li><strong>Portability</strong> — receive your data in machine-readable format.</Li>
        <Li><strong>Objection</strong> — opt out of legitimate-interest processing.</Li>
        <Li><strong>Withdraw consent</strong> — for analytics and marketing emails at any time.</Li>
      </ul>
      <P>To exercise any right, email <a href="mailto:support@trueweb.com.ng" style={{ color: "var(--teal)" }}>support@trueweb.com.ng</a>. We will respond within 30 days.</P>

      <H2>7. Cookies</H2>
      <P>We use cookies for authentication (session), analytics (GA4), and preferences (theme). See our <a href="/cookies" style={{ color: "var(--teal)" }}>Cookie Policy</a> for the full list and opt-out instructions.</P>

      <H2>8. Security</H2>
      <P>We apply encryption in transit (TLS 1.2+), encrypted storage for secrets, rate limiting, and HMAC-SHA512 webhook verification. No system is 100% secure; if you suspect a breach, email <a href="mailto:support@trueweb.com.ng" style={{ color: "var(--teal)" }}>support@trueweb.com.ng</a> immediately.</P>

      <H2>9. International transfers</H2>
      <P>Some sub-processors are based outside Nigeria (primarily the US). Transfers rely on EU-US Data Privacy Framework certifications or equivalent safeguards. Nigerian data stays within Neon&apos;s Lagos/EU region where available.</P>

      <H2>10. Changes to this policy</H2>
      <P>We will post updates here and, for material changes, notify users by email. Continued use of our services after changes constitutes acceptance.</P>

      <H2>11. Contact</H2>
      <P>TrueWeb Solutions · Abuja, Nigeria · <a href="mailto:support@trueweb.com.ng" style={{ color: "var(--teal)" }}>support@trueweb.com.ng</a></P>
      <P>Governing law: Federal Republic of Nigeria. Disputes shall be resolved in Lagos courts, with arbitration preferred for disputes under ₦5,000,000.</P>
    </article>
  );
}
