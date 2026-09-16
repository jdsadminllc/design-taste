# /audit — Anti-Pattern Scanner

Scans the current codebase for all 17 Design Taste anti-patterns.

## Usage
```
/audit           # scan entire project
/audit src/      # scan specific directory
/audit src/App.tsx  # scan specific file
```

## Output Format
```
src/Hero.tsx:12  WARN  Purple gradient (#6) — linear-gradient uses purple-to-indigo
src/Card.tsx:45  ERROR  Card nesting (#11) — .card > .card > .card at depth 3
src/index.css:8  WARN  Default Inter (#1) — font-family: Inter without stylistic justification
```

Severity levels:
- ERROR: Must fix. These are the strongest AI tells.
- WARN: Should fix. These read as generic defaults.
- INFO: Consider. Subtle patterns worth reviewing.

## How It Works
The agent reads every .html, .css, .jsx, .tsx, .vue, .svelte file and checks each against the 17 anti-patterns defined in SKILL.md. It reports file, line number, pattern ID, and severity.

## Example Session
```
User: /audit
Agent: Scanning 47 files...
       Found 12 issues (3 errors, 7 warnings, 2 info)
       
       src/Hero.tsx:12  ERROR  Purple gradient (#6)
       src/Card.tsx:45   ERROR  Card nesting (#11)
       src/index.css:8   WARN   Default Inter (#1)
       src/index.css:24  WARN   Cream default (#7) — background: #F4F1EA
       src/Nav.tsx:15    WARN   ALL CAPS label (#3)
       ...
       
       Fix the 3 errors first, then address warnings.
```