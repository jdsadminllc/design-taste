/**
 * Detects CSS rules with text-transform: uppercase AND letter-spacing
 * on elements with class names containing label, eyebrow, meta, tag, badge, or category.
 */

const LABEL_CLASSES = ['label', 'eyebrow', 'meta', 'tag', 'badge', 'category'];

export function detect(content, filepath) {
  const findings = [];

  // Match CSS rule blocks: selector { ... }
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;
  while ((match = ruleRegex.exec(content)) !== null) {
    const selector = match[1].trim();
    const body = match[2];

    const hasUppercase = /text-transform\s*:\s*upper/i.test(body);
    const hasLetterSpacing = /letter-spacing\s*:/i.test(body);

    if (hasUppercase && hasLetterSpacing) {
      const isLabelClass = LABEL_CLASSES.some((cls) =>
        selector.toLowerCase().includes(cls)
      );
      if (isLabelClass) {
        const contentBefore = content.substring(0, match.index);
        const line = (contentBefore.match(/\n/g) || []).length + 1;
        findings.push({
          line,
          severity: 'warning',
          message: `All-caps label pattern: "${selector}" uses text-transform: uppercase + letter-spacing`,
        });
      }
    }
  }

  return findings;
}