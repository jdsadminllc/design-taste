# Typography

Type is the single largest design decision you make. It touches every element —
headings, body copy, labels, buttons, data — and it communicates more about the
design's intent than any other choice. This document covers how to choose, pair,
scale, and load typefaces deliberately.

---

## Choosing a Typeface

The question is not "what fonts are available?" The question is "what should
this feel like?"

### By subject matter

| Subject | Type Direction | Examples |
|---------|---------------|----------|
| Editorial, journalism, long-form reading | Serif: warmth, authority, tradition | Source Serif 4, Lora, Spectral, Georgia |
| Legal, financial, institutional | Serif or humanist sans: trust, stability | IBM Plex Serif, Public Sans, Noto Serif |
| SaaS, developer tools, technical docs | Sans: clarity, precision, neutrality | Inter (deliberately), IBM Plex Sans, SF Pro |
| Healthcare, public services | Humanist sans: accessible, warm-neutral | Atkinson Hyperlegible, Fira Sans, Noto Sans |
| Luxury, fashion, high-end | Didone or geometric serif: elegance, aspiration | Cormorant Garamond, Playfair Display, Bodoni Moda |
| Kids, education, playful | Rounded sans or friendly serif: approachable | Nunito, Fredoka, Quicksand |
| Creative, portfolio, artistic | Display or distinctive sans: personality | Space Grotesk, DM Sans, Syne |

### How NOT to choose

Do not default to Inter because it's the Figma default. Do not default to
`system-ui` because it's easy. A typeface is a design decision, not a technical
setting. When you open a new project and immediately type `font-family: Inter`,
you have skipped the most important design decision in the project.

### Practical checklist

1. Define the emotional target (trustworthy? playful? serious? warm?)
2. Pick 3–5 candidates that serve that target
3. Test each at body size (16px) with real content, not lorem ipsum
4. Test each at display size (48px+) for headings
5. Pick one. One typeface for the entire project.

---

## Font Pairing

The safest pairing rule in typography: pair a serif with a sans-serif. Don't
pair two similar sans-serifs. Don't pair two similar serifs.

### Why serif + sans works

Serif and sans-serif have fundamentally different letter constructions. The
serifs create horizontal rhythm; the sans-serif creates vertical clarity. When
paired, the contrast is architectural — your eye registers "different family"
without thinking about it. When you pair two sans-serifs (say, Inter headings +
DM Sans body), the difference is too subtle: the reader's subconscious registers
"something is off" but can't identify what.

### Good pairings

| Heading | Body | Works For |
|---------|------|-----------|
| Playfair Display (serif) | Source Sans 3 (sans) | Editorial, luxury, lifestyle |
| DM Serif Display (serif) | DM Sans (sans) | Perfect optical match, same designer |
| IBM Plex Serif (serif) | IBM Plex Sans (sans) | Technical, trustworthy, same family |
| Space Grotesk (sans) | Lora (serif) | Reverse pair: modern heading, warm body |
| Fraunces (soft serif) | Inter (sans) | Warm brand, approachable but polished |
| Newsreader (serif) | Public Sans (sans) | Journalism, government, long-form |

### Bad pairings (and why)

| Heading | Body | Problem |
|---------|------|---------|
| Inter | Open Sans | Two neutral sans-serifs — neither has personality, the contrast is invisible |
| Roboto | Lato | Similar x-height, similar weight, they fight for attention |
| Montserrat | Poppins | Both geometric sans, nearly identical construction |
| Georgia | Times New Roman | Two transitional serifs — reads as a fallback failure |
| Helvetica | Arial | These are the same font to anyone who isn't a type designer |

### The one-font approach

Better than a bad pairing: use one typeface and vary weight and size. A single
well-chosen typeface at Regular (400) for body, Medium (500) for labels, and
Bold (700) for headings creates more visual structure than two similar fonts
ever will.

---

## Type Scale

A type scale is not a list of sizes you like. It's a mathematical progression
that ensures every size relationship is intentional.

### Modular scales

Start with a base size (16px for body) and a ratio. Multiply or divide by the
ratio to get each step.

