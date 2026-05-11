import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import { articles, navItem } from "./index.module.scss"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const newestPostsData = data.allMarkdownRemark.edges
  const newestPosts = newestPostsData.map((post, index) => {
    return (
      <li key={index}>
        <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
      </li>
    )
  })

  return (
    <Layout location={location} title={siteTitle}>
      <h1 id="my-digital-garden">
        Hey, I'm Nick.{" "}
        <span role="img" aria-label="hand wave emoji">
          👋
        </span>
      </h1>
      <p>
        I'm a dad, husband, senior software engineer, and all-around avid
        learner. I currently live in Düsseldorf, Germany 🇩🇪 and am originally
        from Singapore 🇸🇬.
      </p>
      <p>
        I write and publish regularly my learnings on living a calm, joyful life
        through consistent and kind introspection that I make public as
        dispatches to my newsletter subscribers.
      </p>
      <p>
        <iframe
          src="https://nickang.substack.com/embed"
          width="100%"
          height="320"
          style={{ border: "1px solid #EEE", background: "white" }}
          frameborder="0"
          title="Subscribe to In the End newsletter"
        ></iframe>
      </p>
      <p>
        For a structured walk around this place, browse{" "}
        <Link to="/topics">by topic</Link>.
      </p>
      <p>Thanks for reading!</p>
      <h3>Popular articles</h3>
      <ul className={articles}>{newestPosts}</ul>
      <nav>
        <p>
          <Link to="/blog" className={navItem}>
            Browse all articles →
          </Link>
        </p>
      </nav>
    </Layout>
  )
}

export default HomePage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Home" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" }, fav: { in: [true] } } }
      sort: { frontmatter: { date_published: DESC } }
      limit: 15
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
