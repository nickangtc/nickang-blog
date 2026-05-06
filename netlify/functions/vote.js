const { getStore } = require("@netlify/blobs")

const STORE_NAME = "article-idea-votes"

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}

exports.handler = async event => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" }
  }

  const store = getStore(STORE_NAME)

  if (event.httpMethod === "GET") {
    return handleGet(store)
  }

  if (event.httpMethod === "POST") {
    return handlePost(store, event)
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: "Method not allowed" }),
  }
}

async function handleGet(store) {
  try {
    const { blobs } = await store.list()
    const counts = {}

    for (const blob of blobs) {
      const data = await store.get(blob.key, { type: "json" })
      counts[blob.key] = data ? data.voters.length : 0
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ counts }),
    }
  } catch (error) {
    console.error("Error fetching vote counts:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch vote counts" }),
    }
  }
}

async function handlePost(store, event) {
  try {
    const { ideaId, email } = JSON.parse(event.body)

    if (!ideaId || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "ideaId and email are required" }),
      }
    }

    const normalizedEmail = email.toLowerCase().trim()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email address" }),
      }
    }

    let data = await store.get(ideaId, { type: "json" })
    if (!data) {
      data = { voters: [] }
    }

    const alreadyVoted = data.voters.some(v => v.email === normalizedEmail)
    if (alreadyVoted) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          error: "You have already voted for this idea",
          voteCount: data.voters.length,
        }),
      }
    }

    data.voters.push({
      email: normalizedEmail,
      votedAt: new Date().toISOString(),
    })

    await store.setJSON(ideaId, data)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Vote recorded",
        voteCount: data.voters.length,
      }),
    }
  } catch (error) {
    console.error("Error recording vote:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to record vote" }),
    }
  }
}
