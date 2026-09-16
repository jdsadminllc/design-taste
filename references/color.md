# Color

Color decisions are the most subjective part of design and the easiest to get
wrong. A systematic approach — using OKLCH as the color space and a structured
palette as the output — removes the guesswork.

---

## Why OKLCH

OKLCH is a perceptually uniform color space. That means: equal numeric
differences look like equal visual differences. sRGB and HSL do not have this
property — a change of 10 in lightness can look subtle in yellows and dramatic
in blues.

### The axes

| Axis | Range | What It Controls |
|------|-------|-----------------|
| **L** (Lightness) | 0–1, or 0%–100% in CSS | How light/dark the color is. Perceptually uniform: 0.5 always looks like mid-gray. |
| **C** (Chroma) | 0–0.4 (practical max varies by hue) | Color intensity. 0 = gray, higher = more saturated. |
| **H** (Hue) | 0–360 | The color wheel angle: 0=red, 90=yellow, 180=green, 270=blue. |

### Why OKLCH beats HSL

```
/* HSL: same lightness, dramatically different perceived brightness */
hsl(240, 100%, 50%)  /* Blue  — looks dark */
hsl(60, 100%, 50%)   /* Yellow — looks bright */

/* OKLCH: same lightness, same perceived brightness */
oklch(50% 0.2 240)   /* Blue  — looks mid */
oklch(50% 0.2 60)    /* Yellow — looks mid */
```

### Practical implications

1. **Accessibility:** When L values match, perceived contrast is predictable.
   You can check WCAG contrast by comparing L values — a 0.5 difference in L
   roughly corresponds to 4.5:1 contrast for most hues.

2. **Gradients:** Interpolating in OKLCH avoids the gray dead zone that HSL
   gradients create. A blue-to-yellow gradient in HSL passes through gray; in
   OKLCH, it passes through actual intermediate colors.

3. **Palette construction:** You can change lightness and chroma independently
   of hue, which makes systematic palette generation possible.

### Browser support

OKLCH is supported in all modern browsers (Chrome 111+, Firefox 113+, Safari
15.4+). For older browsers, include a fallback in your build step.

```css
:root {
  /* OKLCH with sRGB fallback */
  --color-primary: #2563EB;
  --color-primary: oklch(55% 0.22 260);
}
```

---

## Building a Palette

### The method

1. **Pick a hue** based on what the color means: 220–260 for trust (blue), 0–20
   for energy (red), 120–160 for growth (green), 40–60 for warmth (yellow/amber).

2. **Set lightness** for the base color: 55–65% for a medium primary, 85–95%
   for surfaces, 15–25% for text.

3. **Set chroma** to control saturation: 0.15–0.25 for a primary color,
   0.05–0.1 for backgrounds and borders, 0 for neutral grays.

4. **Build the palette** by varying lightness while keeping hue and chroma
   stable (for neutrals) or adjusting chroma proportionally (for the primary).

### The 6-color core palette

Every design needs at minimum these six color roles:

| Role | OKLCH Range | What It Does |
|------|------------|--------------|
| **Primary** | L: 50–65%, C: 0.15–0.25, H: brand hue | Buttons, links, active states, brand presence |
| **Surface** | L: 95–100%, C: 0, H: any | Page background, card backgrounds in light mode |
| **Text** | L: 10–25%, C: 0, H: any | Body copy, headings, primary content |
| **Accent** | L: 55–70%, C: 0.15–0.25, H: complement to primary | Highlights, notifications, secondary actions |
| **Border** | L: 80–90%, C: 0.02, H: matches surface | Dividers, input borders, card edges |
| **Background** | L: 95–100%, C: 0–0.02, H: any | Page-level background (may differ from surface) |

### CSS custom properties pattern

```css
:root {
  /* Primary — blue brand */
  --color-primary:        oklch(55% 0.22 255);
  --color-primary-hover:  oklch(60% 0.22 255);
  --color-primary-active: oklch(50% 0.22 255);
  --color-primary-muted:  oklch(90% 0.05 255);

  /* Surface */
  --color-surface:        oklch(100% 0 0);
  --color-surface-raised: oklch(98% 0 0);
  --color-surface-sunken: oklch(95% 0 0);

  /* Text */
  --color-text:           oklch(20% 0 0);
  --color-text-muted:     oklch(45% 0 0);
  --color-text-subtle:    oklch(65% 0 0);
  --color-text-inverse:   oklch(100% 0 0);

  /* Accent — amber/orange */
  --color-accent:         oklch(65% 0.18 80);
  --color-accent-hover:   oklch(70% 0.18 80);

  /* Border */
  --color-border:         oklch(88% 0.01 255);
  --color-border-strong:  oklch(80% 0.01 255);

  /* Background */
  --color-bg:             oklch(98% 0 0);
}
```

---

## WCAG Contrast in OKLCH

### The L channel shortcut

OKLCH's perceptual uniformity means the L channel is a reliable contrast
predictor. Light text on a dark surface: subtract the text L from the surface L.
If the difference is ≥ 0.5, you're likely at 4.5:1 or better (AA for normal
text). If it's ≥ 0.6, you're at 7:1 (AAA). These are rough approximations; for
compliance, use an actual contrast checker.

### How to check

```css
/* Text: L=20%, Surface: L=98% → difference: 0.78 → passes AAA */
--color-text:    oklch(20% 0 0);
--color-surface: oklch(98% 0 0);

/* Text-muted: L=45%, Surface: L=98% → difference: 0.53 → passes AA */
--color-text-muted: oklch(45% 0 0);
```

