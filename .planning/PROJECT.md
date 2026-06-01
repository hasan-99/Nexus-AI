---
project_type: full
template_type: website
client: Jahouse Nexus / Hasan Jahoush
status: active
---

# Jahouse Nexus — Services Website

## Client
Jahouse Nexus — studio founded by Hasan Jahoush, Nicosia, Cyprus. Logo mark: "JN". Tagline: "We think, you grow."

## Project Type
Full project: a services-first static website for a Cyprus digital studio. Not a personal portfolio — the brand is Jahouse Nexus, and every page is built to sell services and drive consultation inquiries.

## What We're Building
A bold brutalist "engineering field manual" service site presenting 8 studio services to small businesses and local operators. Visitors should understand within five seconds what the studio offers and how to engage.

## Services (8)

| # | Service | Slug |
|---|---------|------|
| 01 | Web Design & Development | `web-design` |
| 02 | AI Solutions | `ai-solutions` |
| 03 | SEO & Local Visibility | `seo` |
| 04 | Content Creation | `content` |
| 05 | Social Media Marketing | `social` |
| 06 | Business Automation | `automation` |
| 07 | Backend & API Systems | `backend` |
| 08 | Branding & Identity | `branding` |

Slugs are used as `services.html#slug` anchors and `contact.html?service=slug` prefill parameters.

## Pages
`index.html` · `services.html` · `workflows.html` · `proof.html` · `insights.html` · `contact.html`

Canonical domain: https://hasanjahoush.com/

## Core Value
Visitors understand within five seconds: what the studio does, what problems are solved, how to book. No ambiguity about whether this is a personal blog or a business.

## Requirements
- [ ] REQ-001: Present the site as Jahouse Nexus — studio brand, not personal portfolio.
- [ ] REQ-002: All 8 services listed with outcome-led descriptions and consultation CTAs.
- [ ] REQ-003: Strong conversion paths: consultation CTA, WhatsApp (+35799260049), email (hasan.cy99@gmail.com), service inquiry prefill.
- [ ] REQ-004: Live proof — Refalco Group (refalco.com) featured as primary case reference.
- [ ] REQ-005: SEO metadata reflects studio/business intent, not personal-resume schema.
- [ ] REQ-006: Static implementation maintained — no build step, no framework migration.
- [ ] REQ-007: Responsive at 375, 768, 1280, 1440px.

## Out of Scope
- Full SaaS backend or authentication.
- Supabase unless a later phase adds real lead-capture storage.
- CMS or dynamic blog in the current milestone.

## Stack
Static HTML + Bootstrap 5 (CDN) + Font Awesome (CDN) + vanilla JS + `css/style.css`.

Shared JS modules:
- `script/site.js` — nav, status ticker, scroll reveal, Enter transitions, contact prefill
- `script/orbit.js` — services interactive orbit diagram
- `script/vapor.js` — vaporize tagline animation
- `script/bg.js` — hero particle field (canvas)

No build step. Hosted as a static site.

## Design Direction
Brutalist "engineering field manual": warm near-black backgrounds, gold-only accent (`--gold` oklch(0.82 0.135 78) ≈ #E0A23A), Archivo Black display, Manrope body, JetBrains Mono labels. See `.planning/DESIGN.md` for the full visual contract.

## Decisions
| Decision | Why |
|----------|-----|
| Brand as Jahouse Nexus, not personal portfolio | The business goal is to sell studio services; a personal-name portfolio frame undermines that. |
| Gold-only palette — teal dropped | Teal read as Qualia Solutions' colour; independent brand requires clear differentiation. |
| Brutalist field-manual aesthetic | Chosen via a 4-concept judge panel; stands out from generic dark SaaS landing pages. |
| Keep static — no React/shadcn | MVP can ship without framework overhead; vanilla JS covers all interactive requirements. |
| 8 services | Covers the full range of studio capabilities without overloading a single-page layout. |
