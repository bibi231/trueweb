export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { affiliates, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PayoutAction } from "./PayoutAction";

export const metadata: Metadata = { title: "Affiliates | Admin" };

const naira = (kobo: number) => `₦${(kobo / 100).toLocaleString("en-NG")}`;

type Row = {
  id: string;
  code: string;
  email: string | null;
  name: string | null;
  commissionRate: string | null;
  totalEarnedKobo: number | null;
  pendingPayoutKobo: number | null;
  paidOutKobo: number | null;
  payoutRequested: boolean | null;
};

export default async function AdminAffiliatesPage() {
  let rows: Row[] = [];
  try {
    rows = await db
      .select({
        id: affiliates.id,
        code: affiliates.code,
        email: users.email,
        name: users.name,
        commissionRate: affiliates.commissionRate,
        totalEarnedKobo: affiliates.totalEarnedKobo,
        pendingPayoutKobo: affiliates.pendingPayoutKobo,
        paidOutKobo: affiliates.paidOutKobo,
        payoutRequested: affiliates.payoutRequested,
      })
      .from(affiliates)
      .leftJoin(users, eq(affiliates.userId, users.id))
      .orderBy(desc(affiliates.pendingPayoutKobo));
  } catch {
    return (
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Affiliates</h1>
        <p style={{ fontSize: 13, color: "var(--text-faint)" }}>No affiliate data yet (run the DB migration to create the tables).</p>
      </div>
    );
  }

  const totalPending = rows.reduce((s, r) => s + (r.pendingPayoutKobo ?? 0), 0);
  const totalEarned = rows.reduce((s, r) => s + (r.totalEarnedKobo ?? 0), 0);
  const requested = rows.filter((r) => r.payoutRequested);

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Affiliates</h1>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
        {rows.length} affiliate{rows.length === 1 ? "" : "s"} · {naira(totalEarned)} earned all-time · {naira(totalPending)} pending payout · {requested.length} payout request{requested.length === 1 ? "" : "s"}
      </p>

      {rows.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 32, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--text-faint)" }}>No affiliates yet.</p>
        </div>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.7fr 0.8fr 0.8fr 0.8fr auto", gap: 12, padding: "11px 18px", borderBottom: "1px solid var(--border)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-faint)" }}>
            <span>Affiliate</span><span>Rate</span><span>Earned</span><span>Pending</span><span>Paid</span><span>Action</span>
          </div>
          {rows.map((r) => (
            <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1.4fr 0.7fr 0.8fr 0.8fr 0.8fr auto", gap: 12, padding: "13px 18px", borderTop: "1px solid var(--border)", alignItems: "center", fontSize: 13 }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.name || r.email || "—"}
                  {r.payoutRequested && <span style={{ marginLeft: 8, fontSize: 10, color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", padding: "1px 6px", borderRadius: 4 }}>payout requested</span>}
                </p>
                <p style={{ fontSize: 11.5, color: "var(--text-faint)" }}>code {r.code}</p>
              </div>
              <span style={{ color: "var(--text-muted)" }}>{(parseFloat(r.commissionRate ?? "0.04") * 100).toFixed(0)}%</span>
              <span>{naira(r.totalEarnedKobo ?? 0)}</span>
              <span style={{ color: (r.pendingPayoutKobo ?? 0) > 0 ? "#f59e0b" : "var(--text-faint)", fontWeight: (r.pendingPayoutKobo ?? 0) > 0 ? 600 : 400 }}>{naira(r.pendingPayoutKobo ?? 0)}</span>
              <span style={{ color: "var(--text-muted)" }}>{naira(r.paidOutKobo ?? 0)}</span>
              <PayoutAction affiliateId={r.id} pendingKobo={r.pendingPayoutKobo ?? 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
