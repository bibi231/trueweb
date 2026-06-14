-- TrueWeb messaging — run once in the Neon SQL editor. Safe to re-run.

CREATE TABLE IF NOT EXISTS "conversations" (
  "id" serial PRIMARY KEY,
  "client_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "subject" text DEFAULT 'General',
  "status" text DEFAULT 'open',
  "last_message_at" timestamp DEFAULT now(),
  "last_message_text" text,
  "unread_admin" integer DEFAULT 0,
  "unread_client" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "conversation_id" integer REFERENCES "conversations"("id") ON DELETE CASCADE;
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "sender_role" text DEFAULT 'client';
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "meta" jsonb;

CREATE INDEX IF NOT EXISTS "messages_conversation_id_idx" ON "messages" ("conversation_id");
CREATE INDEX IF NOT EXISTS "conversations_client_id_idx" ON "conversations" ("client_id");
