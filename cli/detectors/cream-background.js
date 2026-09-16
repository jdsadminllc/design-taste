/**
 * Detects background or background-color using warm cream hex values.
 */
const CREAM_COLORS = [
  '#F4F1EA', '#f4f1ea',
  '#FAF7F2', '#faf7f2',
  '#FEFCF9', '#fefcf9',
  '#FFFDF7', '#fffdf7',
  '#F9F6F0', '#f9f6f0',
  '#F5F0E8', '#f5f0e8',
  '#FFF8F0', '#fff8f0',
  '#FDFBF7', '#fdfbf7',
  '#FAF8F5', '#faf8f5',
];

export function detect(content, filepath) {
  const findings = [];

  const bgRegex = /(?:background(?:-color)?)\s*:\s*([^;{}]+)/gi;
  let match;
  while ((match = bgRegex.exec(content)) !== null) {
    const value = match[1].trim();

    const isCream = CREAM_COLORS.some((c) => value.toLowerCase().includes(c));
    if (isCream) {
      const contentBefore = content.substring(0, match.index);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'warning',
        message: `Warm cream background: ${value}`,
      });
    }
  }

  // Also check inline styles
  const inlineBgRegex = /style\s*=\s*["'][^"']*(?:background(?:-color)?)\s*:\s*([^;"']+)/gi;
  while ((match = inlineBgRegex.exec(content)) !== null) {
    const value = match[1].trim();
    const isCream = CREAM_COLORS.some((c) => value.toLowerCase().includes(c));
    if (isCream) {
      const contentBefore = content.substring(0, match.index);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'warning',
        message: `Warm cream background (inline): ${value}`,
      });
    }
  }

  return findings;
}