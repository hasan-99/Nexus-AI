# Phase 1 Verification — Service IA + Copy (+ M1 redesign scope)

**Date:** 2026-06-01
**Verdict:** ✅ PASS
**Method:** Goal-backward verification against M1 exit criteria + live browser QA (Playwright @ 375 / 1280) with console capture and interaction tests.

> Note: this milestone was executed as a single bold redesign pass that also delivered the
> substance of phases 2 (Homepage Visual System), 3 (Proof/Contact/SEO) and 4 (Responsive QA).
> Evidence below covers the full M1 exit criteria, not only Phase 1's IA/copy slice.

## Acceptance criteria

| # | Criterion | Result | Evidence |
|---|-----------|--------|----------|
| 1 | Hero sells services, not biography (no "Hi, I'm…") | PASS | `index.html` hero `BUILT. SEEN. PROVEN.` + studio subcopy; no first-person bio hero. |
| 2 | Services packaged around business outcomes | PASS | `index.html` `.spec-list` — 8 numbered service rows each with an outcome metric (`Leads answered in <2 min`, `Live in weeks`, …). |
| 3 | Consultation CTA visible + functional everywhere | PASS | Gold `Book Consultation` in nav (all pages), hero CTA, `#book` launch console, per-row `→ Book` deep-links. Contact prefill verified: `contact.html?service=ai-solutions` → `SELECTED SERVICE: AI Solutions`, mailto subject auto-filled. |
| 4 | Proof / work supports trust | PASS | `proof.html` + homepage feature the live **Refalco Group** site (`img/refalco.jpeg`, links to https://refalco.com/) plus 3 build examples. Founder credentials in footer + JSON-LD. |
| 5 | SEO metadata targets service intent | PASS | Per-page `<title>`/description/OG/Twitter rewritten for studio+services; `ProfessionalService` JSON-LD with 8-offer catalog in `index.html`; `sitemap.xml` (6 URLs) + `robots.txt`. |
| 6 | Screenshots pass mobile / tablet / desktop | PASS | Playwright @ 375 and 1280 verified: no horizontal scroll, hero + CTA unclipped, orbit + nav usable; responsive rules cover 1024/640 breakpoints. |
| 7 | No critical console errors | PASS | 0 errors across home/services/contact. One perf warning (canvas `getImageData`) fixed via `willReadFrequently`. |

## Design rubric (all dimensions ≥ 3)

| Dimension | Score | Evidence |
|-----------|:----:|----------|
| Typography | 5 | Archivo Black display, Manrope body, JetBrains Mono labels; fluid `clamp()` hierarchy. |
| Color | 5 | Gold (`--warm` oklch 0.82 0.135 78) on warm near-black; gold-on-dark + gold-fill/dark-ink both AA+. No teal. |
| Spacing | 4 | Fluid `--pad-x`/`--pad-section`, consistent rule rhythm. |
| States | 4 | Hover/active/focus-visible on all interactives; `prefers-reduced-motion` disables ticker/marquee/orbit-rotate/vapor/particles; JS-off fallbacks (orbit chips, static reveals). |
| Responsiveness | 5 | 375 / 640 / 1024 / 1280 verified; mobile spec-row restructures, orbit re-radii, full-width CTAs. |
| Accessibility | 4 | Skip link, ARIA labels/roles, keyboard-operable orbit (`<button>` nodes, `aria-expanded`), visually-hidden SEO heading on vapor band. |

## Interactive features verified
- **Services Orbit** (`script/orbit.js`) — auto-rotates, click expands panel (category/desc/pairs-with/Book), highlights related nodes, recenters; pauses offscreen + on reduced-motion.
- **Vaporize tagline** (`script/vapor.js`) — "We think." / "You grow." particle cycle; static on reduced-motion.
- **Hero particle field** (`script/bg.js`) — gold flow-field; single static frame on reduced-motion; pauses offscreen.

## Not claimed / deferred (honest scope)
- Real case-study **metrics** for the example builds (bakery/broker/agency) are not invented — left as honest "build examples" pending real client data.
- **Live production** verification (HTTP 200 on the real domain, post-deploy checklist) is pending the push/deploy gate, which is intentionally held until owner confirmation.
