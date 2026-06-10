# Stage B — Resend Email Infra Report

Date: 2026-06-10

---

## Files Created / Modified

### SupportAI (`/server/src/`)

**Created:**
- `lib/email/client.ts` — Resend lazy singleton
- `lib/email/templates.ts` — 11 HTML templates (teal-green brand) + drip + newsletter
- `lib/email/send.ts` — 11 flow helpers + drip helpers + email_log dedup
- `models/EmailLog.ts` — Mongoose model: userId, site, flow, sentAt, openedAt, clickedAt
- `jobs/drip.ts` — node-cron onboarding (hourly) + re-engagement (daily 09:00 WAT) cron

**Modified:**
- `controllers/auth.controller.ts` — welcome email on register
- `controllers/billing.controller.ts` — payment receipt on webhook success
- `app.ts` — starts drip cron on server boot
- `package.json` — added `resend ^4.0.0`, `node-cron ^3.0.3`

---

### ReplyAI (`/server/src/`)

**Created:**
- `lib/email/client.ts`
- `lib/email/templates.ts` — violet brand (#6c63ff)
- `lib/email/send.ts`
- `jobs/drip.ts`

**Modified:**
- `routes/auth.ts` — welcome email on first Firebase sync
- `routes/webhook.ts` — payment receipt on Squad webhook
- `index.ts` — starts drip cron
- `db/schema.ts` — added `email_log` table (auto-migrates on Render deploy)
- `package.json` — added resend + node-cron

---

### HarvestAI (`/server/src/`)

**Created:**
- `lib/email/client.ts`
- `lib/email/templates.ts` — amber brand (#f59e0b)
- `lib/email/send.ts`
- `jobs/drip.ts`

**Modified:**
- `routes/auth.ts` — welcome email on first Firebase sync
- `routes/webhooks.ts` — payment receipt on Squad webhook
- `index.ts` — starts drip cron
- `db/schema.ts` — added `email_log` table
- `package.json` — added resend + node-cron

---

### TrueWeb (`/src/lib/email/`)

**Modified:**
- `send.ts` — fixed per-site FROM addresses and per-site reply-to addresses
  - Before: all sites sent from `hello@trueweb.com.ng`
  - After: each site sends from its own domain (`hello@supportai.com.ng`, etc.)

**Pre-existing (already built in a prior session):**
- `client.ts`, `send.ts`, `flows/`, `templates/` — React Email-based flows

---

## Environment Variables Needed

### Per repo on Render (all 3 product servers)

| Key | Notes |
|-----|-------|
| `RESEND_API_KEY` | Get from resend.com/api-keys — one key covers all sends |

### TrueWeb (Vercel)

| Key | Notes |
|-----|-------|
| `RESEND_API_KEY` | Same key as above (or separate key for isolation) |

---

## Drip Cron Schedule

| Job | Expression | Fires |
|-----|-----------|-------|
| Onboarding drip | `5 * * * *` | Every hour at :05 — sends day 1/3/5/7 to new users |
| Re-engagement | `0 8 * * *` | Daily at 08:00 UTC (09:00 WAT) — sends day 14/21/28 to inactive users |
| Weekly digest | Manual / TBD | Not yet cron'd — call `sendWeeklyDigestEmail()` from your analytics cron |

---

## Smoke Tests (curl)

### Test SupportAI welcome email
```bash
curl -X POST https://api-supportai.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testsmoke+sai@trueweb.com.ng",
    "password": "Test1234!",
    "firstName": "Smoke",
    "lastName": "Test",
    "businessName": "Smoke Test Co",
    "industry": "Technology",
    "phone": "08001234567"
  }'
# Expect: 201 response + welcome email in inbox
```

### Test ReplyAI welcome email (Firebase token required)
```bash
# 1. Get Firebase ID token by signing in
# 2. POST to /api/auth/sync — first call triggers welcome email
curl -X POST https://replyai-api.onrender.com/api/auth/sync \
  -H "Authorization: Bearer <firebase-id-token>" \
  -H "Content-Type: application/json" \
  -d '{"displayName": "Smoke Test"}'
```

### Test HarvestAI welcome (same pattern as ReplyAI)
```bash
curl -X POST https://harvestai-api.onrender.com/api/auth/sync \
  -H "Authorization: Bearer <firebase-id-token>" \
  -H "Content-Type: application/json" \
  -d '{"displayName": "Smoke Test"}'
```

### Test payment receipt (Squad test webhook)
```bash
# Use Squad's test webhook replay from: https://dashboard.squadco.com/webhooks
# Trigger a test charge_successful event to:
# SupportAI: https://api-supportai.onrender.com/api/billing/webhook
# ReplyAI:   https://replyai-api.onrender.com/api/webhook/gtsquad
# HarvestAI: https://harvestai-api.onrender.com/api/webhooks/gtsquad
```

---

## What's Not Yet Built

- **Newsletter subscriber routes** — DB model exists (EmailLog pattern), need `/api/newsletter/subscribe` + `/api/newsletter/confirm` routes per site
- **Weekly digest cron trigger** — helpers exist; need a cron call with real stats
- **Low credit cron** — helper exists; need a cron that checks credits and calls `sendLowCreditWarningEmail`
- **Unsubscribe endpoint** — link in drip emails references `/unsubscribe?uid=...`; handler not yet built
- **Open/click tracking** — EmailLog has `openedAt`/`clickedAt` columns but Resend pixel tracking must be enabled in Resend dashboard settings
