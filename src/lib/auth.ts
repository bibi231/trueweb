import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

/* Guard against missing env vars at build time */
const isConfigured = !!(
  process.env.AUTH_SECRET &&
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
);

const config = isConfigured
  ? {
      adapter: undefined as ReturnType<typeof import("@auth/drizzle-adapter").DrizzleAdapter> | undefined,
      providers: [
        Google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
        GitHub({ clientId: process.env.GITHUB_CLIENT_ID ?? "", clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "" }),
      ],
      pages: { signIn: "/portal/login" },
      callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: ({ session, user }: { session: Record<string, unknown>; user: Record<string, unknown> }) => ({
          ...session,
          user: { ...(session.user as Record<string, unknown>), id: user?.id, role: user?.role ?? "client" },
        }),
      },
      trustHost: true,
    }
  : {
      providers: [],
      trustHost: true,
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { handlers, auth, signIn, signOut } = NextAuth(config as any);
