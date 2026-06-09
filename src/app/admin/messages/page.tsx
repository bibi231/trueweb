export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { messages, projects, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const metadata: Metadata = { title: "Messages | Admin" };

export default async function AdminMessagesPage() {
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await db.select({ msg: messages, project: { title: projects.title }, user: { name: users.name, email: users.email } })
      .from(messages)
      .leftJoin(projects, eq(projects.id, messages.projectId))
      .leftJoin(users, eq(users.id, messages.senderId))
      .orderBy(desc(messages.createdAt))
      .limit(100);
  } catch {}

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Messages</h1>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>{rows.length} recent messages across all clients</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.length === 0 ? (
          <p style={{ color: "var(--text-faint)", fontSize: 14 }}>No messages yet</p>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) : rows.map(({ msg, project, user }: any) => (
          <div key={msg.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface-2)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700, color: "var(--teal)", flexShrink: 0 }}>
              {(user?.name || user?.email || "?")[0].toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 4 }}>
                <strong style={{ color: "var(--text)" }}>{user?.name || user?.email || "Unknown"}</strong>
                {project?.title && <> · {project.title}</>}
              </p>
              <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.55 }}>{msg.content}</p>
            </div>
            <span style={{ fontSize: 10, color: "var(--text-faint)", whiteSpace: "nowrap" }}>
              {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
