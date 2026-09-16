/**
 * Detects font-family using Inter, system-ui, -apple-system, sans-serif
 * as the ONLY explicit font choice. Also flags when no explicit font-family
 * is set at all (just system defaults).
 */
export function detect(content, filepath) {
  const findings = [];

  // CSS font-family declarations
  const cssFontRegex = /font-family\s*:\s*([^;{}]+)/gi;
  let match;
  while ((match = cssFontRegex.exec(content)) !== null) {
    const value = match[1].trim().toLowerCase();
    const families = value.split(',').map((f) => f.trim().replace(/['"]/g, ''));

    const systemFonts = ['inter', 'system-ui', '-apple-system', 'sans-serif', 'blinkmacsystemfont', 'segoe ui'];
    const hasCustomFont = families.some((f) => !systemFonts.includes(f) && f !== '');
    const hasSystemDefaults = families.some((f) => systemFonts.includes(f));

    if (hasSystemDefaults && !hasCustomFont) {
      const contentBefore = content.substring(0, match.index);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'info',
        message: `font-family uses only system defaults: ${value}`,
      });
    }
  }

  // Check inline style attributes for font-family
  const inlineFontRegex = /style\s*=\s*["'][^"']*font-family\s*:\s*([^;"']+)/gi;
  while ((match = inlineFontRegex.exec(content)) !== null) {
    const value = match[1].trim().toLowerCase();
    const families = value.split(',').map((f) => f.trim().replace(/['"]/g, ''));
    const systemFonts = ['inter', 'system-ui', '-apple-system', 'sans-serif', 'blinkmacsystemfont', 'segoe ui'];
    const hasCustomFont = families.some((f) => !systemFonts.includes(f) && f !== '');

    if (!hasCustomFont) {
      const contentBefore = content.substring(0, match.index);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'info',
        message: `inline font-family uses only system defaults: ${value}`,
      });
    }
  }

  return findings;
}