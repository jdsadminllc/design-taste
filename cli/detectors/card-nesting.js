/**
 * Detects card-like nesting at depth 3+:
 * .card, [class*="card"], .panel, .tile containing another of the same.
 */

const CARD_PATTERNS = [
  /\bcard\b/i,
  /\bpanel\b/i,
  /\btile\b/i,
];

function hasCardClass(classAttr) {
  for (const pattern of CARD_PATTERNS) {
    if (pattern.test(classAttr)) return true;
  }
  return false;
}

export function detect(content, filepath) {
  const findings = [];

  // Simple tag-based parser for HTML/JSX
  const tagRegex = /<\/?(\w+)([^>]*)>/g;
  const stack = [];
  let match;

  while ((match = tagRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const tagName = match[1];
    const attrs = match[2];
    const isClosing = fullMatch.startsWith('</');
    const isSelfClosing = fullMatch.endsWith('/>');

    if (isSelfClosing) continue;

    if (!isClosing) {
      const classMatch = attrs.match(/class(?:Name)?\s*=\s*["']([^"']*)["']/i);
      const classValue = classMatch ? classMatch[1] : '';
      const isCard = hasCardClass(classValue) || hasCardClass(tagName);

      stack.push({
        tag: tagName,
        isCard,
        depth: stack.length,
        index: match.index,
      });
    } else {
      const opened = stack.pop();
      if (!opened) continue;

      if (opened.isCard && opened.depth >= 2) {
        // Check ancestors for card elements
        let cardAncestors = 0;
        for (const ancestor of stack) {
          if (ancestor.isCard) cardAncestors++;
        }
        // Include self
        cardAncestors++;
        if (cardAncestors >= 3) {
          const contentBefore = content.substring(0, match.index);
          const line = (contentBefore.match(/\n/g) || []).length + 1;
          findings.push({
            line,
            severity: 'warning',
            message: `Card nesting at depth ${cardAncestors}: .card > .card > .card`,
          });
        }
      }
    }
  }

  return findings;
}