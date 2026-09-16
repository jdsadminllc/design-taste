/**
 * Detects link and button text ending with "→" (right arrow).
 * Checks HTML content, JSX, and CSS pseudo-elements.
 */

export function detect(content, filepath) {
  const findings = [];

  // Single regex covering <a>, <button>, <Link>, <Button> with arrow text
  const linkRegex = /<(?:a|button|Link|Button)\b[^>]*>([^<]*→)\s*<\/(?:a|button|Link|Button)>/gi;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 1) {
      const contentBefore = content.substring(0, match.index);
      const line = (contentBefore.match(/\n/g) || []).length + 1;
      findings.push({
        line,
        severity: 'info',
        message: `Arrow link: "${text}"`,
      });
    }
  }

  // CSS ::after content with arrow
  const cssArrowRegex = /::after\s*\{[^}]*content\s*:\s*["']→["']/gi;
  while ((match = cssArrowRegex.exec(content)) !== null) {
    const contentBefore = content.substring(0, match.index);
    const line = (contentBefore.match(/\n/g) || []).length + 1;
    findings.push({
      line,
      severity: 'info',
      message: 'Arrow link via CSS ::after content: "→"',
    });
  }

  return findings;
}