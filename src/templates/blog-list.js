import React from "react"
import { graphql } from "gatsby"

import InfinitePostList from "../components/infinite-post-list"
import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const BlogList = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const { currentPage, numPages } = pageContext
  const nextPage = currentPage === numPages ? null : `/${currentPage + 1}`

  return (
    <Layout location={location} title={siteTitle}>
      <InfinitePostList initialPosts={posts} initialNextPath={nextPage} />
    </Layout>
  )
}

export default BlogList

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Blog posts" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query pageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          status: { ne: "draft" }
          tags: { nin: ["Personal", "Project"] }
        }
      }
      sort: { frontmatter: { date_published: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            date_published(formatString: "MMMM D, YYYY")
            title
          }
        }
      }
    }
  }
`
