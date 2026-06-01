# ADR-0001 — Redesign, Rebrand to Jahouse Nexus, and Expand to 8 Services

- **Date:** 2026-06-01
- **Phase:** 2 — Rebrand & Visual Redesign
- **Status:** Accepted
- **Domain terms:** Jahouse Nexus, Gold palette, Brutalist field manual, Services orbit, Vaporize, Particle field

## Context

The site was built in Phase 1 as a service-positioning site using the working name "Hasan Services Website" with a sci-fi / teal-accent aesthetic and five initial service categories. Phase 2 established a permanent studio brand, chose a definitive aesthetic direction, expanded the service offering, and replaced all interactive components with vanilla JS implementations.

## Decisions

### (a) Rebrand to Jahouse Nexus

The site now represents a named studio — Jahouse Nexus, logo mark "JN" — rather than a personal portfolio. Founder: Hasan Jahoush. Location: Nicosia, Cyprus + remote. Tagline: "We think, you grow."

**Why:** A studio brand positions the business as a professional entity that outlasts any single freelance engagement. It enables future team expansion and client perception of organisational capability, not just individual skill.

### (b) Gold-only palette — teal dropped

The single accent is gold: `oklch(0.82 0.135 78)` ≈ `#E0A23A`. Teal and cyan are explicitly excluded.

**Why teal was dropped:** The earlier teal accent (`oklch(0.78 0.17 178)`) was the same hue family used by Qualia Solutions, the employer studio Hasan works at. Keeping teal would make Jahouse Nexus look like a Qualia sub-brand or a copy, undermining brand independence. Gold is warm, carries premium and engineering connotations, and is visually distinct from any current reference.

Backgrounds use hue 78 (warm near-black) rather than the old hue-190 blue-cast dark.

### (c) Brutalist "engineering field manual" aesthetic

The design direction is a brutalist spec sheet — heavy Archivo Black headlines, gold index stamps (`[01]`–`[08]`), hairline rules, monospaced labels, and structural content hierarchy that reads like a manufacturing brief.

**How this was chosen:** Four aesthetic concepts were evaluated in a judge panel:

| Concept | Verdict |
|---------|---------|
| Sci-fi / teal (previous) | Dropped — reads as Qualia clone |
| Luxury dark / champagne | Rejected — too passive, low conversion energy |
| Clean minimal / white space | Rejected — undifferentiated in the agency market |
| Brutalist field manual / gold | **Selected** — distinctive, authoritative, technically credible |

The brutalist direction was selected because it stands out in a market full of generic dark SaaS landing pages, signals engineering rigour to technical buyers, and can carry the gold palette without feeling ornate.

### (d) Expansion to 8 services

Services expanded from an initial five to eight:

1. Web Design & Development (`web-design`)
2. AI Solutions (`ai-solutions`)
3. SEO & Local Visibility (`seo`)
4. Content Creation (`content`)
5. Social Media Marketing (`social`)
6. Business Automation (`automation`)
7. Backend & API Systems (`backend`)
8. Branding & Identity (`branding`)

**Why:** The five-service list omitted content creation, social media, and branding — capabilities Hasan already delivers. Eight services covers the full studio scope without overpromising. The number eight maps cleanly onto the services orbit (8 nodes) and the `[01]`–`[08]` index stamp system.

### (e) Stay static — interactive components rebuilt in vanilla JS

The site remains static HTML + Bootstrap 5 (CDN) + vanilla JS. No React, no shadcn/ui, no build step. The three new interactive components were built as standalone scripts:

| Component | File | Purpose |
|-----------|------|---------|
| Services orbit | `script/orbit.js` | 8-node orbital diagram; click to expand service brief |
| Vaporize tagline | `script/vapor.js` | Hero tagline characters disperse on trigger |
| Hero particle field | `script/bg.js` | Canvas star/particle field behind hero |

**Why not React/shadcn:** The MVP already runs as static HTML. Introducing a framework would add a build step, Node.js dependency, and deployment complexity for zero user-facing gain. All three interactive features are self-contained canvas/DOM animations that are straightforward to implement in ~100-150 lines of vanilla JS each. Static hosting stays simple and zero-cost. This decision can be revisited if a CMS, auth, or dynamic data requirement emerges in a later phase.

## Consequences

- **What becomes easier:** Brand independence is clear; no visual confusion with Qualia Solutions. The field-manual aesthetic is coherent and extensible (new sections inherit the stamp/rule system). All 8 services have a canonical slug for deep-linking from contact forms and marketing links.
- **What becomes harder:** Any future colour palette change must work within gold-on-warm-dark (no second accent to fall back on). The orbit interaction requires graceful mobile degradation (grid fallback).
- **What is now load-bearing:** `script/orbit.js`, `script/vapor.js`, and `script/bg.js` are permanent parts of the static stack — they must be preserved and maintained as the site evolves.

## Alternatives Considered

- **Keep teal, add gold as secondary** — rejected; two accent hues dilute the committed palette and the teal conflict with Qualia remains.
- **Migrate to Next.js for Phase 2** — rejected; the design goal (visual rebrand) does not require dynamic rendering. Framework migration is deferred to a phase where it earns its complexity.
- **Personal portfolio framing (keep "Hasan" as the brand)** — rejected; studio branding is the conversion-appropriate choice for B2B service sales.
