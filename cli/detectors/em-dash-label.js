/**
 * Detects content strings matching the pattern:
 * WORD — fragment (uppercase word, space, em dash, space, lowercase fragment)
 * Example: "DESIGN — crafted for clarity"
 */

export function detect(content, filepath) {
  const findings = [];

  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip code-heavy lines
    if (/^\s*\{/.test(line) || /^\s*import\s/.test(line) || /^\s*const\s/.test(line)) continue;

    // Pattern: uppercase word(s), em dash, lowercase fragment
    const pattern = /[A-Z]{2,}(?:\s+[A-Z]{2,})*\s*—\s*[a-z]/;
    if (pattern.test(line)) {
      // Extract the matched part
      const match = line.match(pattern);
      if (match) {
        findings.push({
          line: i + 1,
          severity: 'info',
          message: `Em-dash label pattern: "${match[0].trim().substring(0, 60)}"`,
        });
      }
    }
  }

  return findings;
}