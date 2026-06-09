export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { users, projects } from "@/lib/db/schema";
import { eq, count, desc } from "drizzle-orm";

export const metadata: Metadata = { title: "Clients | Admin" };

export default async function ClientsPage() {
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await db.select({
      user: users,
      projectCount: count(projects.id),
    }).from(users)
      .leftJoin(projects, eq(projects.userId, users.id))
      .groupBy(users.id)
      .orderBy(desc(users.createdAt));
  } catch {}

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Clients</h1>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>{rows.length} accounts</p>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Client", "Email", "Projects", "Role", "Joined"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "var(--text-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "24px 16px", color: "var(--text-faint)", textAlign: "center" }}>No clients yet</td></tr>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) : rows.map(({ user: u, projectCount }: any) => (
              <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {u.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={u.image} alt="" width={28} height={28} style={{ borderRadius: "50%", flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--surface-2)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, color: "var(--teal)", flexShrink: 0 }}>
                        {(u.name || u.email || "?")[0].toUpperCase()}
                      </div>
                    )}
                    <p style={{ fontWeight: 600 }}>{u.name || "—"}</p>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{u.email}</td>
                <td style={{ padding: "12px 16px", color: "var(--teal)", fontWeight: 700 }}>{projectCount}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 5, background: u.role === "owner" ? "rgba(0,212,212,0.08)" : "var(--surface-2)", border: "1px solid var(--border)", color: u.role === "owner" ? "var(--teal)" : "var(--text-faint)", textTransform: "capitalize" }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--text-faint)", fontSize: 11 }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
