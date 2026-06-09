#!/usr/bin/env node

const SITE_URL = "https://nickang.com"
const SITE_HOST = "nickang.com"
const INDEXNOW_KEY = "68614f22003bbffdf5b21dbb83d5ac93"
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

function normalizeUrl(value) {
  const trimmed = value.trim()
  if (!trimmed) return null

  const url = trimmed.startsWith("http")
    ? new URL(trimmed)
    : new URL(`/${trimmed.replace(/^\/+|\/+$/g, "")}/`, SITE_URL)

  if (url.hostname !== SITE_HOST) {
    throw new Error(`URL must belong to ${SITE_HOST}: ${value}`)
  }

  return url.href
}

async function main() {
  const urlList = [
    ...new Set(process.argv.slice(2).map(normalizeUrl).filter(Boolean)),
  ]

  if (urlList.length === 0) {
    throw new Error(
      "Pass one or more post slugs or nickang.com URLs to notify IndexNow."
    )
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(
      `IndexNow request failed (${response.status}): ${body.slice(0, 500)}`
    )
  }

  console.log(`Notified IndexNow about ${urlList.length} URL(s):`)
  for (const url of urlList) console.log(url)
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
