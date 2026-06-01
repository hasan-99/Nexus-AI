---
project: "Hasan Services Website"
total_milestones: 3
current_milestone: 1
created: 2026-06-01
---

# Hasan Services Website — Journey

The full arc from kickoff to launch and handoff. Every milestone. Every exit criterion.
This file is the North Star: all planning downstream must stay architecturally consistent with it.

## Mission

Convert Hasan's current personal portfolio into a service-led website that sells AI agents, business automation, web design, SEO, and backend engineering services to small businesses and local operators.

## The Path (3 milestones to handoff)

```
M1 ─── M2 ─── M3 (Handoff)
│
└── [CURRENT]
```

---

## Milestone 1 · Service Positioning Foundation     [CURRENT]

**Why now:** The existing site is centered on Hasan as a person, but the business goal is to sell services and consultations.

**Exit criteria** (what "shipped" means for M1):
- Homepage hero sells services instead of biography.
- Services are packaged around business outcomes.
- Consultation CTA is visible and functional.
- Proof, work, and about sections support trust.
- SEO metadata targets service intent.
- Browser screenshots pass mobile, tablet, and desktop sanity checks.

**Phases:**
1. **Service IA + Copy** — define service-first page structure, hero, CTA, and section copy.
2. **Homepage Visual System** — replace the temporary loud portfolio treatment with a focused premium service-studio design.
3. **Proof, Contact + SEO** — reframe projects as proof, improve contact flow, and update metadata.
4. **Responsive QA** — verify layout, nav, console, links, and screenshots across key widths.

**Requirements covered:** REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006

**Research flags:** Keep Milestone 1 static unless lead capture or CMS becomes a real requirement.

---

## Milestone 2 · Proof + Conversion Depth

**Why now:** Once the homepage direction is correct, deepen the evidence and conversion flow.

**Exit criteria:**
- Projects read like case studies with outcome, service, and technology context.
- Service detail supports visitor decision-making.
- Contact flow decision is made and implemented if needed.
- Analytics or measurement path is documented or added.

**Phases:**
1. **Case Study Reframe** — turn project screenshots into business-result proof.
2. **Service Detail Expansion** — expand each service with fit, process, and next step.
3. **Lead Flow Decision** — decide whether contact remains WhatsApp/email or needs a real form/backend.

**Requirements covered:** REQ-007, REQ-008, REQ-009

---

## Milestone 3 · Handoff     [FINAL]

**Why now:** Production-ready for real visitors and owner maintenance.

**Exit criteria:**
- Production domain returns HTTP 200 and renders the final site.
- Contact routes, assets, SEO files, and key links are verified.
- Maintenance notes explain how to update copy, assets, services, and projects.
- `.planning/archive/` contains milestone verification reports if later milestones are archived.

**Phases (standard for every project):**
1. **Polish** — design pass, responsive, accessibility, empty/error states.
2. **Content + SEO** — real copy, metadata, sitemap, robots, analytics.
3. **Final QA** — full-flow test, cross-browser, edge cases, `/qualia-review`.
4. **Handoff** — maintenance notes, deployment notes, domain/hosting notes, support clause.

**Requirements covered:** REQ-010

---

## Rules for This Journey

1. Hard ceiling: 5 milestones.
2. The final milestone is always Handoff.
3. Milestone 1 is fully detailed and ready for `/qualia-plan 1`.
4. Milestone 2 is sketched; full phase detail gets written when it opens.
5. Exit criteria are observable.

---

*Last updated: 2026-06-01*
