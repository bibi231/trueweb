import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof getDb> | null = null;

export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    if (!_db) _db = getDb();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_db as unknown as Record<string | symbol, unknown>)[prop];
  },
  // Required: @auth/drizzle-adapter detects the db dialect via
  // Object.getPrototypeOf(db) (drizzle's `is()` helper). Without this trap
  // the Proxy reports Object.prototype and the adapter throws
  // "Unsupported database type" -> 500 on /portal and /admin.
  getPrototypeOf() {
    if (!_db) _db = getDb();
    return Object.getPrototypeOf(_db);
  },
  has(_target, prop) {
    if (!_db) _db = getDb();
    return prop in (_db as object);
  },
});
