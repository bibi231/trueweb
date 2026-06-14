export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

export const metadata: Metadata = { title: "Projects | Portal" };

const STATUS_COLOR: Record<string, string> = {
  discovery: "#f59e0b",
  design: "#6366f1",
  build: "#00d4d4",
  qa: "#a855f7",
  live: "#4ade80",
};

export default async function PortalProjectsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  type Project = typeof projects.$inferSelect;
  let userProjects: Project[] = [];
  try {
    userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, session.user.id))
      .orderBy(desc(projects.createdAt));
  } catch { /* DB not ready */ }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Your projects</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Track every build we&apos;re working on for you.</p>
      </div>

      {userProjects.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "44px 32px", textAlign: "center" }}>
          <FolderOpen size={28} color="var(--teal)" strokeWidth={1.6} style={{ marginBottom: 14 }} />
          <p style={{ color: "var(--text-faint)", fontSize: 14, marginBottom: 18 }}>No projects yet. Start one and we&apos;ll take it from there.</p>
          <Link href="/start" className="btn-teal" style={{ fontSize: 13, padding: "10px 20px", borderRadius: 10 }}>Start a project</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {userProjects.map((p) => {
            const color = STATUS_COLOR[p.status ?? ""] ?? "#8892a4";
            return (
              <div key={p.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 10 }}>
                  <div>
                    <p style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 2 }}>{p.title}</p>
                    <p style={{ fontSize: 12.5, color: "var(--text-faint)" }}>{p.siteType || "Website"}{p.budget ? ` · ${p.budget}` : ""}{p.timeline ? ` · ${p.timeline}` : ""}</p>
                  </div>
                  <span style={{ fontSize: 11, padding: "4px 11px", borderRadius: 6, background: `${color}18`, border: `1px solid ${color}30`, color, fontWeight: 600, textTransform: "capitalize", whiteSpace: "nowrap" }}>
                    {p.status}
                  </span>
                </div>
                {/* progress bar */}
                <div style={{ height: 6, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${({ discovery: 20, design: 45, build: 70, qa: 88, live: 100 } as Record<string, number>)[p.status ?? ""] ?? 10}%`, background: color, borderRadius: 4 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                  <span style={{ fontSize: 11.5, color: "var(--text-faint)" }}>
                    {p.paid ? "Paid" : "Awaiting payment"}{p.amountPaid ? ` · ₦${(p.amountPaid / 100).toLocaleString("en-NG")}` : ""}
                  </span>
                  <Link href="/portal/messages" style={{ fontSize: 12, color: "var(--teal)", fontWeight: 600 }}>Message us about this</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
