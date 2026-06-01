# DESIGN — Nexus AI Services Website

> Visual contract for `portfolio3`. Every Qualia agent reads this before frontend work.

## 1. Direction

```
Aesthetic direction:  Engineering field manual / brutalist spec sheet
Color strategy:       Committed — gold monochrome only; no teal
Scene sentence:       A business owner opens the site after dark, reads it like a technical
                      brief — clean, confident, no decoration for its own sake. They know
                      within five seconds what the studio does and how to engage.
Differentiation:      A Cyprus digital studio presenting services as numbered specifications,
                      gold-stamped, built with the visual authority of a manufacturing manual.
```

## 2. Color (OKLCH-first)

The palette is gold on warm near-black. Teal was carried over from an earlier sci-fi direction and was dropped because it read as Qualia Solutions' signature colour — the studio Hasan works at — which would undermine Nexus AI as an independent brand. Gold is the only accent.

```css
:root {
  /* Backgrounds — warm near-black, no blue/teal cast */
  --bg:        oklch(0.12 0.012 78);
  --bg-2:      oklch(0.16 0.014 78);
  --surface:   oklch(0.20 0.016 78);
  --surface-2: oklch(0.25 0.016 78);

  /* Text */
  --text:      oklch(0.94 0.008 78);
  --muted:     oklch(0.72 0.012 78);
  --dim:       oklch(0.54 0.010 78);

  /* Rules / hairlines */
  --line:      oklch(0.32 0.014 78);
  --line-soft: oklch(0.26 0.012 78);

  /* Gold — single accent, no second hue */
  --gold:      oklch(0.82 0.135 78);   /* ≈ #E0A23A */
  --gold-2:    oklch(0.70 0.120 78);
  --gold-bg:   oklch(0.82 0.135 78 / 0.14);
}
```

### Accent Rules

- Gold (`--gold`) is the **only** accent colour. It appears on: index stamps, active nav states, CTA borders/fills, hover highlights, ticker separators.
- No teal. No cyan. No purple-blue gradient text as the identity.
- Warm near-black backgrounds use hue 78 (not 190) — the old blue-cast backgrounds are removed.

## 3. Typography

```
Display:  Archivo Black — heavy, uppercase or mixed-case, bleed-scale headlines
Body:     Manrope — refined service copy, comfortable reading weight
Mono:     JetBrains Mono — index stamps, status labels, spec annotations only
```

Font loading: Google Fonts CDN, weights 400/600/700 for Manrope; 400 (single weight) for Archivo Black; 400 for JetBrains Mono.

## 4. Spacing

8px grid with fluid page padding.

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --pad-x:       clamp(1rem, 5vw, 5rem);
  --pad-section: clamp(3rem, 8vw, 7rem);
}
```

## 5. Signature Elements

These are the five distinguishing visual moments of the Nexus AI site. Do not remove or genericise them.

### Status Ticker
A full-width marquee bar beneath the nav: monospaced gold text cycling through studio facts / service capabilities. Separators are `·`. Implemented in `script/site.js`.

### Bleed Headline
Hero headline set in Archivo Black at clamp(3rem, 8vw, 7rem), spanning edge-to-edge on desktop, with a gold accent word or line. No card box around it.

### Gold Index Stamps
Section numbers rendered in JetBrains Mono, prefixed `[01]` through `[08]` etc., in `--gold`. They read as a field-manual table of contents. Used on service listings and proof sections.

### Services Orbit
An interactive orbital diagram on the Services page: 8 service nodes orbit a central "JN" mark. Click a node to expand its brief. Implemented in `script/orbit.js`.

### Vaporize Tagline
The hero tagline "We think, you grow." vaporizes — individual characters disperse like smoke on hover or on a timed trigger. Implemented in `script/vapor.js`.

### Hero Particle Field
A canvas-based star/particle field behind the hero section. Gold-tinted particles, subtle parallax on scroll. Implemented in `script/bg.js`.

## 6. Components

### Navigation
Floating dark pill on desktop. Active page indicator in gold. CTA always visible as "Start a Project" or "Get a Quote".

### Buttons
- Primary: gold fill (`--gold`), dark text, pill shape, 44px minimum height.
- Secondary: transparent surface, `1px solid --gold`, gold text.
- Avoid "Learn More"; use specific verbs — "See Services", "Start a Project", "View Work".

### Service Cards / Orbit Nodes
On the services orbit: icon + service name + one-line outcome. Expanding panel shows 2-3 capability bullets and a CTA link.

On the services detail page (services.html): numbered spec cards with `[0N]` gold stamp, service name as Archivo Black heading, outcome paragraph, capability list.

### Proof Blocks
- Feature the Refalco Group site as the primary live proof (refalco.com).
- Use project screenshots or result statements.
- Avoid decorative cards without evidence.

## 7. Depth & Elevation

Atmospheric gold glow behind hero and key sections, not generic card shadows.

```css
:root {
  --elev-1: 0 1px 2px oklch(0.08 0.01 78 / 0.20);
  --elev-2: 0 8px 24px oklch(0.08 0.01 78 / 0.28);
  --elev-3: 0 24px 80px oklch(0.08 0.02 78 / 0.40);
  --glow-gold: 0 0 48px oklch(0.82 0.135 78 / 0.18);
}
```

## 8. Motion

```css
:root {
  --ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --d-instant: 100ms;
  --d-quick:   150ms;
  --d-default: 220ms;
  --d-feature: 520ms;
}
```

Signature motion: hero particle drift (continuous, subtle), vaporize tagline (discrete, on trigger), scroll-reveal for index-stamp sections. Respect `prefers-reduced-motion` — disable particle field and vaporize animation, keep layout intact.

## 9. Iconography

```
Family:  Font Awesome (CDN) — current implementation
Stroke:  consistent visual weight, outlined style preferred
Size:    16px / 20px / 24px
Color:   --gold on active/highlight; --muted on passive
```

## 10. Responsive

Test at 375, 768, 1280, and 1440.

- Hero copy must fit first viewport on mobile.
- CTA must remain visible without horizontal scroll.
- Services orbit degrades to a two-column card grid on mobile (no canvas interaction required).
- Touch targets at least 44px.
- Status ticker must not overflow or break layout on 375px.

## 11. Accessibility

- All gold on dark backgrounds must meet WCAG AA contrast (4.5:1 for body, 3:1 for large text). `--gold` oklch(0.82 0.135 78) on `--bg` oklch(0.12 0.012 78) clears AA for large text; verify body-size usage.
- Alt text on all images.
- Canvas elements (`bg.js`) require `aria-hidden="true"` — decorative.
- Keyboard nav on the services orbit: Tab to node, Enter to expand.

## 12. Anti-Pattern Checklist

- [ ] No "Hi, I'm..." as the primary hero.
- [ ] No service claims without proof.
- [ ] No teal or cyan anywhere — those read as Qualia Solutions' brand colour.
- [ ] No purple-blue gradient text as the identity.
- [ ] No identical generic three-card grid without differentiation.
- [ ] No card-on-card nesting.
- [ ] No hidden mobile CTAs.
- [ ] `prefers-reduced-motion` respected.
- [ ] Touch targets at least 44px.
- [ ] WCAG AA contrast verified for all gold-on-dark pairings.
- [ ] No copied Qualia Solutions wording or brand assets.
