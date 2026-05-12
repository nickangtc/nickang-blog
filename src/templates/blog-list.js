import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"
import SearchEngineOptimisation from "../components/searchengineoptimisation"
import { postsNav } from "./blog-list.module.scss"

const BlogList = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  const nextPage = isLast ? null : `/${(currentPage + 1).toString()}`
  const prevPage = isFirst
    ? null
    : currentPage === 2
    ? "/"
    : `/${(currentPage - 1).toString()}`

  return (
    <Layout location={location} title={siteTitle}>
      <PostList posts={posts} />

      <nav>
        <ul className={postsNav}>
          <li>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Newer posts
              </Link>
            )}
          </li>
          <li>
            Page {currentPage} / {numPages}
          </li>
          <li>
            {!isLast && (
              <Link to={nextPage} rel="next">
                Older posts →
              </Link>
            )}
          </li>
        </ul>
      </nav>
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
        frontmatter: { status: { ne: "draft" }, tags: { ne: "Personal" } }
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
