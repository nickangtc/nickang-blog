#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { execFileSync } = require("child_process")

const PROJECT_ROOT = path.resolve(__dirname, "..")
const BLOG_DIR = path.join(PROJECT_ROOT, "content", "blog")
const UNTITLED_DIR_RE = /^untitled-\d{4}-\d{2}-\d{2}-\d{6}(?:-\d+)?$/
const processAll = process.argv.includes("--all")

function sanitizeSlug(title) {
  return title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9\-]/g, "")
}

function parseFrontmatter(markdown, filePath) {
  const normalized = markdown.replace(/^\uFEFF/, "")

  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n")) {
    return null
  }

  const lineEnding = normalized.startsWith("---\r\n") ? "\r\n" : "\n"
  const closing = normalized.indexOf(`${lineEnding}---`, 3)

  if (closing === -1) {
    throw new Error(`Missing closing frontmatter delimiter in ${filePath}`)
  }

  return normalized.slice(3 + lineEnding.length, closing)
}

function parseYamlScalar(value) {
  const trimmed = value.trim()

  if (trimmed === "") {
    return ""
  }

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed)
    } catch (_err) {
      return trimmed.slice(1, -1)
    }
  }

  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'")
  }

  return trimmed
}

function readTitle(indexPath) {
  const markdown = fs.readFileSync(indexPath, "utf8")
  const frontmatter = parseFrontmatter(markdown, indexPath)

  if (frontmatter === null) {
    return null
  }

  const titleLine = frontmatter
    .split(/\r?\n/)
    .find(line => /^title\s*:/.test(line))

  if (!titleLine) {
    return null
  }

  return parseYamlScalar(titleLine.replace(/^title\s*:\s*/, ""))
}

function isDirectory(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch (_err) {
    return false
  }
}

function renamePostFoldersFromTitle() {
  const entries = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()

  const renames = []

  for (const folderName of entries) {
    const postDir = path.join(BLOG_DIR, folderName)
    const indexPath = path.join(postDir, "index.md")

    if (!fs.existsSync(indexPath)) {
      continue
    }

    const title = readTitle(indexPath)
    const isUntitledFolder = UNTITLED_DIR_RE.test(folderName)

    if (!title || title.trim() === "") {
      if (isUntitledFolder) {
        throw new Error(
          `Untitled post folder needs a frontmatter title before commit: content/blog/${folderName}/index.md`
        )
      }

      continue
    }

    const targetFolderName = sanitizeSlug(title)

    if (!targetFolderName) {
      throw new Error(
        `Title in content/blog/${folderName}/index.md does not produce a usable slug: "${title}"`
      )
    }

    if (folderName === targetFolderName) {
      continue
    }

    // This hook exists for newly-created untitled drafts. Avoid rewriting legacy
    // permalinks unless explicitly requested with --all.
    if (!processAll && !isUntitledFolder) {
      continue
    }

    const targetDir = path.join(BLOG_DIR, targetFolderName)

    if (isDirectory(targetDir)) {
      throw new Error(
        `Cannot rename content/blog/${folderName} to content/blog/${targetFolderName}: target folder already exists`
      )
    }

    renames.push({ from: postDir, to: targetDir, fromName: folderName, toName: targetFolderName })
  }

  for (const rename of renames) {
    fs.renameSync(rename.from, rename.to)
    console.log(`Renamed content/blog/${rename.fromName} -> content/blog/${rename.toName}`)
  }

  if (renames.length > 0) {
    const changedPaths = renames.flatMap(rename => [
      path.relative(PROJECT_ROOT, rename.from),
      path.relative(PROJECT_ROOT, rename.to),
    ])

    execFileSync("git", ["add", "-A", "--", ...changedPaths], {
      cwd: PROJECT_ROOT,
      stdio: "inherit",
    })
  }
}

try {
  renamePostFoldersFromTitle()
} catch (err) {
  console.error(`❌ ${err.message}`)
  process.exit(1)
}
