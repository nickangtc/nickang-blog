#!/usr/bin/env node

const { execFileSync, spawn } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

const PROJECT_ROOT = path.resolve(__dirname, "..")
const SKILL_PATH = path.join(PROJECT_ROOT, ".pi", "skills", "internal-linker")
const PI_BIN = process.env.PI_BIN || "pi"
const PI_MODEL = "openai-codex/gpt-5.4-mini"
const PI_TIMEOUT_MS = Number(process.env.AUTO_INTERNAL_LINKS_TIMEOUT_MS || 300000)
const CANDIDATE_LIMIT = Number(process.env.AUTO_INTERNAL_LINKS_CANDIDATE_LIMIT || 8)
const CANDIDATE_READ_LIMIT = Number(process.env.AUTO_INTERNAL_LINKS_CANDIDATE_READ_LIMIT || 3)

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

function getTrackedBlogPosts() {
  return git(["ls-files", "-z", "content/blog"])
    .split("\0")
    .filter(isBlogPostIndex)
}

function parseFrontmatterValue(markdown, key) {
  return markdown.match(new RegExp(`^${key}:\\s*[\"']?(.+?)[\"']?\\s*$`, "m"))?.[1] || ""
}

function getPostSlug(filePath) {
  return `/${filePath.split("/").at(-2)}/`
}

const STOP_WORDS = new Set([
  "about", "after", "again", "also", "because", "before", "being", "between", "could", "didn", "does", "doing", "done", "every", "from", "have", "having", "here", "into", "just", "like", "more", "most", "much", "need", "over", "really", "should", "some", "that", "there", "they", "this", "through", "want", "were", "what", "when", "where", "which", "with", "would", "your",
])

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9-]{2,}/g)
    ?.map(word => word.replace(/^-|-$/g, ""))
    .filter(word => word.length >= 3 && !STOP_WORDS.has(word)) || []
}

function keywordCounts(text) {
  const counts = new Map()
  for (const word of tokenize(text)) counts.set(word, (counts.get(word) || 0) + 1)
  return counts
}

function extractBody(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, "")
}

function cleanExcerpt(text) {
  return String(text || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]+\]\([^)]*\)/g, match => match.replace(/^\[|\]\([^)]*\)$/g, ""))
    .replace(/[#*_>`~]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function makeCandidateExcerpt(body, signals) {
  const lines = body
    .split("\n")
    .map(cleanExcerpt)
    .filter(line => line.length > 40)

  const signalSet = new Set(signals)
  const matchingLine = lines.find(line => tokenize(line).some(word => signalSet.has(word)))
  return (matchingLine || lines[0] || "").slice(0, 320)
}

function pickCandidatePosts(targetFilePath) {
  const targetMarkdown = fs.readFileSync(path.join(PROJECT_ROOT, targetFilePath), "utf8")
  const targetTitle = getMarkdownTitle(targetMarkdown) || ""
  const targetBody = extractBody(targetMarkdown)
  const targetTitleWords = new Set(tokenize(targetTitle))
  const targetCounts = keywordCounts(`${targetTitle}\n${targetBody}`)

  return getTrackedBlogPosts()
    .filter(candidatePath => candidatePath !== targetFilePath)
    .map(candidatePath => {
      const markdown = fs.readFileSync(path.join(PROJECT_ROOT, candidatePath), "utf8")
      const title = getMarkdownTitle(markdown) || parseFrontmatterValue(markdown, "title") || candidatePath.split("/").at(-2)
      const tags = parseFrontmatterValue(markdown, "tags")
      const body = extractBody(markdown)
      const candidateText = `${title}\n${tags}\n${body.slice(0, 6000)}`
      const candidateCounts = keywordCounts(candidateText)
      const shared = []
      let score = 0

      for (const [word, targetCount] of targetCounts) {
        const candidateCount = candidateCounts.get(word) || 0
        if (!candidateCount) continue

        const titleBoost = targetTitleWords.has(word) || title.toLowerCase().includes(word) ? 4 : 1
        const cappedFrequency = Math.min(targetCount, 4) * Math.min(candidateCount, 4)
        score += titleBoost * cappedFrequency
        shared.push({ word, score: titleBoost * cappedFrequency })
      }

      shared.sort((a, b) => b.score - a.score)

      const signals = shared.slice(0, 6).map(item => item.word)

      return {
        path: candidatePath,
        slug: getPostSlug(candidatePath),
        title,
        score,
        signals,
        excerpt: makeCandidateExcerpt(body, signals),
      }
    })
    .filter(candidate => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, CANDIDATE_LIMIT)
}

function formatCandidateShortlist(candidates) {
  if (candidates.length === 0) return "No lexical candidate shortlist was found. Read only the target post and make no changes unless an obvious existing link is already present in the text."

  return candidates
    .map((candidate, index) => [
      `${index + 1}. ${candidate.title} — ${candidate.slug}`,
      `   path: ${candidate.path}`,
      `   signals: ${candidate.signals.join(", ") || "title/metadata"}`,
      `   excerpt: ${candidate.excerpt || "(no excerpt)"}`,
    ].join("\n"))
    .join("\n")
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

function stripAnsi(text) {
  return text
    // Strip OSC sequences such as terminal notifications emitted by pi.
    .replace(/\x1b\][\s\S]*?(?:\x07|\x1b\\)/g, "")
    .replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "")
}

