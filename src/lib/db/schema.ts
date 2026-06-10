import { pgTable, text, integer, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
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

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  senderId: text("sender_id").references(() => users.id),
  content: text("content").notNull(),
  type: text("type").default("text"),
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
