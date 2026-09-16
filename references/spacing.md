# Spacing

Spacing is the invisible structure of a design. It controls what the eye groups
together and what it separates. A consistent spatial system is the single
fastest way to make a design feel professional — and inconsistent spacing is the
fastest way to make it feel broken.

---

## Why a Spatial Scale Matters

Without a spatial scale, you're eyeballing every margin and padding value. One
section gets 40px of padding, the next gets 48px, another gets 32px. None of
these feel wrong individually — but together, they create a subtle unease that
the reader can't articulate. The page feels "off" but nobody can say why.

A spatial scale fixes this. Every spacing value comes from a predetermined set.
The eye learns the rhythm. The page feels cohesive.

### The 4px base scale

All modern design uses a 4px base unit. This isn't arbitrary — it's the smallest
unit that's visible on screen (1px is below the threshold of spatial perception)
and it divides evenly into every common layout width.

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Tight internal padding, icon-to-label gap |
| `space-2` | 8px | Inline spacing, small gap between related items |
| `space-3` | 12px | Comfortable inline, small block padding |
| `space-4` | 16px | Default padding, card internal, section gap small |
| `space-6` | 24px | Section padding, card external gap |
| `space-8` | 32px | Large section padding, major content separation |
| `space-12` | 48px | Section-to-section gap, hero padding |
| `space-16` | 64px | Major layout sections, page-level separation |
| `space-24` | 96px | Hero height, page-level whitespace |

### Why these numbers

The scale skips values that create ambiguity. There's no 20px or 28px because
those are too close to 16px and 24px — if both 20px and 24px exist, someone will
use 20px on one card and 24px on another, and the two cards will look like they
belong to different designs.

Every token in the scale is visually distinct from its neighbors. You can tell
at a glance whether a gap is 16px or 24px. You cannot tell 20px from 24px
without measuring.

---

## Section Spacing

Section spacing should be proportional to the section's importance and content
density. A hero section gets more breathing room than a footer. A dense feature
grid needs less space between items than a testimonial carousel.

### The hierarchy

| Section Type | Vertical Padding | Rationale |
|-------------|-----------------|-----------|
| Hero | 96–128px | Dominant presence, high visual weight |
| Featured content | 64–96px | Major section, deserves attention |
| Standard section | 48–64px | Default section rhythm |
| Dense listing (blog, features) | 32–48px | Information density matters |
| Footer | 32–48px | Utility, not presence |
| Banner/announcement | 16–24px | Transient, shouldn't dominate |

### Vertical rhythm

Headers and paragraphs within a section should maintain consistent vertical
rhythm. The space after a heading should be proportional to the heading's size
and its relationship to the content below.

```css
h1 + p { margin-top: var(--space-6); }  /* 24px — major pause */
h2 + p { margin-top: var(--space-4); }  /* 16px */
h3 + p { margin-top: var(--space-3); }  /* 12px — minor pause */
h4 + p { margin-top: var(--space-2); }  /* 8px  — continues thought */
```

---

## The Proximity Principle

Things that are related should be visually close. Things that are unrelated
should be visually far. This is the single most important rule in spatial design
and the single most commonly violated one.

### The rule

| Relationship | Spacing |
|-------------|---------|
| Same group (label + value) | 4–8px |
| Related items (cards in a grid) | 16–24px |
| Different groups (section break) | 48–64px |
| Different contexts (page break) | 96px+ |

### Common violations

**Label floating in space:**
```css
/* BAD — label is closer to the element ABOVE than its input */
.label { margin-top: 24px; margin-bottom: 4px; }

/* GOOD — label hugs its input, gap above separates from previous field */
.label { margin-top: 16px; margin-bottom: 4px; }
```

**Cards equidistant from everything:**
```css
/* BAD — same gap between cards and between card rows = no grouping */
.card-grid { gap: 16px; }

/* GOOD — more space between rows than between cards */
.card-grid { gap: 16px 24px; }  /* row-gap: 16px, column-gap: 24px */
/* Or better: row-gap > column-gap so rows read as separate groups */
.card-grid { gap: 32px 24px; }
```

**Section dividers that float:**
```css
/* BAD — equal padding above and below a divider */
.section-divider { margin: 32px 0; }

/* GOOD — divider belongs to the section below it */
.section-divider { margin: 64px 0 32px 0; }
/* More space above: "this is the end of the previous section." */
/* Less space below: "this belongs to the next section." */
```

---

## CSS Custom Properties Pattern

