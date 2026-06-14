import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

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
  const bcrypt = (await import("bcryptjs")).default;

  // Only register an OAuth provider when BOTH its id and secret are present.
  // Otherwise NextAuth renders a "Sign in with X" button that errors on click
  // (this was why the GitHub login flow was failing — the secret was unset).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: any[] = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    );
  }

  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    );
  }

  providers.push(
    Credentials({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
          const email = (credentials.email as string).toLowerCase();

          // Throttle password guessing: max 10 attempts per email per 15 min.
          const { rateLimit } = await import("./rateLimit");
          if (!rateLimit(`login:${email}`, 10, 15 * 60 * 1000).ok) return null;

          const userArr = await db.select().from(users).where(eq(users.email, email));
          const user = userArr[0];
          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (!isValid) return null;

          return user;
        }
      })
  );

  return {
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" as const },
    providers,
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
      jwt: async ({ token, user }: { token: any; user?: any }) => {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
        return token;
      },
      session: ({ session, token }: { session: any; token: any }) => ({
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role ?? "client",
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
