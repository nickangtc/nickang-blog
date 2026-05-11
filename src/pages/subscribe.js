import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const SubscribePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SearchEngineOptimisation title="Subscribe" location={location} />
      <h1>Subscribe</h1>
      <p>
        Sometimes I'll send out a newsletter including updates of what I'm
        doing, what I've found interesting, etc. If you want me to send that to
        you periodically, drop your email below.
      </p>
      <form
        name="subscribe"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="subscribe" />
        <p hidden>
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <br />
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <button type="submit">Subscribe</button>
        </p>
      </form>
    </Layout>
  )
}

export default SubscribePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
