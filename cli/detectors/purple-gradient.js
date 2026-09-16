/**
 * Detects linear-gradient or radial-gradient using purple-ish colors
 * transitioning to blue or pink.
 */
const PURPLE_COLORS = [
  '#7c3aed', '#6366f1', '#8b5cf6', '#a855f7',
  '#9333ea', '#a78bfa', '#c084fc', '#d8b4fe',
  'indigo', 'violet', 'purple',
];

export function detect(content, filepath) {
  const findings = [];

  const gradientRegex = /(?:linear|radial)-gradient\s*\([^)]*\)/gi;
  let match;
  while ((match = gradientRegex.exec(content)) !== null) {
    const gradient = match[0].toLowerCase();

    const hasPurple = PURPLE_COLORS.some((c) => gradient.includes(c));
    if (hasPurple) {
      const contentBefore = content.substring(0, match.index);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'warning',
        message: `Purple gradient detected: ${match[0].substring(0, 60)}...`,
      });
    }
  }

  return findings;
}