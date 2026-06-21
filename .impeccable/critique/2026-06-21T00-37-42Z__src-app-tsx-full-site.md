---
target: src/App.tsx (full site)
total_score: 27
p0_count: 0
p1_count: 2
timestamp: 2026-06-21T00-37-42Z
slug: src-app-tsx-full-site
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Submitting the contact form gives zero in-page feedback — the browser silently leaves the portfolio for Formspree's domain. |
| 2 | Match System / Real World | 4 | Plain, accurate PM language throughout; no jargon. |
| 3 | User Control and Freedom | 3 | Mobile nav closes cleanly; no recovery path once the contact form redirects off-site. |
| 4 | Consistency and Standards | 3 | Live code is internally consistent, but the embedded case-study screenshot uses a different visual language than the real site. |
| 5 | Error Prevention | 2 | Required field exists, but no inline validation and no confirmation before navigating off-domain. |
| 6 | Recognition Rather Than Recall | 4 | Clear text nav, icons always paired with labels. |
| 7 | Flexibility and Efficiency | 2 | Single linear path, no shortcuts — acceptable for a portfolio's scope. |
| 8 | Aesthetic and Minimalist Design | 4 | Real restraint: the green accent rule is respected everywhere in live code; generous, intentional whitespace. |
| 9 | Error Recovery | 1 | No visible error states anywhere; a failed submit gives the user nothing. |
| 10 | Help and Documentation | 2 | N/A-heavy by register, but acceptable — the case studies double as process documentation. |
| **Total** | | **27/40** | **Acceptable — solid foundation, a few real gaps before it's recruiter-ready** |

## Anti-Patterns Verdict

**Does this look AI-generated?** No. The numbered section heads (01, 02, 03...) are a deliberate, real sequence (About -> Work -> Experience), not reflexive eyebrow scaffolding. The single moss-green accent is genuinely rare and disciplined, not decorative.

**LLM assessment**: The live code is clean. `/work/prd-02.png`, the screenshot framed inside the browser-chrome mockup on the homepage Work card, shows stat boxes with a thick colored left border — the "side-stripe border" pattern this skill's absolute bans list calls out. It's baked into a static image, so it needs a fresh screenshot of the actual (compliant) case-study page.

**Deterministic scan**: `detect.mjs` found 1 issue scanning `src/`:
- `border-accent-on-rounded` in src/pages/TravelWiseCase.tsx:518 — `border-t-2 border-red-400` on a `rounded-lg` card in the "Current journey: where it breaks" pain-point grid. Same family as the side-stripe ban, just on the top edge.

**Browser console**: two issues the static scan couldn't catch:
- `issue`: "No label associated with a form field" — the contact `<textarea>` (App.tsx:934-943) has a visible `<label>` but no `htmlFor`/`id` pairing.
- `404`: `/favicon.ico` is missing.

## Overall Impression

The live site is well-built and on-brand. The gap is the moment that matters most: the contact form is a bare HTML POST straight to Formspree with no JS handling, so clicking "Send message" yanks the recruiter off Nick's domain with zero confirmation.

## What's Working

- The Rare Green Rule holds in practice across every section checked in the browser.
- Numbered section heads are real voice (an actual sequence), not AI grammar.
- Mobile holds up cleanly at 390px: no overflow, comfortable touch targets, legible hamburger menu.

## Priority Issues

**[P1] Contact form silently redirects off-site with no feedback**
- Why it matters: the page's one conversion action has no loading state, no success message, no error handling.
- Fix: intercept submit with fetch/AJAX to Formspree, show an inline success/error state.
- Suggested command: /impeccable harden contact form

**[P1] Contact textarea label not programmatically associated**
- Why it matters: confirmed via console; a screen-reader user hears nothing about the field's purpose. Conflicts with PRODUCT.md's stated WCAG AA requirement.
- Fix: add matching id/htmlFor between App.tsx:934 and App.tsx:937.
- Suggested command: /impeccable audit contact

**[P2] Work-card screenshot uses the banned side-stripe pattern, inconsistent with the live site**
- Why it matters: /work/prd-02.png is the first visual of the TravelWise case study and doesn't match the actual (compliant) live page.
- Fix: recapture the screenshot from the current case-study page.
- Suggested command: /impeccable polish work section

**[P2] border-t-2 border-red-400 on a rounded card in the case study**
- Why it matters: same family as the side-stripe ban, flagged by the deterministic scan.
- Fix: replace the top-border accent with a full tinted background, consistent with the existing Callout component.
- Suggested command: /impeccable polish travelwise case study

**[P2] Large empty right column on wide desktop viewports**
- Why it matters: at 1440px, hero and other sections leave roughly half the viewport empty with no counterbalancing element, reading as unfinished rather than intentional.
- Fix: cap section max-width more deliberately with a counterweight, or use the space for something quiet and on-brand.
- Suggested command: /impeccable layout hero

## Persona Red Flags

**Jordan (First-Timer recruiter)**: clicks "Send message," page navigates away entirely with no confirmation it worked.

**Sam (Accessibility-dependent)**: tabs to the message field and hears no label, just an empty control.

## Minor Observations

- favicon.ico 404s.
- "HOW I WORK" eyebrow above the four-step process is the only uppercase tracked kicker on the page; single instance, reads as deliberate rather than scaffolding.

## Questions to Consider

- What does a recruiter see if Formspree is briefly down? Has that path been tested?
- Is the empty right rail on desktop a considered choice, or just what max-w-4xl happened to produce?
