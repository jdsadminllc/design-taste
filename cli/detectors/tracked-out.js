/**
 * Detects letter-spacing > 0.1em on small-font elements
 * (labels above headings — small font-size + high letter-spacing combination).
 */

export function detect(content, filepath) {
  const findings = [];

  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;
  while ((match = ruleRegex.exec(content)) !== null) {
    const selector = match[1].trim().replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const body = match[2];

    const lsMatch = body.match(/letter-spacing\s*:\s*([^;]+)/i);
    if (!lsMatch) continue;

    const lsValue = lsMatch[1].trim();
    const emMatch = lsValue.match(/([\d.]+)\s*em/);
    if (!emMatch) continue;

    const emVal = parseFloat(emMatch[1]);
    if (emVal <= 0.1) continue;

    // Check for small font-size
    const fsMatch = body.match(/font-size\s*:\s*([^;]+)/i);
    let isSmall = false;
    if (fsMatch) {
      const fsValue = fsMatch[1].trim();
      const fsEmMatch = fsValue.match(/([\d.]+)\s*em/);
      const fsPxMatch = fsValue.match(/([\d.]+)\s*px/);
      if (fsEmMatch && parseFloat(fsEmMatch[1]) <= 0.875) isSmall = true;
      if (fsPxMatch && parseFloat(fsPxMatch[1]) <= 14) isSmall = true;
    } else {
      // No explicit font-size but high letter-spacing: flag anyway
      isSmall = true;
    }

    if (isSmall) {
      const contentBefore = content.substring(0, match.index);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'info',
        message: `Tracked-out label: "${selector}" has letter-spacing: ${lsValue} with small font-size`,
      });
    }
  }

  return findings;
}