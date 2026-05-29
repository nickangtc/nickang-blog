#!/usr/bin/env node

const { execFileSync, spawn } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

const PROJECT_ROOT = path.resolve(__dirname, "..")
const SKILL_PATH = path.join(PROJECT_ROOT, ".pi", "skills", "internal-linker")
const PI_BIN = process.env.PI_BIN || "pi"
const PI_MODEL = "openai-codex/gpt-5.4-mini"
const PI_TIMEOUT_MS = Number(process.env.AUTO_INTERNAL_LINKS_TIMEOUT_MS || 300000)

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
    "In your final response, include a concise summary of every link added and why it is relevant.",
  ].join("\n")
  const piArgs = [
    "--print",
    "--no-session",
    "--model",
    PI_MODEL,
    "--mode",
    "json",
    "--skill",
    SKILL_PATH,
    "--tools",
    "read,bash,edit",
    prompt,
  ]

  return new Promise((resolve, reject) => {
    console.log(`   launching: ${PI_BIN} ${piArgs.slice(0, -1).join(" ")} <prompt>`)
    console.log(`   model: ${PI_MODEL}`)
    console.log(`   timeout: ${Math.round(PI_TIMEOUT_MS / 1000)}s (override with AUTO_INTERNAL_LINKS_TIMEOUT_MS)`)

    const child = spawn(
      PI_BIN,
      piArgs,
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
      process.stdout.write(chunk)
    })
    child.stderr.on("data", chunk => {
      stderr += chunk
      process.stderr.write(chunk)
    })

    child.on("error", err => {
      clearTimeout(timeout)
      reject(err)
    })

    child.on("close", status => {
      clearTimeout(timeout)

      if (timedOut) {
        reject(new Error(`pi timed out after ${Math.round(PI_TIMEOUT_MS / 1000)}s. It may still be reading/searching candidate posts or waiting on the LLM/API. Increase AUTO_INTERNAL_LINKS_TIMEOUT_MS to allow a longer run.`))
        return
      }

      if (status !== 0) {
        const errOutput = stderr.trim() || stdout.trim()
        reject(new Error(`pi exited with status ${status}${errOutput ? `\n${errOutput}` : ""}`))
        return
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

  console.log("🔎 Looking for new blog posts eligible for AI internal linking...")
  const stagedPosts = getNewStagedBlogPosts()
  const untrackedPosts = getUntrackedBlogPosts()
  const posts = [...new Set([...stagedPosts, ...untrackedPosts])]

  console.log(`   staged new posts: ${stagedPosts.length}`)
  console.log(`   untracked new posts: ${untrackedPosts.length}`)

  if (posts.length === 0) {
    console.log("   none found; skipping AI internal linking")
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
