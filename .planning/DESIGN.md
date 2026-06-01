# DESIGN — Hasan Services Website

> Visual contract for `portfolio3`. Every Qualia agent reads this before frontend work.

## 1. Direction

```
Aesthetic direction:  sci-fi service studio
Color strategy:       Committed
Scene sentence:       A small-business owner checks the site at night after closing, looking for someone who can automate calls, leads, web presence, and backend workflows without enterprise overhead.
Differentiation:      A premium Cyprus-based AI/web service studio with a glowing technical atmosphere and direct conversion path.
```

## 2. Color (OKLCH-first)

CSS in this legacy static site may still contain existing hex values until refactored, but new design tokens should use OKLCH.

```css
:root {
  --bg:        oklch(0.145 0.018 190);
  --bg-2:      oklch(0.19 0.020 190);
  --surface:   oklch(0.235 0.020 190);
  --surface-2: oklch(0.28 0.020 190);

  --text:      oklch(0.94 0.008 190);
  --muted:     oklch(0.72 0.014 190);
  --dim:       oklch(0.56 0.014 190);

  --line:      oklch(0.34 0.018 190);
  --line-soft: oklch(0.28 0.014 190);

  --accent:    oklch(0.78 0.17 178);
  --accent-2:  oklch(0.68 0.15 178);
  --accent-bg: oklch(0.78 0.17 178 / 0.16);

  --warm:      oklch(0.78 0.12 72);
  --rose:      oklch(0.70 0.17 350);
}
```

### Accent Rules

- Teal/cyan is the primary action color.
- Warm gold is used sparingly for Cyprus/local credibility and premium highlights.
- Avoid generic purple-blue gradient text as the main identity.

## 3. Typography

```
Display:  Archivo Black — heavy display for short hero/section statements
Body:     Manrope or Satoshi — refined service copy
Mono:     JetBrains Mono — tiny technical labels only
```

Current implementation temporarily uses Archivo Black and Space Grotesk; replace Space Grotesk in the next visual cleanup to meet this contract.

## 4. Spacing

Use an 8px grid with fluid page padding.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --pad-x: clamp(1rem, 5vw, 5rem);
  --pad-section: clamp(3rem, 8vw, 7rem);
}
```

## 5. Components

### Navigation
- Floating dark pill on desktop.
- Clear active state.
- CTA always visible as "Book Consultation" or "Get a Consultation."

### Buttons
- Primary: teal fill, dark text, rounded pill, 44px minimum height.
- Secondary: transparent/dark surface, thin line, muted text.
- Avoid "Learn More"; use specific verbs like "See Services", "Book Consultation", "View Work".

### Service Cards
- Outcome-led title.
- 1-line service description.
- Short list of workflows solved.
- One CTA per service card maximum.

### Proof Blocks
- Use project screenshots or result statements.
- Avoid decorative cards without evidence.

## 6. Depth & Elevation

Use atmospheric glow behind hero and services, not random card shadows.

```css
:root {
  --elev-1: 0 1px 2px oklch(0.10 0.02 190 / 0.18);
  --elev-2: 0 8px 24px oklch(0.10 0.02 190 / 0.24);
  --elev-3: 0 24px 80px oklch(0.10 0.03 190 / 0.38);
}
```

## 7. Motion

```css
:root {
  --ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --d-instant: 100ms;
  --d-quick: 150ms;
  --d-default: 220ms;
  --d-feature: 520ms;
}
```

Signature motion: subtle loading/hero reveal and magnetic CTA hover. Respect `prefers-reduced-motion`.

## 8. Iconography

```
Family:   Font Awesome currently; migrate to one clean line icon family if framework changes.
Stroke:   consistent visual weight
Size:     16px / 20px / 24px
```

## 9. Responsive

Test at 375, 768, 1280, and 1440.

- Hero copy must fit first viewport on mobile.
- CTA must remain visible without horizontal scroll.
- Service cards become a single column on mobile.
- Touch targets at least 44px.

## 10. Anti-Pattern Checklist

- [ ] No "Hi, I'm..." as the primary hero.
- [ ] No service claims without proof.
- [ ] No copied Qualia Solutions wording or brand assets.
- [ ] No purple-blue gradient text as the identity.
- [ ] No identical generic three-card grid without differentiation.
- [ ] No card-on-card nesting.
- [ ] No hidden mobile CTAs.
- [ ] `prefers-reduced-motion` respected.
- [ ] Touch targets at least 44px.
- [ ] WCAG AA contrast verified.

