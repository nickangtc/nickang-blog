#!/usr/bin/env node

const fs = require("node:fs/promises")
const path = require("node:path")

const PROJECT_ROOT = path.resolve(__dirname, "..")
const BLOG_ROOT = path.join(PROJECT_ROOT, "content", "blog")
const MODEL = "gpt-5.4-mini"
const DEFAULT_CONCURRENCY = 8
const MAX_ATTEMPTS = 5

function parseArgs(argv) {
  const args = {
    concurrency: DEFAULT_CONCURRENCY,
    dryRun: false,
    force: false,
    limit: Infinity,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]

    if (arg === "--dry-run") {
      args.dryRun = true
    } else if (arg === "--force") {
      args.force = true
    } else if (arg === "--concurrency") {
      args.concurrency = Number(argv[++i])
    } else if (arg === "--limit") {
      args.limit = Number(argv[++i])
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (!Number.isInteger(args.concurrency) || args.concurrency < 1) {
    throw new Error("--concurrency must be a positive integer")
  }

  if (
    args.limit !== Infinity &&
    (!Number.isInteger(args.limit) || args.limit < 1)
  ) {
    throw new Error("--limit must be a positive integer")
  }

  return args
}

async function findPostFiles() {
  const entries = await fs.readdir(BLOG_ROOT, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const filePath = path.join(BLOG_ROOT, entry.name, "index.md")
    try {
      await fs.access(filePath)
      files.push(filePath)
    } catch (_error) {
      // Ignore content directories without an index.md.
    }
  }

  return files.sort()
}

function splitFrontmatter(markdown, filePath) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/)
  if (!match) {
    throw new Error(`Could not parse frontmatter in ${filePath}`)
  }

  return {
    frontmatter: match[1],
    body: markdown.slice(match[0].length),
    newline: match[0].includes("\r\n") ? "\r\n" : "\n",
  }
}

function hasSummary(frontmatter) {
  return /^ai_summary\s*:/m.test(frontmatter)
}

function getTitle(frontmatter) {
  const match = frontmatter.match(/^title:\s*(.+)\s*$/m)
  if (!match) return ""

  const rawTitle = match[1].trim()
  try {
    return JSON.parse(rawTitle)
  } catch (_error) {
    return rawTitle.replace(/^["']|["']$/g, "")
  }
}

function cleanBodyForPrompt(body) {
  return body
    .replace(/```[\s\S]*?```/g, "[code sample omitted]")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function extractOutputText(response) {
  if (typeof response.output_text === "string") {
    return response.output_text.trim()
  }

  return (response.output || [])
    .flatMap(item => item.content || [])
    .filter(item => item.type === "output_text")
    .map(item => item.text)
    .join("")
    .trim()
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateSummary({ apiKey, title, body }) {
  const prompt = [
    "Summarise this personal blog post in 2-3 concise sentences.",
    "Capture the specific subject, the author's main point, and any useful conclusion.",
    "Write in neutral third person. Do not use Markdown, headings, labels, or quotation marks around the answer.",
    "Do not mention that this is a summary. Return only the summary text.",
    "",
    `Title: ${title}`,
    "",
    body,
  ].join("\n")

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    let response
    try {
      response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          input: prompt,
          max_output_tokens: 220,
          reasoning: { effort: "low" },
          text: { verbosity: "low" },
        }),
      })
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) throw error
      await delay(1000 * 2 ** (attempt - 1) + Math.random() * 500)
      continue
    }

    if (response.ok) {
      const data = await response.json()
      const summary = extractOutputText(data).replace(/\s+/g, " ").trim()
      if (!summary) throw new Error("OpenAI returned an empty summary")
      return summary
    }

    const errorBody = await response.text()
    const retryable = response.status === 429 || response.status >= 500
    if (!retryable || attempt === MAX_ATTEMPTS) {
      throw new Error(
        `OpenAI request failed (${response.status}): ${errorBody.slice(0, 500)}`
      )
    }

    const retryAfter = response.headers.get("retry-after")
    const retryAfterSeconds = retryAfter === null ? NaN : Number(retryAfter)
    const backoffMs = Number.isFinite(retryAfterSeconds)
      ? Math.max(retryAfterSeconds * 1000, 250)
      : 1000 * 2 ** (attempt - 1) + Math.random() * 500
    await delay(backoffMs)
  }

  throw new Error("OpenAI request failed after retries")
}

function addSummary(parsed, summary) {
  const summaryLine = `ai_summary: ${JSON.stringify(summary)}`
  const updatedFrontmatter = parsed.frontmatter.replace(
    /^ai_summary\s*:.*$/m,
    summaryLine
  )
  const nextFrontmatter =
    updatedFrontmatter === parsed.frontmatter
      ? `${parsed.frontmatter}${parsed.newline}${summaryLine}`
      : updatedFrontmatter

  return [
    "---",
    nextFrontmatter,
    "---",
    parsed.body
      ? `${parsed.body.startsWith(parsed.newline) ? "" : parsed.newline}${
          parsed.body
        }`
      : "",
  ].join(parsed.newline)
}

async function writeAtomically(filePath, contents) {
  const temporaryPath = `${filePath}.ai-summary.tmp`
  await fs.writeFile(temporaryPath, contents, "utf8")
  await fs.rename(temporaryPath, filePath)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set")
  }

  const files = await findPostFiles()
  const pending = []
  let skipped = 0

  for (const filePath of files) {
    const markdown = await fs.readFile(filePath, "utf8")
    const parsed = splitFrontmatter(markdown, filePath)

    if (!args.force && hasSummary(parsed.frontmatter)) {
      skipped += 1
      continue
    }

    pending.push({ filePath, parsed })
    if (pending.length >= args.limit) break
  }

  console.log(
    `Found ${files.length} posts: ${pending.length} to summarise, ${skipped} already complete.`
  )

  if (args.dryRun) {
    for (const item of pending) {
      console.log(path.relative(PROJECT_ROOT, item.filePath))
    }
    return
  }

  let cursor = 0
  let completed = 0
  const failures = []

  async function worker() {
    while (cursor < pending.length) {
      const item = pending[cursor++]
      const relativePath = path.relative(PROJECT_ROOT, item.filePath)

      try {
        const summary = await generateSummary({
          apiKey,
          title: getTitle(item.parsed.frontmatter),
          body: cleanBodyForPrompt(item.parsed.body),
        })
        const updatedMarkdown = addSummary(item.parsed, summary)
        await writeAtomically(item.filePath, updatedMarkdown)
        completed += 1
        console.log(`[${completed}/${pending.length}] ${relativePath}`)
      } catch (error) {
        failures.push({ relativePath, message: error.message })
        console.error(`Failed: ${relativePath}: ${error.message}`)
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(args.concurrency, pending.length) }, () =>
      worker()
    )
  )

  console.log(`Completed ${completed} posts with ${failures.length} failures.`)
  if (failures.length > 0) {
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
