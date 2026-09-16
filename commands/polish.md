# /polish — Design Elevation

Takes existing UI code and elevates it by applying the Design Taste vocabulary.

## Usage
```
/polish                # polish the current page
/polish src/Hero.tsx   # polish a specific component
```

## What It Does
1. **Type Scale** — Replaces arbitrary font sizes with a modular scale
2. **Color System** — Converts hex colors to an OKLCH-derived palette with proper contrast
3. **Spacing** — Normalizes all padding/margin/gap to the 4px spatial scale
4. **Motion** — Adds purposeful hover transitions, wraps in prefers-reduced-motion
5. **Copy** — Refines CTAs, error messages, and labels for clarity and consistency

## Output Format
```
Polished 3 files (12 changes):

src/index.css:
  • Replaced font-family: Inter → "DM Serif Display" (headings) + "Work Sans" (body)
  • Replaced purple gradient → OKLCH palette (L:0.55 C:0.15 H:265 → L:0.35 C:0.22 H:280)
  • Normalized spacing: 2rem, 3rem, 2.5rem → 2rem, 4rem, 2rem (spatial scale)

src/Hero.tsx:
  • Removed eyebrow label + ALL CAPS → sentence case heading
  • Added entrance animation (opacity+fade-up, 400ms, grouped with stagger)
  • Changed CTA "Submit" → "Start free trial"

src/Card.tsx:
  • Replaced card > card > card → flat card with section dividers
  • Removed identical box-shadow → shadow scale (sm/md/lg)
  • Changed border-radius from uniform 8px → hierarchical (4px buttons, 8px cards, 16px modals)

---
Before: Generic AI SaaS look (Inter, purple gradient, card nesting, cream bg)
After:  Distinctive design with deliberate type, OKLCH palette, spatial rhythm
```