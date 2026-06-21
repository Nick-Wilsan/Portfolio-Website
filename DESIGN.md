---
name: Nick Wilsan — Product Management Portfolio
description: An evidence-first PM portfolio that reads like a case file, not a sales page.
colors:
  paper: "#f6f6f3"
  surface: "#fbfbf9"
  raised: "#ffffff"
  ink: "#121210"
  muted: "#494844"
  faint: "#6b6963"
  line: "#e2e0d8"
  accent: "#2f7a4e"
  accent-ink: "#235e3b"
  accent-soft: "#e2f0e8"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.9rem, 3.6vw, 7rem)"
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  md: "12px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 0 2px 0"
  tag-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  tag-active:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  input-field:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "16px"
  artifact-card:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.md}"
---

# Design System: Nick Wilsan — Product Management Portfolio

## 1. Overview

**Creative North Star: "The Case File"**

This site is built to read like a case file, not a pitch deck: every claim about Nick's process is followed immediately by the artifact that backs it up — a case study, a prioritization call, a piece of written requirements. The design exists to get out of the way of that evidence, not to perform confidence on its behalf.

The palette is near-monochrome paper-and-ink with a single moss-green accent held in reserve, the typography pairs an unhurried serif display against a clean grotesque body, and motion is restrained — entrances that settle the page in, not choreography that competes with the reading. Nothing here should look like it was assembled from a SaaS landing-page kit: no gradient hero text, no uniform icon-grid feature cards, no bento boxes.

**Key Characteristics:**
- Paper-and-ink neutrals with one disciplined accent, never decorative.
- Newsreader serif for display moments, Plus Jakarta Sans for everything functional.
- Flat surfaces; shadow reserved for one signature artifact (the browser-chrome case-study mockup).
- Quiet, settling motion (mask reveals, gentle parallax) — never scroll-jacking choreography.

## 2. Colors

A near-monochrome paper-and-ink system carries the page; moss green is held back and spent only where it earns attention.

### Primary
- **Moss Green** (`#2f7a4e` light / `#5fce8f` dark): the only saturated color in the system. Disciplined, not decorative — reserved for primary CTA hover, active filter tags, the scroll-progress bar, and the italic emphasis word in the hero headline. Its rarity is what makes it land.

### Neutral
- **Paper** (`#f6f6f3` light / `#0c0c0b` dark): page background.
- **Surface** (`#fbfbf9` light / `#151513` dark): alternating section background, used to separate content rhythms (About, Experience, Skills, Contact) from the paper sections without a hard border.
- **Raised** (`#ffffff` light / `#1c1b18` dark): cards, inputs, the case-study mockup — anything that should feel one layer above the page.
- **Ink** (`#121210` light / `#f6f5f0` dark): primary text and primary-button fill.
- **Muted** (`#494844` light / `#b1afa6` dark): body copy and secondary text.
- **Faint** (`#6b6963` light / `#848176` dark): tertiary labels, eyebrow text, placeholder copy. Darkened from the original `#8a887f`/`#6e6c64` after an audit found both failed WCAG AA (~3.3:1); both now clear 5:1 against Paper.
- **Line** (`#e2e0d8` light / `#292823` dark): all borders and dividers.
- **Accent Soft** (`#e2f0e8` light / `#15271d` dark): background fill for active filter tags only.

### Named Rules
**The Rare Green Rule.** Moss green never fills a surface; it marks a single point of attention per view (one CTA, one active tag, one emphasized word). If green is touching more than ~10% of any screen, pull it back.

## 3. Typography

**Display Font:** Newsreader (with Georgia, serif fallback)
**Body Font:** Plus Jakarta Sans (with sans-serif fallback)

**Character:** A measured serif for moments that need weight (the hero claim, section pull-quotes, the wordmark) against a clean, neutral grotesque for everything that needs to be read quickly and scanned — the contrast is deliberate: editorial gravity where it counts, utility everywhere else.

