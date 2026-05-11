import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const ContactPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Contact</h1>
      <p>Drop your email to: heynickang at gmail dot com</p>{" "}
    </Layout>
  )
}

export default ContactPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="Contact" pathname={location.pathname} />
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
