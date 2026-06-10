export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { signOut } from "@/lib/auth";
import { LayoutDashboard, MessageSquare, FolderOpen, Receipt, LogOut } from "lucide-react";
import Image from "next/image";

const NAV = [
  { href: "/portal", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/portal/projects", icon: FolderOpen, label: "Projects" },
  { href: "/portal/messages", icon: MessageSquare, label: "Messages" },
  { href: "/portal/invoices", icon: Receipt, label: "Invoices" },
];

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  // Don't gate the login page itself — would cause an infinite redirect loop.
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? hdrs.get("x-invoke-path") ?? hdrs.get("next-url") ?? "";
  const isLoginRoute = pathname.includes("/portal/login");

  const session = await auth();
  if (!session?.user && !isLoginRoute) redirect("/portal/login");

  // Render the login page without the sidebar chrome.
  if (isLoginRoute || !session?.user) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100svh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220, flexShrink: 0,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          display: "flex", flexDirection: "column",
          padding: "24px 0",
          position: "sticky", top: 0, height: "100svh",
        }}
      >
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid var(--border)", marginBottom: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, var(--teal), var(--teal-dim))", display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 14, color: "#050507" }}>T</span>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 15, color: "var(--text)" }}>TrueWeb</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {session.user.image && (
              <Image src={session.user.image} alt="" width={32} height={32} unoptimized style={{ borderRadius: "50%", flexShrink: 0 }} />
            )}
            <div>
              <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>{session.user.name}</p>
              <p style={{ fontSize: 11, color: "var(--text-faint)" }}>Client</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 12px" }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 9, marginBottom: 2,
                fontSize: 13.5, fontWeight: 500, color: "var(--text-muted)",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              <item.icon size={15} strokeWidth={1.8} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "0 12px" }}>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px",