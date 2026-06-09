export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { invoices, projects, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { InvoiceActions } from "./InvoiceActions";

export const metadata: Metadata = { title: "Invoices | Admin" };

export default async function InvoicesAdminPage() {
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await db.select({ invoice: invoices, project: projects, user: { name: users.name, email: users.email } })
      .from(invoices)
      .leftJoin(projects, eq(projects.id, invoices.projectId))
      .leftJoin(users, eq(users.id, projects.userId))
      .orderBy(desc(invoices.createdAt));
  } catch {}

  function fmtNgn(kobo: number) { return `₦${(kobo / 100).toLocaleString("en-NG")}`; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalPaid = (rows as any[]).filter((r) => r.invoice?.status === "paid").reduce((s: number, r: any) => s + (r.invoice?.amount ?? 0), 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Invoices</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{rows.length} invoices · {fmtNgn(totalPaid)} collected</p>
        </div>
        <a href="/admin/invoices/new" style={{ fontSize: 13, padding: "9px 18px", borderRadius: 9, background: "var(--teal)", color: "#050507", fontWeight: 700, textDecoration: "none" }}>
          + New invoice
        </a>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Client", "Project", "Amount", "Due", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "var(--text-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "24px 16px", color: "var(--text-faint)", textAlign: "center" }}>No invoices yet</td></tr>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) : rows.map(({ invoice: inv, project: p, user: u }: any) => (
              <tr key={inv.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 16px" }}>{u?.name || u?.email || "—"}</td>
                <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{p?.title || "—"}</td>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--teal)" }}>{fmtNgn(inv.amount)}</td>
                <td style={{ padding: "12px 16px", color: "var(--text-faint)", fontSize: 11 }}>
                  {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "—"}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 5, background: inv.status === "paid" ? "rgba(74,222,128,0.08)" : "rgba(251,191,36,0.08)", border: `1px solid ${inv.status === "paid" ? "rgba(74,222,128,0.2)" : "rgba(251,191,36,0.2)"}`, color: inv.status === "paid" ? "#4ade80" : "#fbbf24" }}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <InvoiceActions invoiceId={inv.id} email={u?.email ?? ""} amount={inv.amount} status={inv.status ?? "pending"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
