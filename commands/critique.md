# /critique — Design Review

Performs a UX/design review of the current UI and scores it out of 10.

## Usage
```
/critique              # review the page currently open
/critique src/Hero.tsx # review a specific component
```

## What It Evaluates
1. **Visual Hierarchy** (0-2 pts) — Can you tell what matters most at a glance?
2. **Typography** (0-2 pts) — Are type choices deliberate and harmonious?
3. **Color** (0-2 pts) — Is the palette intentional and accessible?
4. **Spacing** (0-2 pts) — Does the spatial rhythm feel professional?
5. **Motion** (0-1 pt) — Is animation purposeful and performant?
6. **Copy** (0-1 pt) — Is the writing clear, consistent, and human?

## Output Format
```
Design Review: 6/10

✅ Visual Hierarchy (2/2) — Clear focal point, strong CTA placement
⚠️  Typography (1/2) — Inter is generic; choose a typeface for this subject
❌  Color (0/2) — Purple gradient and cream background are classic AI tells
⚠️  Spacing (1/2) — Inconsistent section padding (2rem, 3rem, 2.5rem)
✅  Motion (1/1) — Subtle hover transitions, respects reduced motion
⚠️  Copy (1/1) — Good CTA naming, but error messages are generic

Top 3 improvements:
1. Replace Inter with a typeface that matches the subject (try DM Serif Display for headings)
2. Build an OKLCH palette instead of the purple gradient — start with L:0.55 C:0.15 H:265
3. Standardize section padding to the spatial scale (use 4rem for major sections)
```