### Hierarchy
- **Display** (medium 500, `clamp(2.75rem, 7vw, 6rem)`, leading 0.96, tracking -0.03em): the hero claim only. One per page. Capped at 6rem (~96px) per the system's heading ceiling.
- **Headline** (medium 500, `clamp(1.9rem, 3.6vw, 3.2rem)`, leading 1.1): section-opening statements (About's pull-quote, case-study summary lines).
- **Title** (medium 500, `1.125rem–1.5rem`): the wordmark, case-study titles, role titles in Experience.
- **Body** (regular 400, `1rem`, leading 1.6, max 65–75ch): all paragraph copy. Always set in Muted, never Faint.
- **Label** (medium 500, `0.75rem`, tracking 0.12em, uppercase): hero-fact labels, section eyebrows, browser-chrome status text.

### Named Rules
**The Display-Once Rule.** The largest display size appears exactly once per page, in the hero. Every other heading steps down at least one tier so the hero claim keeps its weight.

## 4. Elevation

Flat by default. The page reads as a stack of paper-and-ink panels with no ambient shadow anywhere — section separation comes from the Paper/Surface background swap and `border-line` hairlines, not elevation. The one exception is the case-study artifact card, which gets a soft, wide shadow to read as a screenshot lifted off the desk rather than a UI panel.

### Shadow Vocabulary
- **artifact** (`box-shadow: 0 24px 60px -26px rgba(0,0,0,0.5)`): the browser-chrome case-study mockup only. Wide, soft, dark — implies a physical object resting above the page, not a hovering UI card.

### Named Rules
**The One Shadow Rule.** Exactly one shadow value exists in the system, reserved for the case-study artifact. Buttons, tags, inputs, and nav stay flat with borders or fills, never shadows.

## 5. Components

### Buttons
- **Shape:** fully rounded (`rounded-full`, 9999px) for primary actions; no radius (text + underline) for secondary actions.
- **Primary:** Ink background, Paper text, `14px 28px` padding, medium weight label.
- **Hover / Focus:** background shifts to Moss Green; icon (if present) nudges right 2px on hover.
- **Ghost / Secondary:** no fill, Ink text with a Line-colored bottom border that shifts to Accent on hover — used for lower-emphasis actions like "Get in touch."

### Chips / Tags
- **Style:** fully rounded, `4px 12px` padding, `0.75rem` label type.
- **State — inactive:** transparent background, Line border, Muted text.
- **State — active:** Accent Soft background, Accent Ink text, no border.

### Cards / Artifact Mockup
- **Corner Style:** `12px` radius (the system's only non-full, non-zero radius).
- **Background:** Raised, with a `1px` Line border.
- **Shadow Strategy:** the artifact shadow from Elevation — the only card in the system that gets one.
- **Signature detail:** a browser-chrome header bar (three Line-colored dots, `1px` Line border-bottom) that frames case-study screenshots as a literal browser window, reinforcing "this is a real artifact, not a mockup."

### Inputs / Fields
- **Style:** Raised background, `1px` Line border, `8px` radius, `16px` internal padding.
- **Focus:** border shifts to Accent plus a 1px Accent focus ring — no glow, no shadow.

### Navigation
- Sticky top bar at the Paper background; wordmark in Display type, nav links in Body type at Muted, shifting to Ink on hover. Mobile collapses into a full-width Line-bordered dropdown panel beneath the bar, same type treatment, no slide-in drawer.

## 6. Do's and Don'ts

### Do:
- **Do** keep Moss Green to a single point of attention per view (CTA hover, one active tag, one emphasis word) — see The Rare Green Rule.
- **Do** pair every process claim with a concrete artifact or number; this is the visual expression of "show, don't tell" from PRODUCT.md.
- **Do** use the Paper/Surface background swap and Line hairlines for section rhythm instead of cards or shadows.
- **Do** respect `prefers-reduced-motion` on every reveal, parallax, or count-up animation — no exceptions.

### Don't:
- **Don't** introduce gradient hero text, uniform icon-grid feature cards, or bento-box layouts — the generic SaaS/startup template look PRODUCT.md explicitly rejects.
- **Don't** add a second saturated color. This system has exactly one accent; a second competes with it and breaks The Rare Green Rule.
- **Don't** add shadows to buttons, tags, inputs, or nav. The artifact card is the only element allowed a shadow.
- **Don't** use a face photo anywhere in the system — PRODUCT.md's person-first principle keeps the focus on the work, not a portrait.
- **Don't** stack a tiny uppercase eyebrow above every section as default scaffolding; this system already uses numbered section heads (01, 02...) deliberately and consistently — don't layer a second labeling convention on top.
