<div align="center">

# Nexus AI

**A Cyprus digital studio — web, AI, SEO, content, social, automation & backend.**

_We think, you grow._

[Live site](#) · [Founder](about.html) · [Services](services.html) · [Free demo](demo.html)

</div>

---

## Overview

Marketing and lead-generation website for **Nexus AI**, a Nicosia-based studio led by **Hasan Jahoush**. The site is a fast, framework-free static build: every page is hand-written HTML, styled with a single tokenised stylesheet, and progressively enhanced with vanilla JavaScript. No build step, no bundler — open it and it runs.

## Highlights

- **Living particle background** — a fixed flow-field canvas that reacts to the cursor, theme-aware (light / dark).
- **Dark mode** — one-click toggle, persisted in `localStorage`, no flash on load.
- **Smooth scroll cinema** — Lenis momentum scrolling, a scroll-progress bar, and word-by-word heading reveals.
- **Bento services grid** with live mini-previews (a self-building browser, a looping AI chat).
- **Interactive system map** — a clickable orbital diagram of the nine services.
- **Animated proof** — radial-gauge stat cards, a five-stage project pipeline, and real build screenshots.
- **Particle-morph & lightning** text effects, all rebuilt as dependency-free canvas scripts.
- **Founder page** — animated portrait, interactive AI-capability switchboard, experience timeline, skill grid.
- Fully **responsive** and **reduced-motion friendly**; every animation pauses off-screen.

## Tech stack

| Layer | Choice |
|-------|--------|
| Markup | Static HTML5 (multi-page) |
| Styling | One CSS file, OKLCH design tokens, fluid `clamp()` scale |
| Behaviour | Vanilla JavaScript (no framework) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) (CDN) |
| UI kit | Bootstrap 5 (CDN, layout only) |
| Icons | Font Awesome 6 (CDN) |
| Fonts | Archivo Black · Manrope · JetBrains Mono (Google Fonts) |
| Forms | Web3Forms (static form-to-email) |
| Hosting | GitHub Pages |

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, services, proof, pipeline, CTAs |
| `services.html` | Detailed service breakdown |
| `workflows.html` | How engagements run |
| `proof.html` | Work and results |
| `insights.html` | Pre-build checklist / approach |
| `about.html` | Founder profile (Hasan Jahoush) |
| `blog.html` | Articles |
| `demo.html` | Free-demo request |
| `contact.html` | Booking and contact |

## Project structure

```
.
├── index.html, about.html, services.html, …   # pages
├── css/
│   └── style.css            # the entire design system
├── script/
│   ├── site.js              # nav, theme toggle, reveals, tilt, forms
│   ├── bg.js                # living particle background
│   ├── fx.js                # smooth scroll, progress bar, word reveal, hero globe
│   ├── orbit.js             # interactive service map
│   ├── vapor.js             # particle-morph text
│   ├── lightning.js         # lightning text effect
│   └── term.js              # typing terminal
├── img/                     # photos, icons, media
└── sitemap.xml, robots.txt
```

## Run locally

No tooling required. Serve the folder over HTTP (needed so the canvas/fetch scripts work):

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Branching

```
main      ← production (deployed by GitHub Pages)
  └─ dev  ← integration
       └─ feature/*   ← individual changes
```

Work happens on `feature/*` branches, merges into `dev`, then promotes to `main` for release.

## Deployment

`main` is published automatically via **GitHub Pages**. Push to `main` and the live site updates.

## Configuration

Lead forms use **Web3Forms** — replace `YOUR_WEB3FORMS_ACCESS_KEY` in `contact.html` and `demo.html` with a real access key from <https://web3forms.com> to enable email delivery.

## Author

**Hasan Jahoush** — Founder, Software & AI Engineer · Nicosia, Cyprus
[LinkedIn](https://www.linkedin.com/in/hasan-jahoosh-bb457419a/) · jahousenexus@gmail.com

---

© 2025 Nexus AI. All rights reserved.
