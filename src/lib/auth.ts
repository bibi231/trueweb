import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrus@trueweb.ng"];

const isConfigured = !!(
  process.env.AUTH_SECRET &&
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.DATABASE_URL
);

const makeConfig = async () => {
  if (!isConfigured) return { providers: [], trustHost: true };

  const { DrizzleAdapter } = await import("@auth/drizzle-adapter");
  const { db } = await import("./db");
  const { users } = await import("./db/schema");
  const { eq } = await import("drizzle-orm");

  return {
    adapter: DrizzleAdapter(db),
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GitHub({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
    ],
    pages: { signIn: "/portal/login" },
    events: {
      createUser: async ({ user }: { user: { id?: string; email?: string | null; name?: string | null } }) => {
        if (!user.email) return;

        // Set owner role for owner emails
        const role = OWNER_EMAILS.includes(user.email) ? "owner" : "client";
        if (role === "owner" && user.id) {
          try {
            await db.update(users).set({ role: "owner" }).where(eq(users.id, user.id));
          } catch { /* no-op */ }
        }

        // Send welcome email (fire-and-forget, don't block auth)
        if (process.env.RESEND_API_KEY) {
          import("../lib/email/send").then(({ sendWelcomeEmail }) => {
            sendWelcomeEmail("trueweb", user.email!, user.name ?? undefined, "https://trueweb.com.ng/portal")
              .catch(console.error);
          }).catch(console.error);
        }
      },
    },
    callbacks: {
      session: ({ session, user }: { session: Record<string, unknown>; user: Record<string, unknown> }) => ({
        ...session,
        user: {
          ...(session.user as Record<string, unknown>),
          id: user?.id,
          role: user?.role ?? "client",
        },
      }),
    },
    trustHost: true,
  };
};

// Lazy singleton so build-time doesn't crash
let _auth: ReturnType<typeof NextAuth> | null = null;
async function getAuth() {
  if (!_auth) {
    const cfg = await makeConfig();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _auth = NextAuth(cfg as any);
  }
  return _auth;
}

// Named exports expected by route handlers — resolved lazily at runtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handlers: any = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GET: async (req: Request) => (await getAuth()).handlers.GET(req as any),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  POST: async (req: Request) => (await getAuth()).handlers.POST(req as any),
};
export const auth = async (...args: unknown[]) => {
  const a = await getAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (a.auth as any)(...args);
};
export const signIn = async (...args: unknown[]) => {
  const a = await getAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (a.signIn as any)(...args);
};
export const signOut = async (...args: unknown[]) => {
  const a = await getAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (a.signOut as any)(...args);
};
