export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { invoices, projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Receipt, CheckCircle, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Invoices | Portal" };

function fmt(kobo: number) {
  return `₦${(kobo / 100).toLocaleString("en-NG")}`;
}

export default async function InvoicesPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  type Row = { invoice: typeof invoices.$inferSelect; project: typeof projects.$inferSelect | null };
  let rows: Row[] = [];
  try {
    rows = await db
      .select({ invoice: invoices, project: projects })
      .from(invoices)
      .leftJoin(projects, eq(projects.id, invoices.projectId))
      .where(eq(projects.userId, session.user.id));
  } catch { /* DB not yet migrated */ }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Invoices</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Payment history and outstanding balances.</p>
      </div>

      {rows.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "40px", textAlign: "center" }}>
          <Receipt size={32} color="var(--text-faint)" style={{ margin: "0 auto 12px" }} strokeWidth={1.5} />
          <p style={{ color: "var(--text-faint)", fontSize: 14 }}>No invoices yet. They appear here once a project is underway.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map(({ invoice, project }: Row) => (
            <div key={invoice.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{project?.title ?? "Project"}</p>
                <p style={{ fontSize: 12, color: "var(--text-faint)" }}>
                  {invoice.dueDate ? `Due ${new Date(invoice.dueDate).toLocaleDateString()}` : "No due date"}
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 16, color: "var(--text)" }}>{fmt(invoice.amount)}</span>
              <span style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                background: invoice.status === "paid" ? "rgba(74,222,128,0.08)" : "rgba(251,191,36,0.08)",
                border: `1px solid ${invoice.status === "paid" ? "rgba(74,222,128,0.2)" : "rgba(251,191,36,0.2)"}`,
                color: invoice.status === "paid" ? "#4ade80" : "#fbbf24",
              }}>
                {invoice.status === "paid" ? <CheckCircle size={11} /> : <Clock size={11} />}
                {invoice.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
