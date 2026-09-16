/**
 * Detects CSS animations using fadeIn + slideUp (translateY + opacity)
 * applied to section/.section elements. Flags when 3+ sections use the same animation.
 */

export function detect(content, filepath) {
  const findings = [];

  // Find @keyframes that combine translateY + opacity (slide+fade pattern)
  const keyframeRegex = /@keyframes\s+(\S+)\s*\{([^}]*)\}/g;
  const slideFadeAnimations = new Set();

  let match;
  while ((match = keyframeRegex.exec(content)) !== null) {
    const animName = match[1];
    const body = match[2].toLowerCase();

    const hasTranslate = /transform\s*:\s*translatey\s*\(/i.test(body) ||
      /translate\s*:\s*[^;]*\d/gi.test(body);
    const hasOpacity = /opacity\s*:\s*[\d.]+/i.test(body);

    if (hasTranslate && hasOpacity) {
      slideFadeAnimations.add(animName);
    }
  }

  if (slideFadeAnimations.size === 0) return findings;

  // Find elements using these animations, counting section-like ones
  const animUsageRegex = /animation(?:-name)?\s*:\s*([^;{}]+)/gi;
  const sectionUsers = [];
  let firstOccurrenceIndex = null;

  while ((match = animUsageRegex.exec(content)) !== null) {
    const animNames = match[1].split(',').map((s) => s.trim().split(/\s+/)[0]);
    for (const name of animNames) {
      if (slideFadeAnimations.has(name)) {
        // Look backwards to find the selector/class context
        const before = content.substring(0, match.index);
        const lastOpenBrace = before.lastIndexOf('{');
        const selectorStart = content.lastIndexOf('}', lastOpenBrace) + 1;
        const selectorContext = content.substring(selectorStart, lastOpenBrace).trim();

        const isSection = /\bsection\b/i.test(selectorContext) ||
          /["']section["']/i.test(selectorContext);

        if (isSection) {
          sectionUsers.push(selectorContext);
          if (firstOccurrenceIndex === null) {
            firstOccurrenceIndex = match.index;
          }
        }
        break;
      }
    }
  }

  if (sectionUsers.length >= 3 && firstOccurrenceIndex !== null) {
    const contentBefore = content.substring(0, firstOccurrenceIndex);
    const line = (contentBefore.match(/\n/g) || []).length + 1;
    findings.push({
      line,
      severity: 'warning',
      message: `Section slide animation: ${sectionUsers.length} sections use fadeIn+slideUp animation`,
    });
  }

  return findings;
}