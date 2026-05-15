#!/usr/bin/env node

/**
 * Generate backlinks for all blog posts
 * Scans all markdown files, builds a reverse link index,
 * and updates each post's frontmatter with backlinks array
 *
 * Usage:
 *   npm run backlinks              # Generate for all posts
 *   npm run backlinks -- --dry-run # Preview changes without writing
 *   npm run backlinks -- --limit 5 # Process only first 5 posts (for testing)
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content/blog');

function findPostIndexFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(dir, entry.name, 'index.md'))
    .filter(filePath => fs.existsSync(filePath))
    .sort();
}

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitIndex = args.indexOf('--limit');
const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1], 10) : null;

/**
 * Parse YAML frontmatter from markdown file
 * Returns { frontmatterStr, body }
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }

  return {
    frontmatterStr: match[1],
    body: match[2],
  };
}

/**
 * Extract internal blog links from markdown body
 * Only matches relative paths like /slug-name/
 * Excludes external URLs with protocols (http://, https://, etc.)
 */
function extractInternalLinks(body) {
  const links = [];

  // Match markdown links: [text](/slug) or [text](/slug/) or plain references /slug/.
  // But NOT external URLs like http://example.com or https://example.com.
  // Pattern: / followed by slug chars, optionally followed by a trailing slash.
  const internalLinkPattern = /\/([a-z0-9\-]+)\/?(?=[\s)\]"'.,!?;:]|$)/g;
  let match;

  while ((match = internalLinkPattern.exec(body)) !== null) {
    const fullMatch = match[0];
    const slug = `/${match[1]}/`; // Normalize /slug and /slug/ links to /slug/

    // Exclude if part of a URL protocol (preceded by :// or similar)
    const beforeMatch = body.substring(Math.max(0, match.index - 10), match.index);
    if (beforeMatch.includes('://') || beforeMatch.includes('http')) {
      continue;
    }

    if (!links.includes(slug)) {
      links.push(slug);
    }
  }

  return links;
}

/**
 * Update backlinks in frontmatter string
 * Finds existing backlinks: section and replaces it, or appends before closing ---
 */
function updateFrontmatterBacklinks(frontmatterStr, backlinks) {
  const lines = frontmatterStr.split('\n');

  // Find backlinks section
  let backlinkStartIndex = -1;
  let backlinkEndIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('backlinks:')) {
      backlinkStartIndex = i;

      // Find where backlinks array ends (next key at same indentation level)
      for (let j = i + 1; j < lines.length; j++) {
        const line = lines[j];
        const trimmed = line.trim();

        // Empty line or indented content (array items)
        if (!trimmed || line.startsWith('  ')) {
          continue;
        }

        // Found next key at root level
        backlinkEndIndex = j - 1;
        break;
      }

      // If no next key found, backlinks goes to end
      if (backlinkEndIndex === -1) {
        backlinkEndIndex = lines.length - 1;
      }
      break;
    }
  }

  // Build new backlinks section
  const newBacklinksLines = [];
  newBacklinksLines.push('backlinks:');

  if (backlinks.length > 0) {
    backlinks.forEach(backlink => {
      newBacklinksLines.push(`  - slug: "${backlink.slug}"`);
      newBacklinksLines.push(`    title: "${backlink.title}"`);
    });
  }

  // Replace or insert
  if (backlinkStartIndex !== -1) {
    // Replace existing backlinks section
    lines.splice(backlinkStartIndex, backlinkEndIndex - backlinkStartIndex + 1, ...newBacklinksLines);
  } else {
    // Append before end of frontmatter
    lines.push(...newBacklinksLines);
  }

  return lines.join('\n');
}

/**
 * Main function
 */
async function generateBacklinks() {
  console.log('🔗 Generating backlinks...\n');

  if (isDryRun) {
    console.log('📋 DRY RUN MODE - no files will be modified\n');
  }

  if (limit) {
    console.log(`⚠️  TESTING MODE - processing only ${limit} files\n`);
  }

  // Find all post markdown files
  let mdFiles = findPostIndexFiles(CONTENT_DIR);

  if (limit) {
    mdFiles = mdFiles.slice(0, limit);
  }

  console.log(`Found ${mdFiles.length} markdown files\n`);

  if (mdFiles.length === 0) {
    console.warn('No markdown files found');
    return;
  }

  // Parse all files and build posts index
  const postsBySlug = {};
  const postsWithLinks = [];

  mdFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontmatterStr, body } = parseFrontmatter(content);
      const slug = `/${path.basename(path.dirname(filePath))}/`;

      // Extract title from frontmatter (simple extraction)
      const titleMatch = frontmatterStr.match(/title:\s*"?([^"\n]+)"?/);
      const title = titleMatch ? titleMatch[1] : 'Untitled';

      postsBySlug[slug] = {
        filePath,
        frontmatterStr,
        body,
        title,
      };

      const links = extractInternalLinks(body);
      if (links.length > 0) {
        postsWithLinks.push({ slug, links });
      }
    } catch (err) {
      console.warn(`⚠️  Error parsing ${filePath}: ${err.message}`);
    }
  });

  // Build backlinks index (reverse mapping)
  const backlinksBySlug = {};

  postsWithLinks.forEach(({ slug: sourceSlug, links }) => {
    links.forEach(targetSlug => {
      // Only add backlink if target post exists
      if (postsBySlug[targetSlug]) {
        if (!backlinksBySlug[targetSlug]) {
          backlinksBySlug[targetSlug] = [];
        }

        const sourcePost = postsBySlug[sourceSlug];
        backlinksBySlug[targetSlug].push({
          slug: sourceSlug,
          title: sourcePost.title,
        });
      }
    });
  });

  // Update each file's frontmatter with backlinks
  let updatedCount = 0;

  Object.entries(postsBySlug).forEach(([slug, postData]) => {
    const backlinks = backlinksBySlug[slug] || [];

    // Sort for consistency
    backlinks.sort((a, b) => a.slug.localeCompare(b.slug));

    // Check if backlinks have changed
    const currentBacklinksMatch = postData.frontmatterStr.match(/backlinks:\n([\s\S]*?)(?=\n[a-z]|\n\n|$)/);
    const backlinksJson = JSON.stringify(backlinks);
    const currentJson = currentBacklinksMatch ? currentBacklinksMatch[0] : null;

    // Update frontmatter with new backlinks
    const newFrontmatterStr = updateFrontmatterBacklinks(postData.frontmatterStr, backlinks);

    // Check if actually changed
    if (newFrontmatterStr === postData.frontmatterStr) {
      return; // No change
    }

    updatedCount++;

    const backlinksStr = backlinks.length > 0
      ? `${backlinks.length} backlink${backlinks.length !== 1 ? 's' : ''}`
      : 'no backlinks';
    console.log(`✓ ${slug} (${backlinksStr})`);

    if (!isDryRun) {
      // Reconstruct file content with new frontmatter
      const newContent = `---\n${newFrontmatterStr}\n---\n${postData.body}`;

      // Write back to file
      fs.writeFileSync(postData.filePath, newContent, 'utf8');
    }
  });

  if (isDryRun) {
    console.log(`\n📋 Dry run complete. Would have updated ${updatedCount} file${updatedCount !== 1 ? 's' : ''}`);
  } else {
    console.log(`\n✅ Done! Updated ${updatedCount} file${updatedCount !== 1 ? 's' : ''}`);
  }
}

generateBacklinks().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
