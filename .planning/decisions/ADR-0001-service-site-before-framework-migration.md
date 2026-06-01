# ADR-0001 — Keep Milestone 1 Static While Repositioning the Site

- **Date:** 2026-06-01
- **Phase:** 1 — Service Positioning Foundation
- **Status:** Accepted
- **Domain terms:** Service Site, Consultation, Service Offering

## Context
The existing project is a static HTML/CSS/JavaScript website. The user's immediate goal is not a new application backend; it is to stop presenting the site as a personal portfolio and make it sell services.

## Decision
Milestone 1 will keep the static implementation and focus on service positioning, conversion structure, copy, SEO, and responsive visual quality.

## Consequences
- **What becomes easier:** The MVP can ship quickly without framework migration risk.
- **What becomes harder:** Advanced lead capture, CMS, analytics experiments, and dynamic case studies wait until later.
- **What is now load-bearing on this decision:** Static HTML/CSS must stay clean enough to support the new service site without becoming unmaintainable.

## Alternatives Considered
- **Migrate immediately to Next.js** — rejected because it delays the core repositioning and introduces unnecessary setup before the service offer is clear.
- **Only polish the current portfolio design** — rejected because it preserves the wrong business message.

