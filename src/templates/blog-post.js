import React, { useEffect } from "react"
import { Link, graphql, navigate } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"
import {
  title,
  meta,
  divider,
  postContent,
  postsNav,
} from "./blog-post.module.scss"

// Destructuring { data, pageContext, location } = props
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = event => {
      // Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt, Shift)
      // This prevents disurpting browser navigation keybaord shortcuts.
      if (event.metaKey || event.ctrlKey) {
        return
      }

      if (event.key === "ArrowLeft" && previous) {
        navigate(previous.fields.slug)
      } else if (event.key === "ArrowRight" && next) {
        navigate(next.fields.slug)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [previous, next])

  const datesLine =
    post.frontmatter.date_updated &&
    post.frontmatter.date_updated !== post.frontmatter.date_published
      ? `Published: ${post.frontmatter.date_published} | Updated: ${post.frontmatter.date_updated}`
      : post.frontmatter.date_published

  return (
    <Layout location={location} title={siteTitle}>
      <article>
        <header>
          <h1 className={title}>{post.frontmatter.title}</h1>
        </header>
        {post?.frontmatter?.status === "draft" && (
          <p>
            <strong>
              (This is a public <strong>draft</strong>. It can contain errors or
              problematic thinking. Read with a teaspoon of salt.)
            </strong>
          </p>
        )}
        {post?.frontmatter?.status === "revisit" && (
          <p>
            <strong>
              (This post has been marked for revisiting, likely because it needs
              a follow-up.)
            </strong>
          </p>
        )}
        {post?.frontmatter?.tags?.includes("Collection") && (
          <p>
            <strong>
              (This is a growing collection, so it's better to think of it as a
              wiki page. Check the updated date below the title for last date of
              update.)
            </strong>
          </p>
        )}
        {post?.frontmatter?.tags?.includes("Strictly 30") && (
          <p>
            <strong>
              (This post was written, edited, and published in under 30 minutes.{" "}
              <Link to="/strictly-30">Learn more</Link>.)
            </strong>
          </p>
        )}
        <section
          className={postContent}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr className={divider} />
        <time className={meta}>{datesLine}</time>
        {/* <hr /> */}
        {/* <footer>
          <Bio location={location} />
        </footer> */}

        {post?.frontmatter?.backlinks &&
          post.frontmatter.backlinks.length > 0 && (
            <>
              <hr />
              <section>
                <p>Posts that link to this one:</p>
                <ul>
                  {post.frontmatter.backlinks.map(backlink => (
                    <li key={backlink.slug}>
                      <Link to={backlink.slug}>{backlink.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
      </article>

      <hr />

      <nav>
        <ul className={postsNav}>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>

    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data, location }) => {
  const post = data.markdownRemark
  return (
    <SearchEngineOptimisation
      title={post.frontmatter.title}
      description={post.frontmatter.excerpt || post.excerpt}
      pathname={location.pathname}
    />
  )
}

// Get a single blog post with specified $slug
// $slug is passed in when createPages Gatsby API is called in gatsby-node.js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        status
        title
        tags
        date_published(formatString: "MMMM D, YYYY")
        date_updated(formatString: "MMMM D, YYYY")
        excerpt
        creation_duration_minutes
        backlinks {
          slug
          title
        }
      }
    }
  }
`
