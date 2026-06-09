export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { leads, newsletter } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = { title: "Leads | Admin" };

function fmt(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default async function LeadsPage() {
  let rows: Record<string, unknown>[] = [];
  let subs: Record<string, unknown>[] = [];
  try {
    rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
    subs = await db.select().from(newsletter).orderBy(desc(newsletter.createdAt)).limit(100);
  } catch { /* DB not yet migrated */ }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Leads &amp; Contacts</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{rows.length} contact form submissions · {subs.length} newsletter subscribers</p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <a href={`/api/admin/export?table=leads`} style={{ fontSize: 13, padding: "7px 14px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)", textDecoration: "none" }}>
          Export leads CSV
        </a>
        <a href={`/api/admin/export?table=newsletter`} style={{ fontSize: 13, padding: "7px 14px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)", textDecoration: "none" }}>
          Export subscribers CSV
        </a>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", fontSize: 12, fontWeight: 700, color: "var(--text-faint)", display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 80px", gap: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          <span>Contact</span><span>Project type</span><span>Budget</span><span>Timeline</span><span>Date</span><span>Status</span>
        </div>
        {rows.length === 0 ? (
          <p style={{ padding: "24px 20px", fontSize: 13, color: "var(--text-faint)" }}>No leads yet</p>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) : (rows as any[]).map((r) => (
          <div key={r.id} style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 80px", gap: 8, fontSize: 13, alignItems: "center" }}>
            <div>
              <p style={{ fontWeight: 600 }}>{r.name || "—"}</p>
              <p style={{ color: "var(--text-faint)", fontSize: 11 }}>{r.email}</p>
            </div>
            <span style={{ color: "var(--text-muted)" }}>{r.siteType || r.source || "—"}</span>
            <span style={{ color: "var(--text-muted)" }}>{r.budget || "—"}</span>
            <span style={{ color: "var(--text-muted)" }}>{r.timeline || "—"}</span>
            <span style={{ color: "var(--text-faint)", fontSize: 11 }}>{fmt(r.createdAt)}</span>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 5, background: r.status === "paid" ? "rgba(74,222,128,0.08)" : "var(--surface-2)", border: "1px solid var(--border)", color: r.status === "paid" ? "#4ade80" : "var(--text-faint)", textAlign: "center" }}>
              {r.status}
            </span>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 700 }}>Newsletter subscribers ({subs.length})</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "14px 20px" }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(subs as any[]).map((s) => (
            <span key={s.id} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 6, background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              {s.email}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
