# Research — Architecture

## Current Architecture
Static website with root `index.html`, CSS in `css/style.css`, assets in `img/`, JavaScript in `script/script.js`, and example projects under `my-wedsites_wxampels/`.

## Milestone 1 Architecture
- Keep a single homepage.
- Reorganize sections semantically:
  1. Hero
  2. Services
  3. Outcomes / how it works
  4. Proof / work
  5. About Hasan
  6. Contact
- Use section IDs that match navigation.
- Update metadata and structured data for business/service intent.
- Keep CSS overrides controlled; avoid endless one-off patching.

## Later Architecture
- If service pages grow, create separate static HTML pages or migrate to a framework.
- If leads need storage or notification, introduce a real backend path instead of mailto-only.
- If content becomes ongoing, choose CMS or markdown-driven static generation.

## Risk
The legacy CSS is large and selector-heavy. A clean service redesign may be faster if the homepage CSS is consolidated instead of layered with more overrides.

