#!/usr/bin/env node
import { readFileSync, existsSync, statSync } from 'fs';
import { resolve, basename } from 'path';
import { globSync } from 'glob';
import chalk from 'chalk';
import * as cheerio from 'cheerio';

import { detect as defaultInter } from './detectors/default-inter.js';
import { detect as purpleGradient } from './detectors/purple-gradient.js';
import { detect as creamBackground } from './detectors/cream-background.js';
import { detect as cardNesting } from './detectors/card-nesting.js';
import { detect as allCapsLabels } from './detectors/all-caps-labels.js';
import { detect as uniformRadius } from './detectors/uniform-radius.js';
import { detect as trackedOut } from './detectors/tracked-out.js';
import { detect as cloneShadows } from './detectors/clone-shadows.js';
import { detect as sectionSlide } from './detectors/section-slide.js';
import { detect as middleDotMeta } from './detectors/middle-dot-meta.js';
import { detect as emDashLabel } from './detectors/em-dash-label.js';
import { detect as arrowLinks } from './detectors/arrow-links.js';

const DETECTORS = [
  { name: 'default-inter', fn: defaultInter },
  { name: 'purple-gradient', fn: purpleGradient },
  { name: 'cream-background', fn: creamBackground },
  { name: 'card-nesting', fn: cardNesting },
  { name: 'all-caps-labels', fn: allCapsLabels },
  { name: 'uniform-radius', fn: uniformRadius },
  { name: 'tracked-out', fn: trackedOut },
  { name: 'clone-shadows', fn: cloneShadows },
  { name: 'section-slide', fn: sectionSlide },
  { name: 'middle-dot-meta', fn: middleDotMeta },
  { name: 'em-dash-label', fn: emDashLabel },
  { name: 'arrow-links', fn: arrowLinks },
];

const SEVERITY_COLORS = {
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
};

const SEVERITY_SYMBOLS = {
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
};

const SEVERITY_WEIGHT = { error: 0, warning: 1, info: 2 };

const FILE_GLOBS = ['**/*.html', '**/*.css', '**/*.jsx', '**/*.tsx', '**/*.vue', '**/*.svelte'];

function runDetectors(content, filepath) {
  const findings = [];
  for (const detector of DETECTORS) {
    try {
      const results = detector.fn(content, filepath);
      if (Array.isArray(results)) {
        for (const r of results) {
          findings.push({
            ...r,
            file: filepath,
            pattern: detector.name,
          });
        }
      }
    } catch (err) {
      // Skip broken detectors silently; they shouldn't crash the scan
    }
  }
  return findings;
}

function printFindings(findings) {
  findings.sort((a, b) => {
    const w = (SEVERITY_WEIGHT[a.severity] ?? 2) - (SEVERITY_WEIGHT[b.severity] ?? 2);
    if (w !== 0) return w;
    return (a.file || '').localeCompare(b.file || '') || (a.line || 0) - (b.line || 0);
  });

  for (const f of findings) {
    const color = SEVERITY_COLORS[f.severity] || chalk.white;
    const symbol = SEVERITY_SYMBOLS[f.severity] || '?';
    const loc = f.file ? `${chalk.dim(f.file)}${f.line ? chalk.dim(`:${f.line}`) : ''}` : '';
    if (loc) {
      console.log(`${loc}  ${color(symbol)}  ${color(f.pattern)} — ${f.message}`);
    } else {
      console.log(`${color(symbol)}  ${color(f.pattern)} — ${f.message}`);
    }
  }

  const errors = findings.filter((f) => f.severity === 'error').length;
  const warnings = findings.filter((f) => f.severity === 'warning').length;
  const info = findings.filter((f) => f.severity === 'info').length;

  console.log();
  if (findings.length === 0) {
    console.log(chalk.green('No design anti-patterns found.'));
  } else {
    console.log(
      chalk.bold(`Found ${findings.length} issues `) +
        chalk.dim(`(${errors} errors, ${warnings} warnings, ${info} info)`)
    );
  }
}

function scanFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  return runDetectors(content, filepath);
}

async function scanUrl(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      console.error(chalk.red(`Failed to fetch ${url}: ${resp.status} ${resp.statusText}`));
      process.exit(1);
    }
    const html = await resp.text();
    const $ = cheerio.load(html);

    const allFindings = [];

    // Scan the full HTML
    allFindings.push(...runDetectors(html, url));

    // Scan each inline <style>
    $('style').each((i, el) => {
      const css = $(el).text();
      if (css.trim()) {
        allFindings.push(...runDetectors(css, `${url} [inline style #${i + 1}]`));
      }
    });

    // Scan style attributes
    $('[style]').each((i, el) => {
      const style = $(el).attr('style') || '';
      if (style.trim()) {
        allFindings.push(...runDetectors(`* { ${style} }`, `${url} [inline attr]`));
      }
    });

    // Scan linked CSS? Not doing deep fetch for now — noted limitation

    return allFindings;
  } catch (err) {
    console.error(chalk.red(`Error fetching ${url}: ${err.message}`));
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const target = args[1];

  if (!command || (command !== 'audit' && command !== 'check')) {
    console.error(chalk.red('Usage: design-taste <audit|check> <path|url|file>'));
    process.exit(1);
  }

  if (!target) {
    console.error(chalk.red(`Error: ${command} requires a target`));
    process.exit(1);
  }

  if (command === 'check') {
    if (!existsSync(target)) {
      console.error(chalk.red(`File not found: ${target}`));
      process.exit(1);
    }
    const findings = scanFile(target);
    printFindings(findings);
    process.exit(findings.length > 0 ? 1 : 0);
  }

  // audit
  if (target.startsWith('http://') || target.startsWith('https://')) {
    const findings = await scanUrl(target);
    printFindings(findings);
    process.exit(findings.length > 0 ? 1 : 0);
  }

  // audit <path>
  const basePath = resolve(target);
  if (!existsSync(basePath)) {
    console.error(chalk.red(`Path not found: ${basePath}`));
    process.exit(1);
  }

  const isFile = statSync(basePath).isFile();
  if (isFile) {
    const findings = scanFile(basePath);
    printFindings(findings);
    process.exit(findings.length > 0 ? 1 : 0);
  }

  // Directory scan
  const files = [];
  for (const pattern of FILE_GLOBS) {
    const matches = globSync(pattern, { cwd: basePath, nodir: true, ignore: ['node_modules/**', '.git/**', 'dist/**', 'build/**'] });
    for (const m of matches) {
      files.push(resolve(basePath, m));
    }
  }

  if (files.length === 0) {
    console.log(chalk.yellow(`No scannable files found in ${basePath}`));
    process.exit(0);
  }

  const allFindings = [];
  for (const file of files) {
    try {
      const findings = scanFile(file);
      allFindings.push(...findings);
    } catch (err) {
      console.error(chalk.dim(`Skipping ${file}: ${err.message}`));
    }
  }

  printFindings(allFindings);
  process.exit(allFindings.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(chalk.red(`Unexpected error: ${err.message}`));
  process.exit(1);
});