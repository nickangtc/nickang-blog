import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"
import PageIntro from "../components/page-intro"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const LeadershipPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <PageIntro title="Leadership">
        <p>Articles about being a leader.</p>
      </PageIntro>
      <PostList posts={posts} />
    </Layout>
  )
}

export default LeadershipPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Leadership Articles" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" }, tags: { in: "Leadership" } } }
      sort: { frontmatter: { date_published: DESC } }
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            title
            date_published(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
