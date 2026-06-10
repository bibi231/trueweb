# Resend Domain Authentication — DNS Setup

Add these records in your Go54 domain manager for each domain.
After adding, verify at: https://resend.com/domains

## Domains to verify

- trueweb.com.ng
- supportai.com.ng
- replyai.com.ng
- harvestai.com.ng

---

## Records per domain

> Replace `<domain>` with the actual domain (e.g. `trueweb.com.ng`).
> Replace `<resend-dkim-value-N>` with the values Resend shows in your dashboard
> (Settings → Domains → Add domain → copy the CNAME values).

### 1. SPF (TXT on root or mail subdomain)

| Type | Host | Value |
|------|------|-------|
| TXT  | `@` (or `<domain>`) | `v=spf1 include:amazonses.com ~all` |

> Resend sends via Amazon SES. If you already have an SPF record, append `include:amazonses.com` inside the existing record — do NOT create a second TXT record on the same host.

### 2. DKIM (4 CNAME records — values from Resend dashboard)

| Type  | Host | Value |
|-------|------|-------|
| CNAME | `resend._domainkey` | `<resend-dkim-value-1>` |
| CNAME | `resend2._domainkey` | `<resend-dkim-value-2>` |
| CNAME | `resend3._domainkey` | `<resend-dkim-value-3>` |
| CNAME | `resend4._domainkey` | `<resend-dkim-value-4>` |

### 3. DMARC (TXT on `_dmarc` subdomain)

| Type | Host | Value |
|------|------|-------|
| TXT  | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@<domain>; ruf=mailto:dmarc@<domain>; fo=1` |

> Start with `p=none` if you want to monitor only, then graduate to `p=quarantine` once SPF + DKIM pass reliably.

### 4. MX (required for reply-to to actually receive mail)

Set on `support.<domain>` if you want `support@<domain>` to receive:
- Point to your email provider (Zoho, Google Workspace, etc.)
- Or forward to your personal inbox using Go54's email forwarding feature.

---

## Verification order

1. Add all TXT + CNAME records in Go54
2. Wait 5–30 minutes for DNS propagation
3. Go to Resend → Domains → click "Verify" for each domain
4. All 4 domain checks (SPF, DKIM × 4, DMARC) should go green
5. Test with a curl send (see STAGE-B-REPORT.md)

---

## Notes

- Resend requires domain verification before you can send from a custom address.
- Until verified, use Resend's sandbox domain (`onboarding@resend.dev`) for testing.
- DKIM keys rotate periodically — Resend notifies you; just update the CNAME values.
