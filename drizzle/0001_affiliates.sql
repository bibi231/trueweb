-- TrueWeb affiliate program — run once against the Neon Postgres DB
-- (Neon console → SQL editor → paste → Run). Safe to re-run: uses IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS "affiliates" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "code" varchar(12) NOT NULL UNIQUE,
  "commission_rate" numeric(4,3) DEFAULT '0.04',
  "total_earned_kobo" integer DEFAULT 0,
  "pending_payout_kobo" integer DEFAULT 0,
  "paid_out_kobo" integer DEFAULT 0,
  "payout_requested" boolean DEFAULT false,
  "created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "affiliate_conversions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "affiliate_id" uuid REFERENCES "affiliates"("id") ON DELETE CASCADE,
  "referred_user_id" text,
  "referred_email" text,
  "payment_ref" text,
  "amount_kobo" integer NOT NULL,
  "commission_kobo" integer NOT NULL,
  "status" varchar(20) DEFAULT 'pending',
  "created_at" timestamp DEFAULT now()
);

-- Speeds up the webhook's idempotency check and the per-affiliate listings.
CREATE INDEX IF NOT EXISTS "affiliate_conversions_payment_ref_idx" ON "affiliate_conversions" ("payment_ref");
CREATE INDEX IF NOT EXISTS "affiliate_conversions_affiliate_id_idx" ON "affiliate_conversions" ("affiliate_id");
