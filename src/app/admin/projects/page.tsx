export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { projects, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export const metadata: Metadata = { title: "Projects | Admin" };

const STATUS_COLORS: Record<string, string> = {
  discovery: "#f59e0b", design: "#6366f1", build: "#00d4d4", qa: "#a855f7", live: "#4ade80",
};

export default async function ProjectsAdminPage() {
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await db.select({ project: projects, user: { name: users.name, email: users.email } })
      .from(projects).leftJoin(users, eq(users.id, projects.userId)).orderBy(desc(projects.createdAt));
  } catch {}

  function fmtNgn(kobo: number) { return kobo ? `₦${(kobo / 100).toLocaleString("en-NG")}` : "—"; }

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Projects</h1>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>{rows.length} total</p>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Project", "Client", "Type", "Paid", "Status", "Created"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "var(--text-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "24px 16px", color: "var(--text-faint)", textAlign: "center" }}>No projects yet</td></tr>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) : rows.map(({ project: p, user: u }: any) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 16px" }}><p style={{ fontWeight: 600 }}>{p.title}</p></td>
                <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{u?.name || u?.email || "—"}</td>
                <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{p.siteType || "—"}</td>
                <td style={{ padding: "12px 16px", color: "var(--teal)", fontWeight: 600 }}>{fmtNgn(p.amountPaid ?? 0)}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 5, background: `${STATUS_COLORS[p.status ?? ""] ?? "#8892a4"}18`, border: `1px solid ${STATUS_COLORS[p.status ?? ""] ?? "#8892a4"}30`, color: STATUS_COLORS[p.status ?? ""] ?? "#8892a4", textTransform: "capitalize", whiteSpace: "nowrap" }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--text-faint)", fontSize: 11 }}>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
