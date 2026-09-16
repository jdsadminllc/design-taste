# Motion

Animation in UI is not decoration. It has four legitimate jobs: communicating
state changes, clarifying spatial relationships, signaling affordance, and
providing feedback. Everything else — parallax scroll effects, "delight"
animations, loading spinners with personality — is noise.

---

## When to Animate

If you can't name which of these four purposes the animation serves, remove it.

### 1. State change

Something appeared, disappeared, or transformed. A modal opens. A panel expands.
A list item is deleted. The user needs to understand that the interface changed.

```
Modal: fade in + slight scale up (200–300ms)
Delete: fade out + collapse height (200–300ms)
Expand: height or max-height transition (200–300ms)
```

### 2. Spatial relationship

Two states that are spatially connected. A card opens into a detail view. A menu
drops down from its trigger. The animation shows *where* the new element came
from, anchoring it in space.

```
Dropdown: transform-origin top; scaleY 0→1 (150–200ms)
Detail expand: the card grows into the detail (250–350ms)
Tab switch: content slides left/right (200–300ms)
```

### 3. Affordance

A visual cue that says "you can interact with this." A button lifts slightly on
hover. A card indicates it's draggable with a subtle wiggle on hover. A link
underlines itself. These should be near-instant.

```
Hover lift: transform: translateY(-2px) (150ms)
Link underline: width 0→100% (150ms)
Drag handle: subtle color shift on hover (100ms)
```

### 4. Feedback

A visual response to an action. A button presses down when clicked. A form field
shakes on validation error. A success checkmark animates in. Feedback must be
immediate — the user should never wonder whether their click registered.

```
Button press: transform: scale(0.97) (100ms)
Error shake: translateX(-4px, 4px, -4px, 4px, 0) (300ms)
Success check: stroke-dashoffset draw (300–500ms)
```

### When NOT to animate

- **On first load:** The user wants content, not a performance. Hero text
  sliding in is a tax on attention that nobody asked to pay.
- **On every scroll:** Section entrance animations are the #1 source of motion
  fatigue. The user scrolls to see content. Making them wait for it to fade in is
  user-hostile.
- **Infinite spinners:** A spinner with no progress indicator says "something
  might be happening, maybe." Show a progress bar, a skeleton, or an estimated
  time.
- **Page transitions:** Nobody wants to watch pages dissolve into each other.
  Instant navigation is the best navigation animation.

---

## Duration Guidelines

Animation duration should match the distance and complexity of the change.
Small, frequent interactions are fast. Large, infrequent changes can be slower.

| Type | Duration | Examples |
|------|----------|----------|
| Micro | 100–150ms | Button press, hover states, toggle switches |
| Small | 150–200ms | Dropdown open, tooltip appear, hover lift |
| Medium | 200–300ms | Modal open/close, panel expand, delete item |
| Large | 300–500ms | Page transitions (if you must), hero reveal |

### The golden rule

**Never exceed 500ms for a UI animation.** After half a second, the user's
attention has moved on. They're no longer watching your animation — they're
waiting for it to end. An animation that the user waits for is a loading screen
without the honesty.

---

## Easing

Easing makes animation feel natural. Linear motion feels robotic because nothing
in the physical world moves at a constant speed. Things accelerate and
decelerate.

### The three easings you need

```css
/* EASE-OUT: starts fast, ends slow. For elements ENTERING the screen. */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* EASE-IN: starts slow, ends fast. For elements EXITING the screen. */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* EASE-IN-OUT: slow start, fast middle, slow end. For elements MOVING
   within the screen (position changes, not enter/exit). */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Why ease-out for entering

When something appears, you want it to arrive quickly and settle gently. Ease-out
starts at full speed and decelerates — like a car pulling into a parking spot.

```css
.modal-enter {
  animation: modal-in 250ms var(--ease-out);
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
```

### Why ease-in for exiting

When something disappears, ease-in makes it linger for a moment then accelerate
away — like an object falling off a table. It starts slow and gains speed.

```css
.modal-exit {
  animation: modal-out 200ms var(--ease-in);
}

@keyframes modal-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.95); }
}
```

### Why ease-in-out for moving

When an element changes position on screen (not appearing/disappearing),
ease-in-out creates smooth acceleration and deceleration — like an elevator.

```css
.reorder-item {
  transition: transform 300ms var(--ease-in-out);
}
```

---

## GPU-Composited Only

For 60fps animation, only animate `transform` and `opacity`. Never animate
`width`, `height`, `top`, `left`, `margin`, or `padding`.

### Why

`transform` and `opacity` are GPU-composited. The browser can animate them
without recalculating layout or repainting — it just moves pixels on the GPU.

`width`, `height`, `top`, `left`, `margin`, and `padding` trigger layout
recalculation. The browser must reflow the entire page to figure out where
everything goes. This is expensive and creates jank — dropped frames, stuttering
animations, and 30fps motion on a page that should be smooth.

### How to animate "height"

```css
/* BAD — animating height triggers layout */
.expandable {
  transition: height 300ms;
}

