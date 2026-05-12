import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const SubscribePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Subscribe</h1>
      <p>
        Sometimes I send out a newsletter with updates on what I&apos;m working on
        and what I&apos;ve found interesting. Use the form in the sidebar to get
        those in your inbox.
      </p>
    </Layout>
  )
}

export default SubscribePage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Subscribe" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
