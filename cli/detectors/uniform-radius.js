/**
 * Detects when 3+ distinct element types share the same border-radius value.
 */

export function detect(content, filepath) {
  const findings = [];

  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  const radiusMap = new Map(); // radius value -> Set of selector "types"

  let match;
  while ((match = ruleRegex.exec(content)) !== null) {
    const selector = match[1].trim();
    const body = match[2];

    const radiusMatch = body.match(/border-radius\s*:\s*([^;]+)/i);
    if (!radiusMatch) continue;

    const radiusValue = radiusMatch[1].trim().toLowerCase();

    // Extract a "type" from selector: the primary class or element
    const typeMatch = selector.match(/(?:\.([a-zA-Z_-]+))|(?:^[a-zA-Z]+)/);
    const elementType = typeMatch ? typeMatch[0].replace(/^\./, '') : selector;

    if (!radiusMap.has(radiusValue)) {
      radiusMap.set(radiusValue, new Set());
    }
    radiusMap.get(radiusValue).add(elementType);
  }

  for (const [radius, types] of radiusMap) {
    if (types.size >= 3) {
      const contentBefore = content.substring(0, 0);
      findings.push({
        line: 1,
        severity: 'info',
        message: `Uniform border-radius: ${[...types].slice(0, 5).join(', ')} all use border-radius: ${radius}`,
      });
    }
  }

  return findings;
}