```css
:root {
  /* Spacing scale */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */

  /* Semantic spacing */
  --gap-inline:     var(--space-2);   /* Between inline items: tags, breadcrumbs */
  --gap-related:    var(--space-4);   /* Between related items: cards, list items */
  --gap-unrelated:  var(--space-8);   /* Between unrelated items: sections */
  --padding-card:   var(--space-4);   /* Card internal padding */
  --padding-section: var(--space-12); /* Section vertical padding */
  --padding-page:   var(--space-16);  /* Page-level padding */
}
```

Using `rem` for spacing keeps everything relative to the root font size. If the
user changes their default font size, the spacing scales with it. Using `px`
breaks this.

### Why semantic tokens matter

Don't use `--space-4` directly in components. Use semantic tokens:

```css
/* BAD — raw spacing tokens everywhere */
.card { padding: var(--space-4); }
.modal { padding: var(--space-6); }
.section { padding: var(--space-12) 0; }

/* GOOD — semantic tokens, one place to adjust */
.card { padding: var(--padding-card); }
.modal { padding: var(--padding-card); }
.section { padding: var(--padding-section) 0; }
```

When you decide cards need more padding, you change `--padding-card` once, not
every `.card` in the codebase. This is exactly why design tokens exist.

---

## Common Spacing Mistakes

### 1. Odd-numbered pixel values

```css
/* BAD — 17px, 23px, 31px */
padding: 17px;
margin: 23px;

/* GOOD — always multiples of 4 */
padding: 16px;
margin: 24px;
```

Odd values happen when you drag things around in a design tool. In code, they
create half-pixel rendering on high-DPI screens and make alignment impossible to
reason about.

### 2. Using percentage padding for vertical rhythm

```css
/* BAD — padding changes with element width */
.section { padding: 5% 0; }

/* GOOD — padding is independent of width */
.section { padding: var(--space-12) 0; }
```

Percentage vertical padding is relative to the element's *width*, not height. On
a mobile screen (375px wide), 5% = 19px. On a desktop (1440px), 5% = 72px.
This creates wildly inconsistent spacing across breakpoints.

### 3. Padding on the wrong element

```css
/* BAD — padding on individual children */
.card-list li { padding-block: 24px; }

/* GOOD — gap on the container */
.card-list { display: flex; flex-direction: column; gap: 24px; }
```

Use `gap` on flex/grid containers instead of padding or margin on children. It's
simpler, handles edge cases (first/last child shouldn't have margin), and keeps
spacing logic in one place.

### 4. Text-based spacing when flow spacing exists

```css
/* BAD — <br> tags and empty <p> for spacing */
<h2>Title</h2>
<br>
<br>
<p>Content</p>

/* GOOD — CSS margin controls the space */
<h2>Title</h2>
<p>Content</p>
```

```css
h2 + p { margin-top: var(--space-4); }
```

HTML should describe content structure. CSS should describe spacing. Mixing them
means you can't adjust spacing without editing content.

### 5. Collapsing margins without understanding

```css
/* The heading's margin-bottom (24px) and the paragraph's margin-top (16px)
   collapse to max(24px, 16px) = 24px, not 40px */
h2 { margin-bottom: 24px; }
p  { margin-top: 16px; }

/* BETTER — use one direction only */
h2 { margin-bottom: 0; }
h2 + p { margin-top: 24px; }
```

Margin collapse is one of CSS's most confusing behaviors. The simplest approach:
only use `margin-bottom` (or only `margin-top`) throughout your system, never
both on adjacent elements. Or use flexbox/grid `gap`, which doesn't collapse.

---

## Responsive Spacing

Spacing should decrease on smaller screens. A 96px hero padding on desktop
becomes excessive on mobile.

```css
:root {
  --padding-section: var(--space-12);  /* 48px default */
  --padding-page: var(--space-16);     /* 64px default */
}

@media (max-width: 768px) {
  :root {
    --padding-section: var(--space-8);  /* 32px on tablet */
    --padding-page: var(--space-6);     /* 24px on tablet */
  }
}

@media (max-width: 480px) {
  :root {
    --padding-section: var(--space-6);  /* 24px on mobile */
    --padding-page: var(--space-4);     /* 16px on mobile */
  }
}
```

This is why semantic tokens matter: one media query adjusts every section on the
page. No need to hunt down individual components.

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Base unit? | 4px |
| Smallest gap? | 4px (icon-to-label) |
| Default card padding? | 16px |
| Section vertical spacing? | 48–64px (desktop), 32px (mobile) |
| Gap between related items? | 16px |
| Gap between unrelated sections? | 48px+ |
| How to handle first/last child? | Use `gap`, not margin |
| px or rem? | rem for spacing, so it scales with font size |
| Percentage padding? | Never for vertical rhythm |