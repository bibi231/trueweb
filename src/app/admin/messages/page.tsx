export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { AdminInbox } from "./AdminInbox";

export const metadata: Metadata = { title: "Messages | Admin" };

export default function AdminMessagesPage() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Messages</h1>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Reply to clients, request payments, and ask for reviews - all in one inbox.</p>
      <AdminInbox />
    </div>
  );
}
