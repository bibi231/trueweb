export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { affiliateConversions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getOrCreateAffiliate } from "@/lib/affiliate";
import AffiliatePanel from "./AffiliatePanel";

export const metadata: Metadata = { title: "Affiliate | Portal" };

const naira = (kobo: number) => `₦${(kobo / 100).toLocaleString("en-NG")}`;

export default async function AffiliatePage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  let code = "", link = "", rate = 0.04;
  let totalEarnedKobo = 0, pendingPayoutKobo = 0, paidOutKobo = 0, payoutRequested = false;
  type Conv = typeof affiliateConversions.$inferSelect;
  let conversions: Conv[] = [];

  try {
    const aff = await getOrCreateAffiliate(session.user.id);
    code = aff.code;
    link = `https://trueweb.com.ng/?ref=${aff.code}`;
    rate = parseFloat(aff.commissionRate ?? "0.04");
    totalEarnedKobo = aff.totalEarnedKobo ?? 0;
    pendingPayoutKobo = aff.pendingPayoutKobo ?? 0;
    paidOutKobo = aff.paidOutKobo ?? 0;
    payoutRequested = aff.payoutRequested ?? false;
    conversions = await db
      .select()
      .from(affiliateConversions)
      .where(eq(affiliateConversions.affiliateId, aff.id))
      .orderBy(desc(affiliateConversions.createdAt))
      .limit(50);
  } catch {
    return (
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Affiliate</h1>
        <p style={{ color: "var(--text-faint)", fontSize: 14 }}>The affiliate program isn&apos;t available yet. Check back soon.</p>
      </div>
    );
  }

  const stats = [
    { label: "Total earned", value: naira(totalEarnedKobo) },
    { label: "Pending payout", value: naira(pendingPayoutKobo) },
    { label: "Paid out", value: naira(paidOutKobo) },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Affiliate program</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
          Earn {(rate * 100).toFixed(0)}% every time someone pays for a TrueWeb service through your link.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px" }}>
            <p style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-syne)", marginBottom: 2 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <AffiliatePanel
        initialCode={code}
        initialLink={link}
        pendingPayoutKobo={pendingPayoutKobo}
        payoutRequested={payoutRequested}
      />

      {/* Conversions */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Conversion history</h2>
        {conversions.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 32, textAlign: "center" }}>
            <p style={{ color: "var(--text-faint)", fontSize: 14 }}>No conversions yet. Share your link to start earning.</p>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
            {conversions.map((c, i) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 18px", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 600 }}>{naira(c.commissionKobo)} commission</p>
                  <p style={{ fontSize: 12, color: "var(--text-faint)" }}>
                    on {naira(c.amountKobo)} · {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : ""}
                  </p>
                </div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, fontWeight: 600, textTransform: "capitalize",
                  background: c.status === "paid" ? "rgba(74,222,128,0.12)" : "rgba(245,158,11,0.12)",
                  border: `1px solid ${c.status === "paid" ? "rgba(74,222,128,0.3)" : "rgba(245,158,11,0.3)"}`,
                  color: c.status === "paid" ? "#4ade80" : "#f59e0b" }}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
