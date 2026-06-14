import { db } from "@/lib/db";
import { affiliates, affiliateConversions, users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

/** Cookie that carries a referrer's code from first visit through to checkout. */
export const REF_COOKIE = "tw_ref";
export const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

/** 8-char lowercase alphanumeric code, e.g. "ab12cd34". */
export function generateCode(len = 8): string {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

export type AffiliateRecord = typeof affiliates.$inferSelect;

/** Get the caller's affiliate row, creating one (with a fresh code) if absent. */
export async function getOrCreateAffiliate(userId: string): Promise<AffiliateRecord> {
  const existing = await db.select().from(affiliates).where(eq(affiliates.userId, userId)).limit(1);
  if (existing[0]) return existing[0];

  // Retry a few times in case of a code collision on the unique index.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const [created] = await db
        .insert(affiliates)
        .values({ userId, code: generateCode() })
        .returning();
      return created;
    } catch {
      // Another request may have created the row first — re-read.
      const again = await db.select().from(affiliates).where(eq(affiliates.userId, userId)).limit(1);
      if (again[0]) return again[0];
    }
  }
  throw new Error("Could not create affiliate record");
}

/** Issue a brand-new code for an existing affiliate (invalidates the old link). */
export async function regenerateCode(userId: string): Promise<AffiliateRecord> {
  const aff = await getOrCreateAffiliate(userId);
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const [updated] = await db
        .update(affiliates)
        .set({ code: generateCode() })
        .where(eq(affiliates.id, aff.id))
        .returning();
      return updated;
    } catch {
      /* collision — try again */
    }
  }
  throw new Error("Could not regenerate code");
}

/**
 * Record a commission for a successful payment that carried a referral code.
 * Idempotent on paymentRef so a webhook retry won't double-pay.
 * Returns the commission in kobo, or null if the code was unknown / self-referral.
 */
export async function recordConversion(opts: {
  code: string;
  amountKobo: number;
  referredEmail?: string;
  paymentRef: string;
}): Promise<number | null> {
  const { code, amountKobo, referredEmail, paymentRef } = opts;
  if (!code || amountKobo <= 0) return null;

  const [aff] = await db.select().from(affiliates).where(eq(affiliates.code, code)).limit(1);
  if (!aff) return null;

  // Don't credit someone for referring themselves.
  if (referredEmail) {
    const [refUser] = await db.select({ id: users.id }).from(users).where(eq(users.id, aff.userId)).limit(1);
    const [payer] = await db.select({ id: users.id }).from(users).where(eq(users.email, referredEmail)).limit(1);
    if (refUser && payer && refUser.id === payer.id) return null;
  }

  // Idempotency: skip if this payment was already converted.
  if (paymentRef) {
    const dupe = await db
      .select({ id: affiliateConversions.id })
      .from(affiliateConversions)
      .where(eq(affiliateConversions.paymentRef, paymentRef))
      .limit(1);
    if (dupe[0]) return null;
  }

  const rate = parseFloat(aff.commissionRate ?? "0.04");
  const commissionKobo = Math.round(amountKobo * rate);
  if (commissionKobo <= 0) return null;

  let payerId: string | null = null;
  if (referredEmail) {
    const [payer] = await db.select({ id: users.id }).from(users).where(eq(users.email, referredEmail)).limit(1);
    payerId = payer?.id ?? null;
  }

  await db.insert(affiliateConversions).values({
    affiliateId: aff.id,
    referredUserId: payerId,
    referredEmail: referredEmail ?? null,
    paymentRef,
    amountKobo,
    commissionKobo,
    status: "pending",
  });

  await db
    .update(affiliates)
    .set({
      totalEarnedKobo: sql`${affiliates.totalEarnedKobo} + ${commissionKobo}`,
      pendingPayoutKobo: sql`${affiliates.pendingPayoutKobo} + ${commissionKobo}`,
    })
    .where(eq(affiliates.id, aff.id));

  return commissionKobo;
}
