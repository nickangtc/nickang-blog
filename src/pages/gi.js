import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const GoodIntentionsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const goodIntentionsPosts = data.allMarkdownRemark.edges.map(
    (post, index) => {
      return (
        <li key={index}>
          {post.node.frontmatter.date_published} -{" "}
          <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
          {post.node.frontmatter.fav && (
            <span
              role="img"
              aria-label="fire emoji indicating this article is a favourite"
            >
              {" "}
              🔥
            </span>
          )}
        </li>
      )
    }
  )

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Good intentions</h1>
      <p>
        Where I track all my good intentions and whether they play out as
        expected.
      </p>
      <ul>{goodIntentionsPosts}</ul>
    </Layout>
  )
}

export default GoodIntentionsPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Good intentions" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: "Good intentions" } } }
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
            date_published(formatString: "DD MMM YYYY")
          }
        }
      }
    }
  }
`
