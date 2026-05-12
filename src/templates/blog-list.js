import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"
import {
  articleTitle,
  meta,
  postsNav,
  entry,
  divider,
  body,
} from "./blog-list.module.scss"

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
      {posts.map(post => {
        const published = post.node.frontmatter.date_published

        return (
          <article className={entry} key={post.node.fields.slug}>
            <h1 className={articleTitle}>
              <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
            </h1>
            <div
              className={body}
              dangerouslySetInnerHTML={{ __html: post.node.html }}
            />
            <hr className={divider} />
            <p className={meta}>{published}</p>
          </article>
        )
      })}

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
            date_published(formatString: "DD MMM YYYY")
            title
          }
        }
      }
    }
  }
`
