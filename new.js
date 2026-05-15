const fs = require("fs")
const program = require("commander")
const { prompt } = require("inquirer")

var yesNo = {
  yes: true,
  no: false,
}

/**
 * COMMANDER TERMINAL INTERFACE
 */
const questions = [
  {
    type: "list",
    name: "shouldGenerateImagesFolder",
    message: "Generate /images subfolder? ...",
    choices: Object.keys(yesNo),
  },
]

program
  .version("0.0.1")
  .description("Generate a new folder that contains a blog post")

program
  .command("post")
  .alias("p")
  .description("Generate a new post folder")
  .action(() => {
    prompt(questions).then(answers => {
      generatePostFolder(answers)
    })
  })

program.parse(process.argv)

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

const generatePostFolder = async function ({ shouldGenerateImagesFolder }) {
  const blogDir = __dirname + "/content/blog"
  const date = getCurrentDate()
  const newPostDir = getUniqueUntitledPostDir(blogDir)
  console.log("newPostDir:", newPostDir)

  try {
    fs.mkdirSync(newPostDir)

    if (yesNo[shouldGenerateImagesFolder]) {
      fs.mkdirSync(`${newPostDir}/images`, { recursive: true })
    }

    const frontmatter = `---
title: ""
date_published: "${date}"
date_updated: "${date}"
excerpt:
tags: ["Tech", "Money", "Interviewing", "Career", "Living", "Creativity", "Leadership", "Communication", "Productivity", "Good intentions", "Parenting", "Daily Reflection"]
fav: false
creation_duration_minutes:
backlinks:
---

`

    fs.writeFileSync(newPostDir + "/index.md", frontmatter)
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
