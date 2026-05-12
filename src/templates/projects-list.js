import React from "react"
import { Link, graphql } from "gatsby"

import InfinitePostList from "../components/infinite-post-list"
import Layout from "../components/layout"
import PageIntro from "../components/page-intro"
import SearchEngineOptimisation from "../components/searchengineoptimisation"
import {
  projectGrid,
  projectCard,
  projectImage,
  projectTitle,
  projectExcerpt,
} from "./projects-list.module.scss"

const ProjectCardList = ({ posts }) => {
  return (
    <div className={projectGrid}>
      {posts.map(({ node }) => {
        const {
          slug
        } = node.fields
        const {
          title,
          excerpt,
          cover,
        } = node.frontmatter

        const coverImage = cover || "/project-covers/default-project-cover.svg"

        return (
          <article key={slug}>
            <Link to={slug} className={projectCard}>
              <img
                src={coverImage}
                alt={`${title} cover image`}
                className={projectImage}
                loading="lazy"
              />
              <h2 className={projectTitle}>{title}</h2>
              <p className={projectExcerpt}>{excerpt}</p>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

const ProjectsList = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages, title, intro, basePath } = pageContext
  const nextPage = currentPage === numPages ? null : `${basePath}/${currentPage + 1}`

  return (
    <Layout location={location} title={siteTitle}>
      <PageIntro title={title} label={false}>
        <p>{intro}</p>
      </PageIntro>
      <InfinitePostList
        initialPosts={posts}
        initialNextPath={nextPage}
        renderPosts={ProjectCardList}
      />
    </Layout>
  )
}

export default ProjectsList

export const Head = ({ location, pageContext }) => (
  <SearchEngineOptimisation title={pageContext.title} pathname={location.pathname} />
)

export const pageQuery = graphql`
  query ProjectsListQuery($tag: String!, $skip: Int!, $limit: Int!) {
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
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            cover
            date_published(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