function getToolText(result) {
  return result?.content
    ?.filter(part => part?.type === "text" && typeof part.text === "string")
    .map(part => part.text)
    .join("\n") || ""
}

function getMarkdownTitle(markdown) {
  const frontmatterTitle = markdown.match(/^---\n[\s\S]*?^title:\s*["']?(.+?)["']?\s*$/m)?.[1]
  if (frontmatterTitle) return frontmatterTitle

  return markdown.match(/^#\s+(.+)$/m)?.[1] || null
}

function isArticlePath(filePath) {
  return /^content\/blog\/[^/]+\/index\.md$/.test(filePath || "")
}

function shortCommand(command) {
  return String(command || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180)
}

function createPiJsonReporter(targetFilePath) {
  let stdoutBuffer = ""
  let stderrBuffer = ""
  let assistantLineOpen = false
  const toolCalls = new Map()
  const printedArticles = new Set()

  function printAssistantDelta(delta) {
    if (!delta) return
    if (!assistantLineOpen) {
      process.stdout.write("   💭 ")
      assistantLineOpen = true
    }
    process.stdout.write(delta)
    if (delta.endsWith("\n")) assistantLineOpen = false
  }

  function closeAssistantLine() {
    if (assistantLineOpen) {
      process.stdout.write("\n")
      assistantLineOpen = false
    }
  }

  function describeRead(pathArg, markdown) {
    if (!isArticlePath(pathArg) || printedArticles.has(pathArg)) return
    printedArticles.add(pathArg)

    if (pathArg === targetFilePath) {
      console.log("   📄 reading target post")
      return
    }

    const title = getMarkdownTitle(markdown)
    console.log(`   📚 considering: ${title ? `${title} — ` : ""}${pathArg}`)
  }

  function handleEvent(event) {
    if (event.type === "message_update") {
      const update = event.assistantMessageEvent
      if (update?.type === "text_delta") {
        printAssistantDelta(update.delta)
      } else if (update?.type === "text_end") {
        closeAssistantLine()
      } else if (update?.type === "toolcall_end") {
        const toolCall = update.toolCall
        if (toolCall?.id) toolCalls.set(toolCall.id, toolCall)
      }
      return
    }

    if (event.type === "tool_execution_start") {
      closeAssistantLine()
      toolCalls.set(event.toolCallId, {
        name: event.toolName,
        arguments: event.args || {},
      })

      if (event.toolName === "bash") {
        const command = shortCommand(event.args?.command)
        if (/content\/blog|rg |grep |find |ls-files/.test(command)) {
          console.log(`   🔍 searching candidate posts: ${command}`)
        } else {
          console.log(`   🔧 bash: ${command}`)
        }
      } else if (event.toolName === "edit") {
        console.log("   ✏️  applying internal-link edit")
      }
      return
    }

    if (event.type === "tool_execution_end") {
      const toolCall = toolCalls.get(event.toolCallId)
      if (event.toolName === "read") {
        describeRead(toolCall?.arguments?.path, getToolText(event.result))
      } else if (event.result?.isError) {
        console.log(`   ⚠️  ${event.toolName} failed`)
      }
      return
    }

    if (event.type === "message_end" && event.message?.role === "assistant") {
      closeAssistantLine()
      const usage = event.message.usage
      if (usage?.totalTokens) {
        console.log(`   📊 turn tokens: ${usage.totalTokens}`)
      }
    }
  }

  function consumeLine(line, fallbackStream) {
    const cleaned = stripAnsi(line).trim()
    if (!cleaned) return

    try {
      handleEvent(JSON.parse(cleaned))
    } catch (_err) {
      // Suppress verbose provider/request debug dumps. Keep only concise, non-JSON diagnostics.
      if (!/(request|response|headers|body|messages|input|tools|authorization|api[_-]?key)/i.test(cleaned)) {
        fallbackStream.write(`   ${cleaned}\n`)
      }
    }
  }

  function pushStdout(chunk) {
    stdoutBuffer += chunk
    const lines = stdoutBuffer.split("\n")
    stdoutBuffer = lines.pop() || ""
    lines.forEach(line => consumeLine(line, process.stdout))
  }

  function pushStderr(chunk) {
    stderrBuffer += chunk
    const lines = stderrBuffer.split("\n")
    stderrBuffer = lines.pop() || ""
    lines.forEach(line => consumeLine(line, process.stderr))
  }

  function finish() {
    if (stdoutBuffer) consumeLine(stdoutBuffer, process.stdout)
    if (stderrBuffer) consumeLine(stderrBuffer, process.stderr)
    closeAssistantLine()
  }

  return { pushStdout, pushStderr, finish }
}

function runPiInternalLinker(filePath) {
  const candidates = pickCandidatePosts(filePath)
  console.log(`   shortlisted candidate posts: ${candidates.length} (limit ${CANDIDATE_LIMIT})`)

  const prompt = [
    `Use the internal-linker skill on this newly created blog post: ${filePath}`,
    "Find and add only strong internal links to older posts.",
    "Edit only this target file. If no strong opportunities exist, make no changes.",
    "",
    "To keep this hook fast, use the ranked candidate shortlist below instead of doing an exhaustive search.",
    "The shortlist includes enough metadata/excerpts to decide in many cases without reading every candidate in full.",
    `Read the target post, then read at most ${CANDIDATE_READ_LIMIT} full candidate posts from this shortlist only if you need more confidence before deciding.`,
    "Do not broaden the search beyond this shortlist during the automated hook run.",
    "",
    "Candidate shortlist:",
    formatCandidateShortlist(candidates),
    "",
    "In your final response, include a concise summary of every link added and why it is relevant.",
  ].join("\n")
  const piArgs = [
    "--print",
    "--no-session",
    "--model",
    PI_MODEL,
    "--thinking",
    "high",
    "--mode",
    "json",
    "--no-context-files",
    "--skill",
    SKILL_PATH,
    "--tools",
    "read,edit",
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
    const reporter = createPiJsonReporter(filePath)

    child.stdout.on("data", chunk => {
      stdout += chunk
      reporter.pushStdout(chunk)
    })
    child.stderr.on("data", chunk => {
      stderr += chunk
      reporter.pushStderr(chunk)
    })

    child.on("error", err => {
      clearTimeout(timeout)
      reject(err)
    })

    child.on("close", status => {
      clearTimeout(timeout)
      reporter.finish()

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
