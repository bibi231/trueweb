import { db } from "@/lib/db";
import { conversations, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrus@trueweb.ng"];

/** True if the session belongs to a TrueWeb team member (owner or staff). */
export async function isTeam(session: { user?: { email?: string | null; role?: string | null } } | null): Promise<boolean> {
  const email = session?.user?.email;
  if (!email) return false;
  if (OWNER_EMAILS.includes(email)) return true;
  if (session?.user?.role === "owner" || session?.user?.role === "staff") return true;
  try {
    const [u] = await db.select({ role: users.role }).from(users).where(eq(users.email, email)).limit(1);
    return u?.role === "owner" || u?.role === "staff";
  } catch {
    return false;
  }
}

export type Conversation = typeof conversations.$inferSelect;

/** Get the client's single conversation thread, creating it on first use. */
export async function getOrCreateClientConversation(clientId: string): Promise<Conversation> {
  const existing = await db.select().from(conversations).where(eq(conversations.clientId, clientId)).limit(1);
  if (existing[0]) return existing[0];
  const [created] = await db.insert(conversations).values({ clientId, subject: "General" }).returning();
  return created;
}
