import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const PkmPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const pkmPosts = data.allMarkdownRemark.edges.map((post, index) => {
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
  })

  return (
    <Layout location={location} title={siteTitle}>
      <h1>PKM articles</h1>
      <p>Articles about Personal Knowledge Management (PKM).</p>
      <p>
        I've received some emails asking questions about how I set up my PKM and
        so I feel obligated to say this: I'm still figuring this stuff out.
        Please take what I write about PKM (and everything else) with a grain of
        salt and always apply only what should apply to your context.
      </p>
      <ul>{pkmPosts}</ul>
    </Layout>
  )
}

export default PkmPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="PKM Articles" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: "PKM" } } }
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
