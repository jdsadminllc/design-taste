#!/bin/bash
set -e

echo "🎨 Design Taste — Installer"
echo ""

DEST="${1:-.design-taste}"

if [ -d "$DEST" ]; then
  echo "⚠️  $DEST already exists. Remove it first or choose a different path."
  exit 1
fi

# If we're running from the repo itself, copy; otherwise clone
if [ -f "SKILL.md" ]; then
  echo "📋 Copying from local repo..."
  mkdir -p "$DEST"
  cp -r SKILL.md references commands cli install.sh "$DEST/"
else
  echo "📥 Cloning from GitHub..."
  git clone --depth 1 https://github.com/jdsadminllc/design-taste.git "$DEST"
  rm -rf "$DEST/.git"
fi

echo ""
echo "✅ Installed to $DEST"
echo ""
echo "Next steps:"
echo "  1. Add to your agent's context:"
echo "     echo '.design-taste/SKILL.md' >> .cursorrules   # Cursor"
echo "     echo '.design-taste/SKILL.md' >> CLAUDE.md      # Claude Code"
echo ""
echo "  2. Tell your agent: 'Read .design-taste/SKILL.md and follow it.'"
echo ""
echo "  3. Try the commands: /audit, /critique, /polish"