#!/usr/bin/env node

/**
 * Audit/fix Markdown image captions in blog content.
 *
 * Canonical format:
 *   ![alt text](images/example.png) 
 *   _Photo by Someone on Unsplash_
 *
 * The fixer is intentionally conservative:
 * - fixes one Markdown image followed by caption text on the same line
 * - fixes one Markdown image followed by a caption-looking next line
 * - skips ambiguous lines containing multiple images
 * - skips fenced code blocks
 *
 * Usage:
 *   node scripts/audit-image-captions.js
 *   node scripts/audit-image-captions.js --fix
 */

const fs = require('node:fs');
const path = require('node:path');

const args = new Set(process.argv.slice(2));
const FIX = args.has('--fix');
const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content');

const IMAGE_LINE_RE = /^(\s*!\[[^\]\n]*\]\([^\n)]+\))(?:[ \t]*)$/;
const IMAGE_WITH_TRAILING_RE = /^(\s*!\[[^\]\n]*\]\([^\n)]+\))([ \t]+)(\S.*)$/;
const IMAGE_RE = /!\[[^\]\n]*\]\([^\n)]+\)/g;

const CAPTION_START_RE = /^(?:Photo(?: credit)?(?: by)?|Image|Graphic(?: by)?|Credit|Source|Courtesy|Illustration|Screenshot|Taken|View|Interior|Shopping|Students|Somewhere|Thank you|Not us\.|Not my|The\b|A\b|An\b|My\b|At\b|In\b|On\b|Left\b|Right\b|Bohol\b|Hong Kong\b|Singapore\b|Week\b)/i;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (/\.(md|mdx)$/.test(entry.name)) files.push(fullPath);
  }

  return files;
}

function isItalicized(line) {
  const trimmed = line.trim();
  return /^_(?:.|\s)+_$/.test(trimmed) || /^\*(?:.|\s)+\*$/.test(trimmed);
}

function italicize(caption) {
  const trimmed = caption.trim();
  if (isItalicized(trimmed)) return trimmed;
  return `_${trimmed}_`;
}

function isCaptionLike(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (isItalicized(trimmed)) return false;
  if (/^(?:#{1,6}\s|[-*+]\s|\d+\.\s|>|```|~~~|<|!\[|\[\^)/.test(trimmed)) return false;
  if (trimmed.length > 180) return false;
  return CAPTION_START_RE.test(trimmed);
}

function auditAndMaybeFix(file) {
  const original = fs.readFileSync(file, 'utf8');
  const eol = original.includes('\r\n') ? '\r\n' : '\n';
  const lines = original.split(/\r?\n/);
  const issues = [];
  const out = [...lines];
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const images = line.match(IMAGE_RE) || [];
    const trailingMatch = line.match(IMAGE_WITH_TRAILING_RE);

    if (trailingMatch) {
      if (images.length === 1 && !trailingMatch[3].trim().startsWith('![')) {
        issues.push({
          line: i + 1,
          type: 'same-line-caption',
          before: line.trim(),
          after: `${trailingMatch[1].trim()} ${eol}${italicize(trailingMatch[3])}`,
        });
        if (FIX) out[i] = `${trailingMatch[1]} ${eol}${italicize(trailingMatch[3])}`;
      }
      continue;
    }

    if (IMAGE_LINE_RE.test(line) && i + 1 < lines.length && isCaptionLike(lines[i + 1])) {
      issues.push({
        line: i + 2,
        type: 'plain-next-line-caption',
        before: lines[i + 1].trim(),
        after: italicize(lines[i + 1]),
      });
      if (FIX) {
        out[i] = line.replace(/[ \t]*$/, ' ');
        out[i + 1] = lines[i + 1].replace(/^\s*/, '').replace(/\s*$/, '');
        out[i + 1] = italicize(out[i + 1]);
      }
    }
  }

  const next = out.join(eol);
  if (FIX && next !== original) fs.writeFileSync(file, next);

  return issues;
}

const files = walk(CONTENT_DIR);
const allIssues = [];

for (const file of files) {
  const issues = auditAndMaybeFix(file);
  for (const issue of issues) allIssues.push({ file: path.relative(ROOT, file), ...issue });
}

const fixable = allIssues.filter((issue) => issue.type !== 'ambiguous-multiple-images');
const ambiguous = allIssues.filter((issue) => issue.type === 'ambiguous-multiple-images');

for (const issue of allIssues) {
  console.log(`${issue.file}:${issue.line} ${issue.type}`);
  console.log(`  ${issue.before}`);
  if (issue.after) console.log(`  => ${issue.after.replace(/\r?\n/g, ' / ')}`);
}

console.log('\nSummary');
console.log(`  files scanned: ${files.length}`);
console.log(`  issues found: ${allIssues.length}`);
console.log(`  fixable: ${fixable.length}`);
console.log(`  ambiguous/skipped: ${ambiguous.length}`);
console.log(`  mode: ${FIX ? 'fixed files in place' : 'audit only (use --fix to write changes)'}`);

if (ambiguous.length > 0) process.exitCode = 2;
else if (!FIX && fixable.length > 0) process.exitCode = 1;
