/**
 * Detects identical box-shadow values applied to 3+ elements.
 */

export function detect(content, filepath) {
  const findings = [];

  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  const shadowMap = new Map(); // shadow value -> count and first location

  let match;
  while ((match = ruleRegex.exec(content)) !== null) {
    const selector = match[1].trim();
    const body = match[2];

    const shadowMatch = body.match(/box-shadow\s*:\s*([^;]+)/i);
    if (!shadowMatch) continue;

    const shadowValue = shadowMatch[1].trim().toLowerCase().replace(/\s+/g, ' ');

    if (!shadowMap.has(shadowValue)) {
      shadowMap.set(shadowValue, { count: 0, selectors: [], firstIndex: match.index });
    }
    const entry = shadowMap.get(shadowValue);
    entry.count++;
    entry.selectors.push(selector);
  }

  for (const [shadow, entry] of shadowMap) {
    if (entry.count >= 3 && shadow !== 'none') {
      const contentBefore = content.substring(0, entry.firstIndex);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'info',
        message: `Clone shadows: ${entry.count} elements share box-shadow: ${shadow}`,
      });
    }
  }

  return findings;
}