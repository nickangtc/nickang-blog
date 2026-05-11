import React from "react"
import { graphql, Link } from "gatsby"

import { cardTitle, meta, card, cardLink, excerpt } from "./e.module.scss"
import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const EverythingPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const allPosts = data.allMarkdownRemark.edges.map((post, index) => {
    return (
      <Link to={post.node.fields.slug} className={cardLink}>
        <article key={index} className={card}>
          <h2 className={cardTitle}>{post.node.frontmatter.title}</h2>
          <p className={excerpt}>{post.node.frontmatter.excerpt}</p>
          <p className={meta}>
            {post.node.frontmatter.date_published} |{" "}
            {post.node.frontmatter.fav ? "[🔥]" : ""}{" "}
            {post.node.frontmatter.tags?.join(", ")}
          </p>
        </article>
      </Link>
    )
  })

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Everything</h1>
      <p>
        Literally every post that exists on this blog, listed in reverse
        chronology for easy cmd/ctrl + f search.
      </p>
      <div>{allPosts}</div>
    </Layout>
  )
}

export default EverythingPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Everything" pathname={location.pathname} />
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
        frontmatter: { status: { ne: "draft" }, tags: { ne: "Personal" } }
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
            excerpt
            tags
            fav
            date_published(formatString: "DD MMM YYYY")
          }
        }
      }
    }
  }
`