/* GOOD — use scaleY with transform-origin */
.expandable {
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 300ms;
}

.expandable.open {
  transform: scaleY(1);
}
```

ScaleY animates on the GPU. Height animates on the CPU and reflows the page.
The visual result is the same. The performance difference is 10x or more.

### How to animate "position"

```css
/* BAD — animating top/left triggers layout */
.slide-in {
  transition: left 300ms;
}

/* GOOD — use translateX/Y */
.slide-in {
  transition: transform 300ms;
}
```

---

## Orchestration

When multiple elements animate on a page, they should form a single sequence —
not a collection of independent animations competing for attention.

### The entrance sequence

One element at a time. Each element starts its animation only after the previous
one has settled. The sequence is: hero → primary CTA → secondary content.

```css
.hero-title    { animation: fade-up 400ms var(--ease-out) 0ms both; }
.hero-subtitle { animation: fade-up 400ms var(--ease-out) 100ms both; }
.hero-cta      { animation: fade-up 400ms var(--ease-out) 200ms both; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Staggering

For lists of identical items (cards, search results, messages), stagger each
item by 50–80ms. The total sequence should not exceed 500ms for the whole list.

```css
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 60ms; }
.card:nth-child(3) { animation-delay: 120ms; }
.card:nth-child(4) { animation-delay: 180ms; }
.card:nth-child(5) { animation-delay: 240ms; }
/* Stop at 5 items. Past 5, the last items animate too late. */
```

Beyond 5–6 items, don't stagger. The last items animate so late that the
animation reads as a bug, not a feature. Either batch them or don't animate at
all.

### The anti-pattern: per-section entrance

The worst motion pattern: every section on the page animates independently as
it scrolls into view. The user scrolls. A section fades in. They scroll more.
Another section fades in. Each section demands a "look at me" moment. By the
fourth section, the user is exhausted and scrolling past content to escape the
animations.

**Don't do this.** Animate the hero (if anything). Let the rest of the page be
visible when the user scrolls to it.

---

## prefers-reduced-motion

Some users have vestibular disorders, motion sensitivity, or simply prefer
static interfaces. Respect the `prefers-reduced-motion` media query.

### The hardline snippet

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This kills every animation on the page. 0.01ms instead of 0s because some
browsers treat `animation-duration: 0s` as "use the declared duration" rather
than "don't animate." 0.01ms is effectively instant but unambiguously means
"animate for essentially zero time."

### When to be more subtle

If your animation conveys spatial information (a modal closing, a tab switching),
turn off the motion but preserve the transition — reduce it to a simple opacity
fade of 100ms or less. This communicates the state change without motion risk.

```css
@media (prefers-reduced-motion: reduce) {
  .modal-exit {
    animation: none;
    opacity: 0;
    transition: opacity 50ms;
  }
}
```

---

## Common Motion Mistakes

### 1. Scroll-jacking

Taking control of the user's scroll wheel. The user spins the wheel expecting
to scroll 300px; instead, the page advances one full section. This is the
single most user-hostile pattern in web design. Never do it.

### 2. Parallax nausea

Background elements scrolling at a different speed than foreground content. At
low speeds, this creates a subtle depth effect. At high speeds, it creates
motion sickness. The visual system interprets the speed difference as
vestibular conflict — your eyes say you're moving but your inner ear says you're
not. The result: nausea in susceptible users.

If you must use parallax, keep the speed ratio under 1.3:1 and add
`prefers-reduced-motion: reduce` support that disables it entirely.

### 3. Endless spinners

A spinner with no progress indication, no estimated time, and no cancel button.
After 2 seconds, the user assumes the page is broken. After 10 seconds, they're
gone. Show a progress bar, a skeleton, or a "this might take a minute" message.
If you can't estimate the time, at least acknowledge the uncertainty.

### 4. Animating layout properties

Animating `width`, `height`, `top`, `left`, `margin`, or `padding`. These all
trigger layout recalculation. On a page with 500+ DOM nodes, a single `height`
animation can drop the page to 15fps. Use `transform` instead.

### 5. Over-animating loading states

A skeleton screen with shimmer + a progress bar with pulse + a logo with spin +
a "loading..." text. Pick one loading indicator. The user is waiting for content,
not a light show.

---

## Quick Reference

| Question | Answer |
|----------|--------|
| When to animate? | State change, spatial relationship, affordance, feedback |
| Shortest duration? | 100ms (button press) |
| Longest duration? | 500ms (page-level) |
| Default easing? | ease-out for entering, ease-in for exiting |
| What properties? | transform + opacity only |
| Stagger limit? | 5–6 items, 50–80ms between each |
| Scroll animations? | No |
| Parallax? | No, or very subtle with reduced-motion fallback |
| prefers-reduced-motion? | Always include. 0.01ms hardline. |