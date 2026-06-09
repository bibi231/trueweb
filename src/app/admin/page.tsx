export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { leads, projects, users, reviews, invoices, newsletter } from "@/lib/db/schema";
import { eq, gte, count, sum, desc } from "drizzle-orm";
import Link from "next/link";
import { UserCheck, FolderOpen, Star, Receipt, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = { title: "Admin Dashboard" };

type LucideIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }>;
function KpiCard({ icon: Icon, label, value, sub, href, color = "var(--teal)" }: { icon: LucideIcon; label: string; value: number | string; sub?: string; href: string; color?: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", display: "block", transition: "border-color 0.15s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = color)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
    >
      <Icon size={18} color={color} strokeWidth={1.8} style={{ marginBottom: 12 }} />
      <p style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-syne)", marginBottom: 2, color }}>{value}</p>
      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{label}</p>
      {sub && <p style={{ fontSize: 11, color: "var(--text-faint)" }}>{sub}</p>}
    </Link>
  );
}

export default async function AdminDashboard() {
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);

  let stats = { leads: 0, projects: 0, clients: 0, pendingReviews: 0, mtrRev: 0, subscribers: 0 };
  let recentLeads: Record<string, unknown>[] = [];
  let recentProjects: Record<string, unknown>[] = [];

  try {
    const [leadsCount] = await db.select({ c: count() }).from(leads).where(gte(leads.createdAt, weekAgo));
    const [projectsCount] = await db.select({ c: count() }).from(projects);
    const [clientsCount] = await db.select({ c: count() }).from(users).where(eq(users.role, "client"));
    const [pendingRev] = await db.select({ c: count() }).from(reviews).where(eq(reviews.approved, false));
    const [rev] = await db.select({ total: sum(invoices.amount) }).from(invoices).where(eq(invoices.status, "paid"));
    const [subs] = await db.select({ c: count() }).from(newsletter);

    stats = {
      leads: leadsCount?.c ?? 0,
      projects: projectsCount?.c ?? 0,
      clients: clientsCount?.c ?? 0,
      pendingReviews: pendingRev?.c ?? 0,
      mtrRev: Number(rev?.total ?? 0),
      subscribers: subs?.c ?? 0,
    };

    recentLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5);
    recentProjects = await db.select().from(projects).orderBy(desc(projects.createdAt)).limit(5);
  } catch { /* DB not yet migrated */ }

  function fmtNgn(kobo: number) { return `₦${(kobo / 100).toLocaleString("en-NG")}`; }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Admin Dashboard</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>TrueWeb Solutions — owner view</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
        <KpiCard icon={UserCheck} label="New leads" value={stats.leads} sub="last 7 days" href="/admin/leads" />
        <KpiCard icon={FolderOpen} label="Active projects" value={stats.projects} href="/admin/projects" color="#6366f1" />
        <KpiCard icon={Users} label="Clients" value={stats.clients} href="/admin/clients" color="#d97706" />
        <KpiCard icon={Star} label="Pending reviews" value={stats.pendingReviews} href="/admin/reviews" color="#f59e0b" />
        <KpiCard icon={TrendingUp} label="Revenue (paid)" value={fmtNgn(stats.mtrRev)} href="/admin/invoices" color="#4ade80" />
        <KpiCard icon={Receipt} label="Subscribers" value={stats.subscribers} href="/admin/leads" color="#a855f7" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="tw-admin-grid">
        {/* Recent leads */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700 }}>Recent leads</h2>
            <Link href="/admin/leads" style={{ fontSize: 12, color: "var(--teal)" }}>View all</Link>
          </div>
          {recentLeads.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-faint)" }}>No leads yet</p>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) : (recentLeads as any[]).map((l) => (
            <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
              <div>
                <p style={{ fontWeight: 600 }}>{l.name || l.email}</p>
                <p style={{ color: "var(--text-faint)", fontSize: 11 }}>{l.email} · {l.siteType || l.source}</p>
              </div>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 5, background: l.status === "paid" ? "rgba(74,222,128,0.08)" : "var(--surface-2)", border: "1px solid var(--border)", color: l.status === "paid" ? "#4ade80" : "var(--text-faint)" }}>
                {l.status}
              </span>
            </div>
          ))}
        </div>

        {/* Recent projects */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700 }}>Recent projects</h2>
            <Link href="/admin/projects" style={{ fontSize: 12, color: "var(--teal)" }}>View all</Link>
          </div>
          {recentProjects.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-faint)" }}>No projects yet</p>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) : (recentProjects as any[]).map((p) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
              <div>
                <p style={{ fontWeight: 600 }}>{p.title}</p>
                <p style={{ color: "var(--text-faint)", fontSize: 11 }}>{p.siteType} · ₦{p.amountPaid ? (p.amountPaid / 100).toLocaleString() : 0} paid</p>
              </div>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 5, background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-faint)", textTransform: "capitalize" }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .tw-admin-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
