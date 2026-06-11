export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  LayoutDashboard, Users, FolderOpen, MessageSquare, Star,
  Receipt, Globe, UserCheck, LogOut, ChevronRight,
} from "lucide-react";

const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrus@trueweb.ng"];

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/leads", icon: UserCheck, label: "Leads" },
  { href: "/admin/clients", icon: Users, label: "Clients" },
  { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/invoices", icon: Receipt, label: "Invoices" },
  { href: "/admin/sites", icon: Globe, label: "Sites" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/portal/login");

  /* Check owner role — check email first as quick gate, then DB role */
  const isOwner = OWNER_EMAILS.includes(session.user.email);
  if (!isOwner) {
    /* Also allow users with role=owner in DB */
    try {
      const [u] = await db.select({ role: users.role }).from(users).where(eq(users.email, session.user.email)).limit(1);
      if (u?.role !== "owner") redirect("/portal");
    } catch { redirect("/portal"); }
  }

  return (
    <div style={{ display: "flex", minHeight: "100svh", background: "var(--bg)" }}>
      <aside style={{ width: 220, flexShrink: 0, background: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "20px 0", position: "sticky", top: 0, height: "100svh", overflow: "auto" }}>
        <div style={{ padding: "0 16px 20px", borderBottom: "1px solid var(--border)", marginBottom: 12 }}>
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, var(--teal), var(--teal-dim))", display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 13, color: "#050507" }}>T</span>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 13, color: "var(--text)" }}>Admin</span>
          </Link>
          <p style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}>{session.user.email}</p>
        </div>

        <nav style={{ flex: 1, padding: "0 10px" }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 8, marginBottom: 2, fontSize: 13, fontWeight: 500, color: "var(--text-muted)", textDecoration: "none", transition: "background 0.15s, color 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              <item.icon size={14} strokeWidth={1.8} />
              {item.label}
              <ChevronRight size={11} style={{ marginLeft: "auto", opacity: 0.3 }} />
            </Link>
          ))}
        </nav>

        <div style={{ padding: "10px 10px 0", borderTop: "1px solid var(--border)" }}>
          <Link href="/portal" style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", fontSize: 13, color: "var(--text-faint)", textDecoration: "none" }}>
            <ChevronRight size={12} style={{ transform: "rotate(180deg)" }} />
            Back to Portal
          </Link>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
            <button type="submit" style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 10px", borderRadius: 8, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--text-faint)", fontFamily: "inherit" }}>
              <LogOut size={13} strokeWidth={1.8} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
        {children}
      </main>
    </div>
  );
}
