export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, messages } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { FolderOpen, MessageSquare, Receipt, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard | Portal" };

export default async function PortalDashboard() {
  const session = await auth();
  if (!session?.user?.id) return null;

  type Project = typeof projects.$inferSelect;
  type Msg = typeof messages.$inferSelect;
  let userProjects: Project[] = [];
  let unread = 0;

  try {
    userProjects = await db.select().from(projects).where(eq(projects.userId, session.user.id)).orderBy(desc(projects.createdAt)).limit(5);
    const msgs: Msg[] = await db.select().from(messages).orderBy(desc(messages.createdAt)).limit(50);
    unread = msgs.filter((m) => m.senderId !== session.user!.id).length;
  } catch { /* DB not yet migrated */ }

  const STATUS_COLOR: Record<string, string> = {
    discovery: "#f59e0b",
    design: "#6366f1",
    build: "#00d4d4",
    qa: "#a855f7",
    live: "#4ade80",
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
          Welcome back, {session.user.name?.split(" ")[0]}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Here&apos;s an overview of your account.</p>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 32 }}>
        {[
          { Icon: FolderOpen, label: "Active projects", value: userProjects.length, href: "/portal/projects" },
          { Icon: MessageSquare, label: "Unread messages", value: unread, href: "/portal/messages" },
          { Icon: Receipt, label: "Pending invoices", value: 0, href: "/portal/invoices" },
        ].map((s) => (
          <Link key={s.label} href={s.href}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px", textDecoration: "none", transition: "border-color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--teal)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
          >
            <s.Icon size={18} color="var(--teal)" strokeWidth={1.8} style={{ marginBottom: 12 }} />
            <p style={{ fontSize: 26, fontWeight: 800, fontFamily: "var(--font-syne)", marginBottom: 2 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Projects */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Your projects</h2>
          <Link href="/portal/projects" style={{ fontSize: 13, color: "var(--teal)", display: "flex", alignItems: "center", gap: 4 }}>
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {userProjects.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "32px", textAlign: "center" }}>
            <p style={{ color: "var(--text-faint)", fontSize: 14, marginBottom: 16 }}>No projects yet.</p>
            <Link href="/start" className="btn-teal" style={{ fontSize: 13, padding: "10px 20px", borderRadius: 10 }}>
              Start a project
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {userProjects.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{p.title}</p>
                  <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{p.siteType || "Website"}</p>
                </div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: `${STATUS_COLOR[p.status ?? ""] ?? "#8892a4"}18`, border: `1px solid ${STATUS_COLOR[p.status ?? ""] ?? "#8892a4"}30`, color: STATUS_COLOR[p.status ?? ""] ?? "#8892a4", fontWeight: 600, textTransform: "capitalize" }}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ padding: "20px 24px", background: "rgba(0,212,212,0.04)", border: "1px solid rgba(0,212,212,0.12)", borderRadius: 14 }}>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>Quick actions</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/portal/messages" className="btn-ghost" style={{ fontSize: 13, padding: "8px 16px", borderRadius: 9 }}>Message us</Link>
          <Link href="/start" className="btn-ghost" style={{ fontSize: 13, padding: "8px 16px", borderRadius: 9 }}>New project</Link>
          <Link href="/portal/invoices" className="btn-ghost" style={{ fontSize: 13, padding: "8px 16px", borderRadius: 9 }}>View invoices</Link>
        </div>
      </div>
    </div>
  );
}
