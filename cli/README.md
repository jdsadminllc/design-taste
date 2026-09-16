# design-taste

CLI scanner that detects AI design anti-patterns in frontend code.

## Installation

```bash
cd cli
npm install
```

Or link globally:

```bash
cd cli
npm link
```

**Requires Node.js >= 18.**

## Usage

### Audit a directory

Scans all `.html`, `.css`, `.jsx`, `.tsx`, `.vue`, and `.svelte` files:

```bash
design-taste audit ./src
node index.js audit ./src
```

### Audit a URL

Fetches the page, extracts CSS and HTML, and runs detectors:

```bash
design-taste audit https://example.com
```

### Check a single file

```bash
design-taste check src/Hero.tsx
```

## Output

```
src/Hero.tsx:12  ✗  purple-gradient — Uses purple-to-indigo linear-gradient
src/Card.tsx:45  ✗  card-nesting — .card > .card > .card at depth 3
src/index.css:8  ⚠  default-inter — font-family: 'Inter' without stylistic justification

Found 12 issues (3 errors, 7 warnings, 2 info)
```

Severity levels: **error** (✗), **warning** (⚠), **info** (ℹ).

## Detectors

| Detector | Severity | What it flags |
|---|---|---|
| `default-inter` | info | System font stacks (Inter, system-ui) as only font choice |
| `purple-gradient` | warning | Purple-to-blue/indigo linear/radial gradients |
| `cream-background` | warning | Warm cream background colors (#F4F1EA, etc.) |
| `card-nesting` | warning | Card-inside-card nesting at depth 3+ |
| `all-caps-labels` | warning | `text-transform: uppercase` + `letter-spacing` on label classes |
| `uniform-radius` | info | 3+ element types sharing the same `border-radius` |
| `tracked-out` | info | High `letter-spacing` (>0.1em) on small text elements |
| `clone-shadows` | info | Identical `box-shadow` on 3+ elements |
| `section-slide` | warning | fadeIn+slideUp animations on 3+ sections |
| `middle-dot-meta` | info | Middle dot (·) used as metadata separator |
| `em-dash-label` | info | UPPERCASE — lowercase em-dash label pattern |
| `arrow-links` | info | Link/button text ending with → |