### Lightness values that work

| Text Role | Target L (light mode) | Target L (dark mode) |
|-----------|----------------------|---------------------|
| Body text | 15–25% | 85–95% |
| Muted/secondary | 40–50% | 65–75% |
| Subtle/disabled | 60–70% | 45–55% |
| Surface bg | 95–100% | 10–15% |
| Raised bg | 98–100% | 15–20% |

### Chroma and contrast

Chroma affects perceived contrast but not measured contrast. A highly saturated
blue text at L=45% will look subjectively lighter than a gray text at L=45%.
This is why you should always test with real content, not just L values. When in
doubt, use an actual WCAG checker (axe, Lighthouse, or a browser extension).

---

## Anti-Patterns

Three color anti-patterns are so prevalent in AI-generated designs that the
scanner checks for them specifically.

### Purple gradient (#7C3AED to #4F46E5)

This is the most common AI-generated gradient. It appears on hero sections,
cards, CTAs, and backgrounds across every category of site. It's the gradient
equivalent of default Inter — nobody chose it, it's just what the model outputs.

**The fix:** Don't use a gradient unless the brand demands one. If the brand
demands one, construct it from brand colors, not default purple-to-indigo.

### Cream default (#F4F1EA, #FAF7F2)

Warm off-white backgrounds are the AI's "organic/approachable" preset. They
create contrast issues with standard gray text and look unintentional on most
screens.

**The fix:** Use white (#FFFFFF / oklch(100% 0 0)) unless there's a reason for
a tint. Warmth comes from typography and imagery, not from tinting the entire
canvas.

### Terracotta accent (#D97757)

Terracotta/clay/burnt-orange accents on cream backgrounds are the AI's "artisan
brand" color scheme. It's so overrepresented that it now communicates "generated
by AI" instead of "warm and human."

**The fix:** Pick an accent color that means something about the product, the
audience, or the brand. "Warm" is not a brand.

---

## Real Palette Examples

### Example 1: SaaS product (trust, professionalism)

```css
:root {
  --color-primary:        oklch(55% 0.2 255);   /* Blue */
  --color-accent:         oklch(65% 0.15 150);   /* Teal */
  --color-surface:        oklch(100% 0 0);
  --color-text:           oklch(18% 0 0);
  --color-text-muted:     oklch(42% 0 0);
  --color-border:         oklch(88% 0.01 255);
  --color-bg:             oklch(97% 0 0);
}
```

### Example 2: Editorial/literary (warmth, authority)

```css
:root {
  --color-primary:        oklch(25% 0.03 30);    /* Dark warm */
  --color-accent:         oklch(58% 0.18 25);    /* Rust — not terracotta */
  --color-surface:        oklch(100% 0 0);        /* White, not cream */
  --color-text:           oklch(15% 0.01 30);
  --color-text-muted:     oklch(40% 0.01 30);
  --color-border:         oklch(85% 0.01 30);
  --color-bg:             oklch(99% 0 0);
}
```

### Example 3: Developer tools (precision, clarity)

```css
:root {
  --color-primary:        oklch(50% 0.18 270);   /* Indigo */
  --color-accent:         oklch(62% 0.22 50);    /* Amber */
  --color-surface:        oklch(98% 0 0);
  --color-text:           oklch(12% 0 0);
  --color-text-muted:     oklch(38% 0 0);
  --color-border:         oklch(85% 0 0);
  --color-bg:             oklch(100% 0 0);
  --color-code-bg:        oklch(96% 0 0);
}
```

### Example 4: Wellness/health (calm, fresh)

```css
:root {
  --color-primary:        oklch(52% 0.18 165);   /* Sage green */
  --color-accent:         oklch(58% 0.2 195);     /* Soft cyan */
  --color-surface:        oklch(100% 0 0);
  --color-text:           oklch(20% 0 0);
  --color-text-muted:     oklch(45% 0 0);
  --color-border:         oklch(88% 0.02 165);
  --color-bg:             oklch(98% 0.01 165);
}
```

---

## Dark Mode

OKLCH makes dark mode systematic. Instead of designing a separate palette,
invert the lightness values.

```css
[data-theme="dark"] {
  --color-primary:        oklch(65% 0.22 255);     /* Lighter primary on dark bg */
  --color-primary-muted:  oklch(25% 0.05 255);
  --color-surface:        oklch(15% 0 0);           /* Dark surface */
  --color-surface-raised: oklch(20% 0 0);
  --color-surface-sunken: oklch(10% 0 0);
  --color-text:           oklch(92% 0 0);           /* Light text on dark */
  --color-text-muted:     oklch(68% 0 0);
  --color-text-subtle:    oklch(48% 0 0);
  --color-border:         oklch(28% 0 0);
  --color-bg:             oklch(11% 0 0);
}
```

Key rule: in dark mode, chroma stays the same or slightly increases (colors look
less saturated on dark backgrounds, so you may need to compensate). Lightness
inverts: 15–25% text becomes 85–95% text; 95–100% surface becomes 10–20% surface.

---

## Quick Reference

| Task | OKLCH Approach |
|------|---------------|
| Pick primary hue | Choose based on meaning, not preference |
| Set primary lightness | 50–65% for buttons and interactive elements |
| Set primary chroma | 0.15–0.25 for saturated brand color |
| Build neutral scale | Fix C at 0, vary L in 5–10% steps |
| Check contrast | Subtract text L from surface L; ≥ 0.5 passes AA |
| Build dark mode | Invert L values, keep C the same or slightly higher |
| Gradient interpolation | OKLCH avoids dead zones; use `in oklch` |