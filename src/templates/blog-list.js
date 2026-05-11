import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"
import {
  cardTitle,
  meta,
  card,
  cardLink,
  excerpt,
  postsNav,
  card1,
  card2,
  card3,
} from "./blog-list.module.scss"

const BlogList = ({ data, location, pageContext }) => {
  const pathname = "/blog"
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isSecond = currentPage === 2
  const isLast = currentPage === numPages

  const nextPage = `${pathname}/${(currentPage + 1).toString()}`
  let prevPage = isFirst ? "/" : `${pathname}/${(currentPage - 1).toString()}`
  if (isSecond) {
    // /blog/1 is invalid => /blog is the correct 1st page
    prevPage = pathname
  }

  return (
    <Layout location={location} title={siteTitle}>
      <p>
        Want to see a full list instead of pages of results? Click{" "}
        <Link to="/e">here</Link>.
      </p>

      {posts.map((post, index) => {
        const accentedBorder =
          index === 0 ? card1 : index === 1 ? card2 : index === 2 ? card3 : ""
        return (
          <Link
            to={post.node.fields.slug}
            className={cardLink}
            key={post.node.fields.title}
          >
            <article className={`${card} ${accentedBorder}`}>
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
          excerpt(pruneLength: 300)
          fields {
            slug
          }
          frontmatter {
            date_published(formatString: "DD MMM YYYY")
            title
            excerpt
            tags
            fav
          }
        }
      }
    }
  }
`
