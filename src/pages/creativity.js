import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"
import PageIntro from "../components/page-intro"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const CreativityPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <PageIntro title="Creativity">
        <p>
          Articles about writing, blogging, visual thinking, problem solving, and
          just about anything creative.
        </p>
      </PageIntro>
      <PostList posts={posts} />
    </Layout>
  )
}

export default CreativityPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Creativity Articles" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" }, tags: { in: "Creativity" } } }
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
