#!/usr/bin/env node

const { execFileSync, spawnSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

const PROJECT_ROOT = path.resolve(__dirname, "..")
const SKILL_PATH = path.join(PROJECT_ROOT, ".pi", "skills", "internal-linker")
const PI_BIN = process.env.PI_BIN || "pi"
const PI_TIMEOUT_MS = Number(process.env.AUTO_INTERNAL_LINKS_TIMEOUT_MS || 180000)

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
    ...options,
  })
}

function pathExistsInHead(filePath) {
  try {
    execFileSync("git", ["cat-file", "-e", `HEAD:${filePath}`], {
      cwd: PROJECT_ROOT,
      stdio: "ignore",
    })
    return true
  } catch (_err) {
    return false
  }
}

function parseStagedNameStatus() {
  const output = git(["diff", "--cached", "--name-status", "-z", "--diff-filter=ACMR"])
  const parts = output.split("\0").filter(Boolean)
  const entries = []

  for (let i = 0; i < parts.length; i += 1) {
    const status = parts[i]

    if (status.startsWith("R") || status.startsWith("C")) {
      const oldPath = parts[i + 1]
      const newPath = parts[i + 2]
      entries.push({ status, oldPath, path: newPath })
      i += 2
      continue
    }

    entries.push({ status, path: parts[i + 1] })
    i += 1
  }

  return entries
}

function getNewStagedBlogPosts() {
  return parseStagedNameStatus()
    .map(entry => entry.path)
    .filter(Boolean)
    .filter(filePath => /^content\/blog\/[^/]+\/index\.md$/.test(filePath))
    .filter(filePath => !filePath.includes("/untitled-"))
    .filter(filePath => fs.existsSync(path.join(PROJECT_ROOT, filePath)))
    .filter(filePath => !pathExistsInHead(filePath))
}

function runPiInternalLinker(filePath) {
  const prompt = [
    `Use the internal-linker skill on this newly created blog post: ${filePath}`,
    "Find and add only strong internal links to older posts.",
    "Edit only this target file. If no strong opportunities exist, make no changes.",
  ].join("\n")

  const result = spawnSync(
    PI_BIN,
    [
      "--print",
      "--no-session",
      "--skill",
      SKILL_PATH,
      "--tools",
      "read,bash,edit",
      prompt,
    ],
    {
      cwd: PROJECT_ROOT,
      encoding: "utf8",
      timeout: PI_TIMEOUT_MS,
      maxBuffer: 1024 * 1024 * 5,
    }
  )

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    const stderr = result.stderr ? `\n${result.stderr.trim()}` : ""
    const stdout = result.stdout ? `\n${result.stdout.trim()}` : ""
    throw new Error(`pi exited with status ${result.status}${stderr}${stdout}`)
  }

  if (result.stdout.trim()) {
    console.log(result.stdout.trim())
  }
}

function main() {
  if (process.env.SKIP_AUTO_INTERNAL_LINKS === "1") {
    console.log("⏭️  Skipping AI internal linking because SKIP_AUTO_INTERNAL_LINKS=1")
    return
  }

  if (!fs.existsSync(SKILL_PATH)) {
    console.warn(`⚠️  Internal linker skill not found at ${path.relative(PROJECT_ROOT, SKILL_PATH)}`)
    return
  }

  const posts = [...new Set(getNewStagedBlogPosts())]

  if (posts.length === 0) {
    return
  }

  console.log(`🔎 AI internal linking for ${posts.length} new post${posts.length === 1 ? "" : "s"}...`)

  for (const filePath of posts) {
    console.log(`\n→ ${filePath}`)
    runPiInternalLinker(filePath)
    execFileSync("git", ["add", "--", filePath], { cwd: PROJECT_ROOT, stdio: "inherit" })
  }
}

try {
  main()
} catch (err) {
  console.warn(`⚠️  Auto internal linking skipped: ${err.message}`)
  console.warn("   Commit will continue. Run manually with: node scripts/auto-internal-links.js")
}
