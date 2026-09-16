---
name: design-taste
description: Teach AI agents design taste to produce distinctive, professional UIs.
---

# Design Taste

You are now operating with the Design Taste framework. Your goal: produce frontend work that looks like a skilled designer made deliberate choices, not an AI following defaults.

## Core Philosophy
- Every design decision must be a choice, not a default
- If a decision would be the same regardless of the project's subject matter, it's wrong
- Spend your boldness in one place — one memorable element, quiet discipline everywhere else
- Before writing any code, state your design plan: what's the one thing this page will be remembered for?

## The Anti-Pattern List (NEVER do these)

### Typography antipatterns
1. Inter, system-ui, or any default sans-serif without an explicit stylistic reason
2. Accenting a single word in a headline with italic/bold/color
3. ALL CAPS for labels, eyebrows, or metadata
4. Monospace for data labels when the rest of the page isn't monospace
5. Tracked-out (letter-spacing > 0.1em) labels above headings

### Color antipatterns
6. Purple-to-indigo gradients on dark backgrounds (the #1 AI tell)
7. Warm cream (#F4F1EA or similar) as default background
8. Terracotta (#D97757) as accent on cream backgrounds
9. The same border-radius on every element regardless of hierarchy
10. Identical box-shadow (rgba(0,0,0,.1)) on every card

### Layout antipatterns
11. Cards nested inside cards (card > card > card)
12. Fade-and-slide-up entrance on every section
13. Numbered markers (01/02/03) on content that isn't a sequence
14. Meta strings joined with middle dots ('A · B · C')
15. Labels formatted as 'WORD — fragment' with spaced em dashes
16. '→' appended to every link and button text
17. Template chrome that appears regardless of subject (eyebrow + heading + subtitle + CTA stack)

## The Design Vocabulary

When you design, you must make EXPLICIT choices about:

### Typography
- Choose a typeface because it fits the SUBJECT, not because it's available
- One family or two; if two, make them clearly distinct (not two similar sans-serifs)
- Set a deliberate type scale: heading sizes must be proportionally related (1.25 or 1.333 ratio)
- Line length: ≤80 characters for body text
- Serif body text gets slightly more line-height than sans-serif

### Color (use OKLCH for palette construction)
- Build palettes in OKLCH, not hex — perceptual uniformity prevents muddy blends
- Core palette: 4-6 colors maximum
- Every color has a job: primary, surface, text, accent, border
- Test every text/background pair for WCAG AA (4.5:1)
- Saturated colors for interactive elements only; neutrals for surfaces

### Spacing
- Use a spatial scale: 4px base, multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64, 96)
- More space around important elements, less around related ones
- Section spacing should be proportional to content importance
- Never use identical padding on everything

### Motion
- Animate transform and opacity only (GPU-composited)
- One orchestrated entrance sequence per page, not per section
- Hover effects: 150-200ms. Modal open: 200-300ms. Page transitions: 300-500ms
- Always wrap animations in @media (prefers-reduced-motion: no-preference)
- Never animate width, height, or layout-inducing properties

### UX Writing
- CTA says exactly what happens: "Save changes" not "Submit"
- Same action, same name through the whole flow
- Empty states are invitations, not apologies
- Errors explain what happened and how to fix it — no "Something went wrong"
- Sentence case for all UI labels
- No filler words ("please", "just", "simply")

## Commands

This skill supports three commands — invoke them by name:

### /audit
Scan the current codebase for anti-patterns. Check every file in the project against the anti-pattern list above. Output a report: file, line, antipattern found, severity (error/warning).

### /critique
Perform a UX/design review of the current UI. Evaluate: visual hierarchy, typography choices, color harmony, spacing consistency, motion appropriateness, copy quality. Give a score out of 10 and 3-5 specific improvements.

### /polish
Take an existing UI and elevate it. Apply the Design Vocabulary section to the current code: fix type scale, tune spacing, replace generic colors with OKLCH-derived palette, add purposeful motion, refine copy. Output before/after summary of every change.

## Process

1. Before writing code: state your design plan in 2-3 sentences. What's the subject? Who's the audience? What's the one memorable thing?
2. Build the token system first: colors (in OKLCH), typefaces, type scale, spacing scale.
3. Write HTML/CSS/JSX/TSX following the token system exactly.
4. Self-audit: scan your output for every anti-pattern above. Remove any you find.
5. Verify: check contrast ratios, focus states, reduced motion, responsive breakpoints.

## Reference Files

When you need deeper guidance on a specific topic, read the reference:
- `references/typography.md` — Font selection, pairing, scale construction
- `references/color.md` — OKLCH color system, palette building, contrast
- `references/spacing.md` — Spatial systems, rhythm, layout composition
- `references/motion.md` — Animation principles, easing, performance
- `references/ux-writing.md` — Copy patterns, voice, error messages
- `references/anti-patterns.md` — Complete catalog of AI design tells with examples