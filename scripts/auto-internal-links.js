#!/usr/bin/env node

const { execFileSync, spawn } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

const PROJECT_ROOT = path.resolve(__dirname, "..")
const SKILL_PATH = path.join(PROJECT_ROOT, ".pi", "skills", "internal-linker")
const PI_BIN = process.env.PI_BIN || "pi"
const PI_TIMEOUT_MS = Number(process.env.AUTO_INTERNAL_LINKS_TIMEOUT_MS || 60000)

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

function isBlogPostIndex(filePath) {
  return /^content\/blog\/[^/]+\/index\.md$/.test(filePath)
}

function isEligibleNewBlogPost(filePath) {
  return Boolean(filePath)
    && isBlogPostIndex(filePath)
    && !filePath.includes("/untitled-")
    && fs.existsSync(path.join(PROJECT_ROOT, filePath))
    && !pathExistsInHead(filePath)
}

function getNewStagedBlogPosts() {
  return parseStagedNameStatus()
    .map(entry => entry.path)
    .filter(isEligibleNewBlogPost)
}

function getUntrackedBlogPosts() {
  return git(["ls-files", "--others", "--exclude-standard", "-z", "content/blog"])
    .split("\0")
    .filter(isEligibleNewBlogPost)
}

function killProcessGroup(child, signal) {
  if (!child.pid) return

  try {
    process.kill(-child.pid, signal)
  } catch (_err) {
    try {
      child.kill(signal)
    } catch (_childErr) {
      // Already exited.
    }
  }
}

function runPiInternalLinker(filePath) {
  const prompt = [
    `Use the internal-linker skill on this newly created blog post: ${filePath}`,
    "Find and add only strong internal links to older posts.",
    "Edit only this target file. If no strong opportunities exist, make no changes.",
  ].join("\n")

  return new Promise((resolve, reject) => {
    const child = spawn(
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
        detached: true,
        stdio: ["ignore", "pipe", "pipe"],
      }
    )

    let stdout = ""
    let stderr = ""
    let timedOut = false

    const timeout = setTimeout(() => {
      timedOut = true
      killProcessGroup(child, "SIGTERM")
      setTimeout(() => killProcessGroup(child, "SIGKILL"), 2000).unref()
    }, PI_TIMEOUT_MS)
    timeout.unref()

    child.stdout.setEncoding("utf8")
    child.stderr.setEncoding("utf8")
    child.stdout.on("data", chunk => {
      stdout += chunk
    })
    child.stderr.on("data", chunk => {
      stderr += chunk
    })

    child.on("error", err => {
      clearTimeout(timeout)
      reject(err)
    })

    child.on("close", status => {
      clearTimeout(timeout)

      if (timedOut) {
        reject(new Error(`pi timed out after ${Math.round(PI_TIMEOUT_MS / 1000)}s`))
        return
      }

      if (status !== 0) {
        const errOutput = stderr.trim() || stdout.trim()
        reject(new Error(`pi exited with status ${status}${errOutput ? `\n${errOutput}` : ""}`))
        return
      }

      if (stdout.trim()) {
        console.log(stdout.trim())
      }
      resolve()
    })
  })
}

async function main() {
  if (process.env.SKIP_AUTO_INTERNAL_LINKS === "1") {
    console.log("⏭️  Skipping AI internal linking because SKIP_AUTO_INTERNAL_LINKS=1")
    return
  }

  if (!fs.existsSync(SKILL_PATH)) {
    console.warn(`⚠️  Internal linker skill not found at ${path.relative(PROJECT_ROOT, SKILL_PATH)}`)
    return
  }

  const posts = [...new Set([...getNewStagedBlogPosts(), ...getUntrackedBlogPosts()])]

  if (posts.length === 0) {
    return
  }

  console.log(`🔎 AI internal linking for ${posts.length} new post${posts.length === 1 ? "" : "s"}...`)

  for (const filePath of posts) {
    console.log(`\n→ ${filePath}`)
    await runPiInternalLinker(filePath)
    execFileSync("git", ["add", "--", filePath], { cwd: PROJECT_ROOT, stdio: "inherit" })
  }
}

main().catch(err => {
  console.warn(`⚠️  Auto internal linking skipped: ${err.message}`)
  console.warn("   Commit will continue. Run manually with: node scripts/auto-internal-links.js")
})
