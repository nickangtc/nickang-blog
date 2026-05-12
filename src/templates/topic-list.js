import React from "react"
import { graphql } from "gatsby"

import InfinitePostList from "../components/infinite-post-list"
import Layout from "../components/layout"
import PageIntro from "../components/page-intro"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const TopicList = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {
    currentPage,
    numPages,
    title,
    intro,
    basePath,
    eyebrow = "Topic",
  } = pageContext
  const nextPage = currentPage === numPages ? null : `${basePath}/${currentPage + 1}`

  return (
    <Layout location={location} title={siteTitle}>
      <PageIntro title={title} label={eyebrow}>
        <p>{intro}</p>
      </PageIntro>
      <InfinitePostList initialPosts={posts} initialNextPath={nextPage} />
    </Layout>
  )
}

export default TopicList

export const Head = ({ location, pageContext }) => (
  <SearchEngineOptimisation title={pageContext.title} pathname={location.pathname} />
)

export const pageQuery = graphql`
  query TopicListQuery($tag: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" }, tags: { in: [$tag] } } }
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
            title
            date_published(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
