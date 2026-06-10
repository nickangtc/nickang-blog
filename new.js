const fs = require("node:fs")
const { execFileSync } = require("node:child_process")

/**
 * TERMINAL INTERFACE
 */

async function main() {
  const command = process.argv[2]

  if (command === "post" || command === "p") {
    await generatePostFolder()
    return
  }

  printHelp()
}

function printHelp() {
  console.log(`Generate a new folder that contains a blog post

Usage:
  node new.js post
  node new.js p`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

/**
 * MAIN PROCESS
 */

/**
 * Sanitize post title for use as URL slug
 * Removes or replaces URL-unsafe characters
 */
function sanitizeSlug(title) {
  return title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9\-]/g, "") // Remove all non-alphanumeric and non-hyphen characters
}

async function generatePostFolder() {
  const blogDir = __dirname + "/content/blog"
  const date = getCurrentDate()
  const newPostDir = getUniqueUntitledPostDir(blogDir)
  console.log("newPostDir:", newPostDir)

  try {
    fs.mkdirSync(newPostDir)
    fs.mkdirSync(`${newPostDir}/images`, { recursive: true })

    const frontmatter = `---
title: ""
date_published: "${date}"
date_updated: "${date}"
excerpt:
tags: ["AI", "Tech", "Business", "Money", "Interviewing", "Career", "Living", "Creativity", "Leadership", "Communication", "Productivity", "Good intentions", "Parenting", "PKM", "Annual Review", "Books", "Fiction", "Announcement", "Daily Reflection"]
fav: false
creation_duration_minutes:
backlinks:
---

`

    fs.writeFileSync(newPostDir + "/index.md", frontmatter)
    execFileSync("code", [newPostDir], { stdio: "inherit" })
  } catch (err) {
    throw err
  }
}

function getCurrentDate() {
  const d = new Date()
  const year = d.getFullYear()
  let month = "" + (d.getMonth() + 1)
  let day = "" + d.getDate()

  if (month.length < 2) {
    month = "0" + month
  }
  if (day.length < 2) {
    day = "0" + day
  }
  return [year, month, day].join("-")
}

function getCurrentTimestamp() {
  const d = new Date()
  const date = getCurrentDate()
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  const seconds = String(d.getSeconds()).padStart(2, "0")

  return `${date}-${hours}${minutes}${seconds}`
}

function getUniqueUntitledPostDir(blogDir) {
  const baseDir = `${blogDir}/untitled-${getCurrentTimestamp()}`

  if (!fs.existsSync(baseDir)) {
    return baseDir
  }

  let counter = 2
  let candidate = `${baseDir}-${counter}`

  while (fs.existsSync(candidate)) {
    counter += 1
    candidate = `${baseDir}-${counter}`
  }

  return candidate
}
