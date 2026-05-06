import React, { useState, useEffect, useCallback } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"
import ideas from "../../content/ideas.json"
import {
  ideaCard,
  ideaTitle,
  ideaDescription,
  voteSection,
  voteCount,
  voteForm,
  emailInput,
  voteButton,
  votedMessage,
  errorMessage,
  disclaimer,
  ideasList,
  pageIntro,
} from "./ideas.module.scss"

const STORAGE_KEY = "voted_ideas"

const getVotedIdeas = () => {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const markAsVoted = ideaId => {
  const voted = getVotedIdeas()
  if (!voted.includes(ideaId)) {
    voted.push(ideaId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(voted))
  }
}

const IdeaCard = ({ idea, initialVoteCount, hasVoted: alreadyVoted }) => {
  const [email, setEmail] = useState("")
  const [hasVoted, setHasVoted] = useState(alreadyVoted)
  const [count, setCount] = useState(initialVoteCount)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setCount(initialVoteCount)
  }, [initialVoteCount])

  useEffect(() => {
    setHasVoted(alreadyVoted)
  }, [alreadyVoted])

  const handleVote = async e => {
    e.preventDefault()
    setError("")

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/.netlify/functions/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId: idea.id, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          markAsVoted(idea.id)
          setHasVoted(true)
        } else {
          setError(data.error || "Something went wrong. Please try again.")
        }
        return
      }

      markAsVoted(idea.id)
      setHasVoted(true)
      setCount(data.voteCount)
      setEmail("")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <li className={ideaCard}>
      <h3 className={ideaTitle}>{idea.title}</h3>
      <p className={ideaDescription}>{idea.description}</p>
      <div className={voteSection}>
        <span className={voteCount}>
          {count} {count === 1 ? "vote" : "votes"}
        </span>
        {hasVoted ? (
          <p className={votedMessage}>
            You voted for this — you'll be notified when it's published!
          </p>
        ) : showForm ? (
          <form onSubmit={handleVote} className={voteForm}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={emailInput}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className={voteButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Voting..." : "Vote"}
            </button>
            {error && <p className={errorMessage}>{error}</p>}
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className={voteButton}>
            I'd read this!
          </button>
        )}
      </div>
    </li>
  )
}

const IdeasPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const [voteCounts, setVoteCounts] = useState({})
  const [votedIdeas, setVotedIdeas] = useState([])

  const fetchVoteCounts = useCallback(async () => {
    try {
      const response = await fetch("/.netlify/functions/vote")
      if (response.ok) {
        const data = await response.json()
        setVoteCounts(data.counts || {})
      }
    } catch {
      // Vote counts will show as 0 if fetch fails
    }
  }, [])

  useEffect(() => {
    setVotedIdeas(getVotedIdeas())
    fetchVoteCounts()
  }, [fetchVoteCounts])

  return (
    <Layout location={location} title={siteTitle}>
      <SearchEngineOptimisation title="Article Ideas" location={location} />
      <h1>Article Ideas</h1>
      <p className={pageIntro}>
        These are articles I'm thinking about writing. Vote on the ones you'd
        like to read — I'll prioritise the most requested ones and notify you
        when they're published.
      </p>
      <p className={disclaimer}>
        Your email will only be used to notify you when an article you voted for
        is published. Nothing else.
      </p>
      <ul className={ideasList}>
        {ideas.map(idea => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            initialVoteCount={voteCounts[idea.id] || 0}
            hasVoted={votedIdeas.includes(idea.id)}
          />
        ))}
      </ul>
    </Layout>
  )
}

export default IdeasPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
