import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "TrueWeb Solutions refund policy — when and how we issue refunds for project fees and subscriptions.",
};

const UPDATED = "9 June 2026";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12 }}>{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}
function Li({ children }: { children: React.ReactNode }) {
  return <li style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 8 }}>{children}</li>;
}

export default function RefundPage() {
  return (
    <article>
      <span style={{ fontSize: 11, color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>Legal</span>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginTop: 8, marginBottom: 8 }}>Refund Policy</h1>
      <p style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: 40 }}>Last updated: {UPDATED} · Contact: <a href="mailto:billing@trueweb.com.ng" style={{ color: "var(--teal)" }}>billing@trueweb.com.ng</a></p>

      <P>We stand behind our work. If something isn&apos;t right, we want to fix it. This policy explains when you can get a refund and how to request one.</P>

      <H2>Project deposits (one-off)</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li><strong>Before work starts:</strong> 100% refund of the deposit if you cancel within 48 hours of payment and before any design or development work has commenced.</Li>
        <Li><strong>After work starts but before first milestone delivery:</strong> 50% refund of the deposit, reflecting the discovery and planning work already done.</Li>
        <Li><strong>After first milestone delivery:</strong> No refund of the deposit. Work already delivered belongs to you at that point.</Li>
        <Li><strong>Final balance:</strong> Not refundable once the project has launched, as this represents completed, accepted work.</Li>
      </ul>

      <H2>Monthly maintenance plans</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>You may cancel at any time. Cancellation takes effect at the end of the current billing period — you retain access until then.</Li>
        <Li>We do not issue pro-rata refunds for partial months.</Li>
        <Li>If we fail to deliver the services specified in your plan (e.g., hosting outage caused by us, not a third party), we will credit the equivalent days to your next invoice.</Li>
      </ul>

      <H2>SaaS products (ReplyAI, HarvestAI, SupportAI)</H2>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li><strong>7-day cooling-off:</strong> If this is your first paid subscription and you request a refund within 7 days of your first charge, we will issue a full refund — no questions asked.</Li>
        <Li>After 7 days, refunds are at our discretion and typically issued only if there is a documented technical failure preventing you from using the service.</Li>
        <Li>Credits purchased (e.g., ReplyAI credit packs) are non-refundable once any credits have been used. Unused credits on a cancelled account are forfeited.</Li>
      </ul>

      <H2>Requesting a refund</H2>
      <P>Email <a href="mailto:billing@trueweb.com.ng" style={{ color: "var(--teal)" }}>billing@trueweb.com.ng</a> with:</P>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>Your name and registered email address.</Li>
        <Li>The Squad transaction reference (starts with TW-, SAI-, RAI-, or HAI-).</Li>
        <Li>The reason for your refund request.</Li>
      </ul>
      <P>We will acknowledge within 1 business day and process eligible refunds within 5–10 business days. Refunds are returned to the original payment method via Squad.</P>

      <H2>Exceptions</H2>
      <P>We will not issue refunds where:</P>
      <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
        <Li>You have violated our Terms of Service.</Li>
        <Li>The issue arises from content or materials you supplied.</Li>
        <Li>Downtime or errors are caused by third-party services (Vercel, Neon, Firebase, Squad).</Li>
        <Li>You simply changed your mind after a project milestone was approved.</Li>
      </ul>

      <H2>Squad&apos;s policies</H2>
      <P>Payments processed via Squad are also subject to Squad (GTCO HabariPay Limited)&apos;s own dispute and chargeback policies. If you raise a chargeback with your bank, we reserve the right to pause work and apply a ₦5,000 administrative fee to cover processing costs.</P>

      <H2>Contact</H2>
      <P>TrueWeb Solutions · Abuja, Nigeria · <a href="mailto:billing@trueweb.com.ng" style={{ color: "var(--teal)" }}>billing@trueweb.com.ng</a></P>
    </article>
  );
}
