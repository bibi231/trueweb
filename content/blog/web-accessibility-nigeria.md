---
title: "Web Accessibility in Nigeria: Why It's Both a Legal and Business Requirement"
excerpt: "Web accessibility is not just a global compliance standard — Nigerian law and business logic both make it a requirement that forward-thinking companies should meet."
date: "2026-06-10"
author: "TrueWeb Team"
tags: ["accessibility", "WCAG", "Nigeria", "web development"]
readingTime: 4
---

## The Nigerian Legal Context

The **Discrimination Against Persons with Disabilities (Prohibition) Act 2018** (DAPDA) prohibits discrimination against persons with disabilities in access to services, including digital services. While enforcement is still developing, the legal basis for challenging inaccessible digital platforms exists.

The **National Information Technology Development Agency (NITDA)** has published accessibility guidelines for Nigerian government websites aligned with WCAG 2.1. As the regulatory environment matures, private sector compliance expectations will follow.

For Nigerian businesses that deal with federal government agencies, financial institutions, or any public-sector procurement, accessibility standards are increasingly a requirement for approval.

## The Business Case Is Stronger Than the Legal One

Nigeria has an estimated 29 million persons with disabilities (WHO estimates), representing a significant segment of potential customers and employees who encounter barriers on inaccessible websites.

Beyond this specific segment:

- **Older users** (growing as smartphone adoption spreads to older demographics) benefit from accessibility features like larger text, higher contrast, and keyboard navigation
- **Situational accessibility needs** — using a phone in bright sunlight, operating with one hand, slow internet connection — affect all users at some point
- **SEO correlation** — accessible websites consistently score better on technical SEO because the practices overlap (semantic HTML, alt text, logical page structure)

## What WCAG 2.1 Level AA Actually Requires

WCAG (Web Content Accessibility Guidelines) Level AA is the widely referenced standard. Key requirements:

### Perceivable
- **Text alternatives** for all non-text content (images must have `alt` text describing the image)
- **Captions** for video content
- **Colour contrast ratio** of at least 4.5:1 for normal text — check your brand colours; many Nigerian brand palettes fail this test

### Operable
- All functionality must be **keyboard navigable** (not everyone uses a mouse)
- **No flashing content** that could trigger seizures
- **Sufficient time** for users to complete tasks — no automatic timeouts without warning

### Understandable
- **Language declaration** in HTML (`lang="en"`)
- **Clear error messages** in forms — "invalid input" tells a user nothing; "phone number must be 11 digits" does
- Consistent **navigation and labelling** across pages

### Robust
- Valid, semantic HTML that assistive technologies (screen readers) can interpret correctly

## Common Failures in Nigerian Websites

- Images without `alt` text (very common, easy to fix)
- Buttons that are actually `<div>` elements (not keyboard accessible)
- Forms with no labels — only placeholder text inside the input field (disappears when typing starts)
- Low contrast text over background images
- Video content without captions

## Getting Started

An accessibility audit of a typical 10-page Nigerian business website takes a few hours and produces a prioritised fix list. Tools like:

- **WAVE** (wave.webaim.org) — browser extension, free
- **Lighthouse** in Chrome DevTools — includes accessibility scoring
- **axe DevTools** — developer-focused, integrates into CI pipelines

Most Level AA compliance issues on existing sites are fixable by a developer in 1–3 days. Building accessibility in from the start of a new project adds minimal overhead and avoids expensive retrofitting later.
