import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TrueWeb Solutions terms of service — governing the use of trueweb.com.ng and all TrueWeb products.",
};

const UPDATED = "9 June 2026";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12 }}>{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}
function Li({ children }: { children: React.ReactNode }) {
  return <li style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 6 }}>{children}</li>;
}

export default function TermsPage() {
  return (
    <article>
      <span style={{ fontSize: 11, color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>Legal</span>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginTop: 8, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: 40 }}>Last updated: {UPDATED} · Governing law: Nigeria</p>

      <P>These Terms of Service (&quot;Terms&quot;) govern your use of TrueWeb Solutions&apos; website at trueweb.com.ng and all associated services. By accessing or using our services you agree to be bound by these Terms. If you do not agree, do not use the services.</P>

      <H2>1. Services</H2>
      <P>TrueWeb Solutions provides web design, software development, AI integration, and ongoing maintenance services to clients. Specific deliverables, timelines, and fees are set out in individual project proposals or order confirmations, which form part of these Terms.</P>

      <H2>2. Payments</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>All prices are in Nigerian Naira (NGN) unless otherwise stated.</Li>
        <Li>Project fees are typically structured as 50% upfront deposit (on proposal acceptance) and 50% on launch. Maintenance plans are charged monthly.</Li>
        <Li>Payments are processed securely via Squad (GTCO) or other listed payment providers. We do not store card details.</Li>
        <Li>Late payment (beyond 14 days of invoice) may result in suspension of work and a 2% per-month late fee on the outstanding balance.</Li>
        <Li>Prices are subject to change with 30 days&apos; notice for recurring subscriptions.</Li>
      </ul>

      <H2>3. Intellectual property</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>Upon full payment, you own the custom code and design assets produced specifically for your project. We retain the right to showcase the work in our portfolio unless you request otherwise in writing.</Li>
        <Li>We retain ownership of general-purpose libraries, frameworks, and reusable components used across multiple projects.</Li>
        <Li>You warrant that any content, images, or materials you supply do not infringe third-party rights. You indemnify TrueWeb against any related claims.</Li>
        <Li>Open-source components used in your project are subject to their respective licences (typically MIT or Apache 2.0).</Li>
      </ul>

      <H2>4. Client obligations</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>Provide timely feedback (within 5 business days of milestone delivery). Delays on your side extend the project timeline accordingly.</Li>
        <Li>Supply accurate content, branding assets, and credentials as required.</Li>
        <Li>Do not use our services for unlawful purposes, spam, or any activity that violates Nigerian law or these Terms.</Li>
      </ul>

      <H2>5. Revisions and scope</H2>
      <P>Agreed revision rounds are specified in the project proposal. Changes outside the agreed scope will be quoted separately. &quot;Revisions&quot; means minor adjustments (text, colour, spacing); &quot;New features&quot; requires a change-order.</P>

      <H2>6. Limitation of liability</H2>
      <P>To the fullest extent permitted by Nigerian law:</P>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>TrueWeb&apos;s total liability for any claim arising from a project shall not exceed the total fees paid by you in the 12 months preceding the claim.</Li>
        <Li>We are not liable for indirect, incidental, or consequential damages (including lost revenue, lost data, or business interruption).</Li>
        <Li>We do not guarantee uptime of third-party services (Vercel, Neon, Firebase, Squad, etc.).</Li>
      </ul>

      <H2>7. Maintenance and support</H2>
      <P>Post-launch support is governed by the chosen maintenance plan. Without an active plan, bug fixes requested after the 30-day warranty period are billed at our standard day rate. TrueWeb is not responsible for issues arising from your own modifications to the codebase.</P>

      <H2>8. Termination</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>Either party may terminate a project engagement with 14 days&apos; written notice. Work completed to date will be invoiced pro-rata.</Li>
        <Li>Monthly subscriptions can be cancelled at any time; access continues until the end of the paid billing period.</Li>
        <Li>We reserve the right to suspend or terminate access if you breach these Terms or misuse our platform.</Li>
      </ul>

      <H2>9. Dispute resolution</H2>
      <P>We will try to resolve any dispute amicably. If we cannot, disputes shall be submitted to binding arbitration in Lagos, Nigeria under the Arbitration and Conciliation Act (Cap A18 LFN 2004), before either party may bring court proceedings. Small claims (under ₦500,000) may be brought in the Magistrates&apos; Court of competent jurisdiction.</P>

      <H2>10. Changes to these Terms</H2>
      <P>We may update these Terms at any time. We will give at least 14 days&apos; notice of material changes via email or site notice. Continued use after changes constitutes acceptance.</P>

      <H2>11. Contact</H2>
      <P>TrueWeb Solutions · Abuja, Nigeria · <a href="mailto:hello@trueweb.com.ng" style={{ color: "var(--teal)" }}>hello@trueweb.com.ng</a></P>
    </article>
  );
}
