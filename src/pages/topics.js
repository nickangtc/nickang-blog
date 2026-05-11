import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import {
  list,
  listItem,
  hyperlink,
  twoColumnFlexContainer,
  twoColumnFlexItem,
  sectionHeading,
} from "./topics.module.scss"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

// string interpolations are not allowed in graphql fragments,
// so remember to update graphql query filter below too.
const TAGS_TO_SHOW_AS_TOPICS = [
  "Tech",
  "Living",
  "Creativity",
  "Annual Review",
  "Leadership",
  "Communication",
  "Interviewing",
  "Good intentions",
]

const _groupByTag = (articles = []) => {
  const articlesByTag = {}
  articles.forEach(article => {
    article.node.frontmatter.tags.forEach(tag => {
      if (TAGS_TO_SHOW_AS_TOPICS.includes(tag)) {
        articlesByTag[tag] = articlesByTag[tag]
          ? [...articlesByTag[tag], article]
          : [article]
      }
    })
  })
  return articlesByTag
}

const tagToSectionHeading = tag => {
  const map = {
    Tech: "🤖 Tech",
    Living: "😊 Living",
    Creativity: "🌌 Creativity",
    "Annual Review": "📆 Annual Review",
    Leadership: "🙇🏻‍♂️ Leadership",
    Communication: "🗣 Communication",
    Interviewing: "💼 Interviewing",
    "Good intentions": "🤞 Good intentions (and how they play out)",
  }
  return map[tag]
}

const tagToPageSlug = tag => {
  // the strings are the page filenames
  const map = {
    Tech: "tech",
    Living: "living",
    Creativity: "creativity",
    "Annual Review": "annual-review",
    Leadership: "leadership",
    Communication: "communication",
    Interviewing: "interviewing",
    "Good intentions": "gi",
  }
  return map[tag]
}

const TopicsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const articlesByTag = _groupByTag(data.allMarkdownRemark.edges)
  const topicSections = Object.keys(articlesByTag)
    .sort()
    .map(tag => {
      const max = 5
      const articlesList = articlesByTag[tag]
        .slice(0, max)
        .map((article, index) => {
          return (
            <li key={tag + index} className={listItem}>
              <Link to={article.node.fields.slug} className={hyperlink}>
                {article.node.frontmatter.title}
              </Link>
            </li>
          )
        })
      return (
        <section key={tag} className={twoColumnFlexItem}>
          <h3 className={sectionHeading}>
            <Link to={`/${tagToPageSlug(tag)}`} className={hyperlink}>
              {tagToSectionHeading(tag)}
            </Link>
          </h3>
          <ul className={list}>{articlesList}</ul>
          <Link to={`/${tagToPageSlug(tag)}`} className={hyperlink}>
            <em>
              Read all {`${articlesByTag[tag].length}`} articles on {tag} →
            </em>
          </Link>
        </section>
      )
    })

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Articles by Topic</h1>
      <p>
        This blog is plenty messy since I write about anything that I find
        interesting, but over the years a few main topics have emerged. This
        page organises articles I've written by those emergent topics.
      </p>
      <p>
        Have fun reading!{" "}
        <span role="img" aria-label="rabbit and hole emojis for fun">
          🕳️ 🕳️ 🕳️ 🐇
        </span>
      </p>
      <div className={twoColumnFlexContainer}>{topicSections}</div>
    </Layout>
  )
}

export default TopicsPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Topics" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          tags: {
            in: [
              "Tech"
              "Living"
              "Creativity"
              "Annual Review"
              "Leadership"
              "Communication"
              "Interviewing"
              "Good intentions"
            ]
          }
        }
      }
      sort: { frontmatter: { date_published: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            fav
            tags
          }
        }
      }
    }
  }
`
