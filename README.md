# Design Taste

> Teach AI coding agents to have better taste in frontend design.

Tired of Inter font, purple gradients, and cards inside cards every time you ask an AI for a UI? Design Taste gives your agent a vocabulary for professional, distinctive design — and a scanner that catches the generic defaults before you ship them.

## Quick Install

```bash
# Clone into your project
npx degit jdsadminllc/design-taste .design-taste

# Or add as a submodule
git submodule add https://github.com/jdsadminllc/design-taste .design-taste

# Link the skill to your agent
echo ".design-taste/SKILL.md" >> .cursorrules   # Cursor
echo ".design-taste/SKILL.md" >> CLAUDE.md      # Claude Code
```

Then tell your agent: "Read .design-taste/SKILL.md and follow it."

## What's Inside

```
design-taste/
├── SKILL.md                    # The skill: anti-patterns + design vocabulary
├── references/                 # Deep dives
│   ├── typography.md           # Font selection, pairing, scale
│   ├── color.md                # OKLCH color system, palette building
│   ├── spacing.md              # Spatial systems and rhythm
│   ├── motion.md               # Animation principles and performance
│   ├── ux-writing.md           # Copy patterns and voice
│   └── anti-patterns.md        # Complete catalog of AI design tells
├── commands/                   # Chat commands
│   ├── audit.md                # /audit — scan for anti-patterns
│   ├── critique.md             # /critique — UX review with score
│   └── polish.md               # /polish — elevate existing UI
├── cli/                        # Standalone scanner
│   ├── index.js                # npx design-taste audit <path>
│   └── detectors/              # Anti-pattern detection modules
└── install.sh                  # One-command setup
```

## Commands

Once the skill is loaded, use these in chat:

| Command | What it does |
|---------|-------------|
| `/audit` | Scans code for all 17 anti-patterns, outputs file:line:severity report |
| `/critique` | UX/design review — scores hierarchy, type, color, spacing, motion, copy out of 10 |
| `/polish` | Elevates existing UI: fixes type scale, tunes spacing, replaces generic colors, adds purposeful motion |

## CLI Scanner

```bash
# Audit a project directory
npx design-taste audit ./src

# Audit a live URL
npx design-taste audit https://example.com

# Check a single file
npx design-taste check ./src/App.tsx
```

The scanner detects: Inter/default fonts, purple gradients, card nesting, missing focus states, ALL CAPS labels, tracked-out text, cream backgrounds, identical shadows, em-dash labels, middle-dot meta strings, arrow-appended links, and 7 more anti-patterns.

## The Anti-Patterns

Design Taste catches these 17 AI tells:

1. Inter/system-ui as default font
2. Single-word italic/bold accent in headlines
3. ALL CAPS labels and eyebrows
4. Monospace for data labels in non-mono designs
5. Tracked-out text (letter-spacing > 0.1em) above headings
6. Purple-to-indigo gradients
7. Warm cream (#F4F1EA) backgrounds
8. Terracotta (#D97757) accents on cream
9. Uniform border-radius on everything
10. Identical box-shadows on all cards
11. Cards nested inside cards
12. Fade-and-slide-up on every section
13. Numbered markers on non-sequential content
14. Middle-dot meta strings
15. Em-dash label formatting
16. Arrow (→) on every link
17. Template chrome (eyebrow+heading+subtitle+CTA stack)

## Philosophy

Every design decision should be a choice, not a default. If your AI would make the same choice regardless of the project's subject matter, it's wrong. Design Taste gives agents the vocabulary to make deliberate, distinctive choices.

## License

MIT