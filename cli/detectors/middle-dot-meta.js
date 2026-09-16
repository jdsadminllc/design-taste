/**
 * Detects content strings containing "·" (middle dot) used to join metadata items.
 * Looks for patterns like "3 min read · Jan 15, 2024" or "Author · Category".
 */

export function detect(content, filepath) {
  const findings = [];

  // Match middle dot used between words (not in CSS selectors or code)
  // Look for text content in HTML/JSX: between > and <, or in text strings
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip lines that look like CSS or imports
    if (/^\s*\{/.test(line) || /^\s*import\s/.test(line)) continue;

    const dotMatch = line.match(/·/g);
    if (!dotMatch) continue;

    // Check if the surrounding context looks like metadata
    // Pattern: something · something (word or number on both sides)
    const metaPattern = /[\w\d]+\s*·\s*[\w\d]/g;
    let pm;
    let hasMeta = false;
    while ((pm = metaPattern.exec(line)) !== null) {
      hasMeta = true;
    }

    if (hasMeta) {
      findings.push({
        line: i + 1,
        severity: 'info',
        message: `Middle-dot metadata separator: ${line.trim().substring(0, 80)}`,
      });
    }
  }

  return findings;
}