| Ratio | Name | Scale (px) | Best For |
|-------|------|------------|----------|
| 1.25 | Major Third | 16, 20, 25, 31.25, 39, 48.8, 61 | Tight, information-dense layouts |
| 1.333 | Perfect Fourth | 16, 21.3, 28.4, 37.9, 50.5, 67.3 | General web — the go-to |
| 1.5 | Perfect Fifth | 16, 24, 36, 54, 81 | Bold, dramatic, hero-driven |

### The 1.333 scale in practice

```
--text-xs:    0.75rem;   /* 12px — captions, fine print */
--text-sm:    0.875rem;  /* 14px — labels, metadata */
--text-base:  1rem;      /* 16px — body copy */
--text-md:    1.188rem;  /* 19px — large body, intro paragraphs */
--text-lg:    1.333rem;  /* 21.3px — h4 */
--text-xl:    1.777rem;  /* 28.4px — h3 */
--text-2xl:   2.369rem;  /* 37.9px — h2 */
--text-3xl:   3.157rem;  /* 50.5px — h1 */
--text-4xl:   4.209rem;  /* 67.3px — hero, display */
```

### How to derive sizes

1. Set `--text-base: 1rem` (16px)
2. Pick a ratio (1.333 is the safest — it's been used since the Renaissance)
3. Multiply up for headings: `base * ratio^n`
4. Divide down for captions: `base / ratio^n`
5. Round to 3 decimal places in rem, or nearest integer in px

Don't invent sizes. If you need 18px for body text, go to 19px (the scale) or
stay at 16px. Fudging breaks the proportional relationships that make the
scale feel cohesive.

### CSS implementation

```css
:root {
  --text-xs:    0.75rem;
  --text-sm:    0.875rem;
  --text-base:  1rem;
  --text-md:    1.125rem;
  --text-lg:    1.333rem;
  --text-xl:    1.777rem;
  --text-2xl:   2.369rem;
  --text-3xl:   3.157rem;
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
h4 { font-size: var(--text-lg); }
body { font-size: var(--text-base); }
small, caption { font-size: var(--text-sm); }
```

---

## Line Length

Body text should never exceed 80 characters per line. Here's why it matters.

### The science

When the eye reaches the end of a line, it must jump back to the start of the
next line. The longer the line, the harder that jump is to execute accurately.
At 80+ characters, the error rate increases — readers start re-reading the same
line or skipping lines. At 100+ characters, readers lose their place roughly 20%
of the time.

This isn't aesthetic preference. It's a physical constraint of the human visual
system, documented in typography manuals since the 16th century and verified by
modern eye-tracking studies.

### Implementation

```css
/* The 65ch rule — 65 characters is the sweet spot for reading comfort */
article, .prose, .long-form {
  max-width: 65ch;
}

/* For larger type, go narrower — the eye covers fewer characters comfortably */
.text-lg {
  max-width: 55ch;
}

/* Sidebar, small text, can go narrower */
.sidebar {
  max-width: 45ch;
}
```

### When to break the rule

Short-form content (labels, CTAs, navigation) doesn't need the 65ch limit.
Captions under images can run wider because the eye is anchored by the image.
Data tables need the width they need — don't constrain them.

---

## Line Height

Line height (`line-height` in CSS, "leading" in typography) controls the
vertical space between lines of text. It's the second most important spacing
decision after font size.

### Defaults that work

| Element | line-height | Why |
|---------|------------|-----|
| Body text | 1.5 | Optimal for reading comfort at 16px. Less feels cramped; more feels loose. |
| Headings | 1.2 | Headings are short — they don't need extra vertical space. 1.5 on a heading makes it float in space. |
| Code blocks | 1.6 | Monospace needs more vertical breathing room. |
| Small labels | 1.3 | Small text needs proportionally less leading. |
| Button text | 1 | Single-line, should be vertically centered by the button, not by line-height. |

### The unitless rule

Always use unitless `line-height` (e.g., `1.5`, not `1.5em` or `150%`). Unitless
values inherit as a multiplier: a child with `font-size: 24px` gets `line-height:
36px`. Percentage and em values compute at the parent and pass down a fixed
pixel value, which breaks when font sizes change.

```css
/* GOOD — unitless, inherits as multiplier */
body { line-height: 1.5; }

/* BAD — percentage, computes to a fixed pixel value at the parent */
body { line-height: 150%; }
```

---

## Web Font Loading

How you load fonts affects perceived performance. A slow font load is a broken
design for the first 2–3 seconds.

### font-display: swap

Always set `font-display: swap` on web fonts. This tells the browser to render
text immediately in a fallback font, then swap to the web font when it loads.
Without it, the browser hides text until the font arrives (FOIT — Flash of
Invisible Text), which kills perceived performance.

```css
@font-face {
  font-family: "Source Serif 4";
  src: url("/fonts/source-serif-4.woff2") format("woff2");
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}
```

### Subsetting

If you're serving a font with extended character sets (Cyrillic, Greek, CJK),
subset it to the characters you actually need. Full character sets can be 400KB+
per weight. Latin-only subsets are typically 20–50KB.

Use `unicode-range` to tell the browser which font file covers which characters:

```css
@font-face {
  font-family: "Source Serif 4";
  src: url("/fonts/source-serif-4-latin.woff2") format("woff2");
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                 U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
```

### Variable fonts

If available, use the variable font version instead of loading multiple
individual weight files. One variable font file covers all weights, widths, and
styles.

```css
@font-face {
  font-family: "Source Serif 4";
  src: url("/fonts/source-serif-4-variable.woff2") format("woff2-variations");
  font-display: swap;
  font-weight: 200 900; /* range of weights available */
  font-style: normal;
}

body {
  font-family: "Source Serif 4", Georgia, serif;
  font-weight: 400;
  font-variation-settings: "opsz" 16; /* optical size */
}
```

### Fallback stack

Always include a fallback stack. Your web font will fail to load for some
percentage of users — slow connections, ad blockers, CDN outages. The fallback
should be a locally-installed font that matches the visual character of your
primary typeface.

```
/* Serif stack */
font-family: "Source Serif 4", Georgia, "Times New Roman", serif;

/* Sans-serif stack */
font-family: "Inter", "SF Pro Text", -apple-system, "Segoe UI", sans-serif;

/* Monospace stack */
font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", monospace;
```

---

## Real Examples

### Good: Editorial site

```
Typeface: Source Serif 4 (serif only)
Scale: 1.333 (Perfect Fourth)
Body: 18px, line-height 1.6, max-width 65ch
Headings: weight 600 (semi-bold), tracking -0.01em
Why: One typeface, varied by weight. The serif carries the entire design.
```

### Good: SaaS dashboard

```
Typeface: Inter (sans only)
Scale: 1.25 (Major Third)
Body: 14px, line-height 1.5
Headings: weight 600
Data: tabular-nums
Why: Dense data needs a tight scale and clean sans-serif. Inter was chosen
deliberately for its legibility at small sizes and its tabular figures.
```

### Good: Brand marketing site

```
Typeface: Fraunces (headings) + Inter (body)
Scale: 1.333 (Perfect Fourth)
Headings: Fraunces, weight 700, optical size 36+
Body: Inter, 16px, line-height 1.6
Why: Serif + sans pairing. Fraunces brings warmth and personality to
headings. Inter provides clean, readable body text. The contrast is obvious
and intentional.
```

### Bad: Generic startup landing page

```
Typeface: Inter (headings) + system-ui (body)
Scale: random sizes (14, 16, 18, 20, 24, 32, 48 — no ratio)
Body: 16px, line-height 1.5
Headings: weight 700, letter-spacing -0.02em
Why: Default typeface, no pairing decision, no scale math. Feels like every
other startup page because it uses the same type choices as every other
startup page.
```

---

## Quick Reference

| Decision | Default Answer | When to Change |
|----------|---------------|----------------|
| Typeface | Don't default. Choose. | — |
| Pairing | One typeface | If you need contrast, serif + sans |
| Base size | 16px (1rem) | 18px for editorial, 14px for data-dense |
| Scale ratio | 1.333 | 1.25 for dense, 1.5 for dramatic |
| Line length | 65ch max | 55ch for large type |
| Body line-height | 1.5 | 1.6 for long-form reading |
| Heading line-height | 1.2 | 1.3 if headings wrap |
| Loading strategy | font-display: swap | Always |
| Variable fonts | Use if available | — |
| Fallback | Match visual category | — |