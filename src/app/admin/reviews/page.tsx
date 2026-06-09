export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { ReviewActions } from "./ReviewActions";

export const metadata: Metadata = { title: "Reviews | Admin" };

export default async function ReviewsAdminPage() {
  let rows: Record<string, unknown>[] = [];
  try { rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt)); } catch {}

  const pending = rows.filter((r: Record<string, unknown>) => !r.approved);
  const approved = rows.filter((r: Record<string, unknown>) => r.approved);

  function Stars({ n }: { n: number }) {
    return <span style={{ color: "#f59e0b", fontSize: 14 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Row = ({ r }: { r: any }) => (
    <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Stars n={r.rating} />
          <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{new Date(r.createdAt).toLocaleDateString()}</span>
          {r.featured && <span style={{ fontSize: 10, color: "#f59e0b", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", padding: "1px 6px", borderRadius: 4 }}>Featured</span>}
        </div>
        <p style={{ fontSize: 14, color: "var(--text)", marginBottom: 6, fontStyle: "italic" }}>&ldquo;{r.quote}&rdquo;</p>
        <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{r.authorName} {r.authorRole ? `· ${r.authorRole}` : ""}</p>
      </div>
      <ReviewActions reviewId={r.id} approved={r.approved} featured={r.featured ?? false} />
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Reviews</h1>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>{pending.length} pending approval · {approved.length} live</p>

      {pending.length > 0 && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 700, color: "#f59e0b" }}>Pending ({pending.length})</div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(pending as any[]).map((r) => <Row key={r.id} r={r} />)}
        </div>
      )}

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 700, color: "var(--teal)" }}>Approved ({approved.length})</div>
        {approved.length === 0 ? <p style={{ padding: "20px", fontSize: 13, color: "var(--text-faint)" }}>None yet</p>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          : (approved as any[]).map((r) => <Row key={r.id} r={r} />)}
      </div>
    </div>
  );
}
