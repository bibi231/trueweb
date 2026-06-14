import { pgTable, text, integer, boolean, timestamp, jsonb, serial, uuid, varchar, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  password: text("password"),
  /* owner | staff | client */
  role: text("role").default("client"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  status: text("status").default("discovery"),
  siteType: text("site_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  squadRef: text("squad_ref"),
  paid: boolean("paid").default(false),
  amountPaid: integer("amount_paid").default(0),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* A messaging thread between one client and the TrueWeb team (owner/staff). */
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject").default("General"),
  /* open | closed */
  status: text("status").default("open"),
  lastMessageAt: timestamp("last_message_at").defaultNow(),
  lastMessageText: text("last_message_text"),
  unreadAdmin: integer("unread_admin").default(0),
  unreadClient: integer("unread_client").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }),
  projectId: integer("project_id").references(() => projects.id),
  senderId: text("sender_id").references(() => users.id),
  /* client | admin */
  senderRole: text("sender_role").default("client"),
  content: text("content").notNull(),
  /* text | payment_link | review_request */
  type: text("type").default("text"),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  uploaderId: text("uploader_id").references(() => users.id),
  name: text("name").notNull(),
  url: text("url").notNull(),
  size: integer("size"),
  mimeType: text("mime_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  amount: integer("amount").notNull(),
  currency: text("currency").default("NGN"),
  status: text("status").default("pending"),
  squadRef: text("squad_ref"),
  dueDate: timestamp("due_date"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletter = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").default("unknown"),
  unsubscribed: boolean("unsubscribed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  userId: text("user_id").references(() => users.id),
  authorEmail: text("author_email"),
  rating: integer("rating").notNull(),
  quote: text("quote").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  source: text("source").default("portal"),
  approved: boolean("approved").default(false),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Affiliate / referral program — a user generates a code, shares
   trueweb.com.ng/?ref=CODE, and earns commissionRate of any payment that
   originated from a visit carrying their cookie. All money in kobo. */
export const affiliates = pgTable("affiliates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 12 }).unique().notNull(),
  commissionRate: numeric("commission_rate", { precision: 4, scale: 3 }).default("0.04"),
  totalEarnedKobo: integer("total_earned_kobo").default(0),
  pendingPayoutKobo: integer("pending_payout_kobo").default(0),
  paidOutKobo: integer("paid_out_kobo").default(0),
  payoutRequested: boolean("payout_requested").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const affiliateConversions = pgTable("affiliate_conversions", {
  id: uuid("id").primaryKey().defaultRandom(),
  affiliateId: uuid("affiliate_id").references(() => affiliates.id, { onDelete: "cascade" }),
  referredUserId: text("referred_user_id"),
  referredEmail: text("referred_email"),
  paymentRef: text("payment_ref"),
  amountKobo: integer("amount_kobo").notNull(),
  commissionKobo: integer("commission_kobo").notNull(),
  /* pending | paid */
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  siteType: text("site_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  features: text("features"),
  idea: text("idea"),
  templateId: text("template_id"),
  estimatedPrice: integer("estimated_price"),
  status: text("status").default("new"),
  source: text("source").default("build-flow"),
  createdAt: timestamp("created_at").defaultNow(),
});
