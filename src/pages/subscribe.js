import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import {
  subscribeForm,
  subscribeInput,
  subscribeButton,
  subscribeLabel,
} from "./subscribe.module.scss"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const SubscribePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Subscribe</h1>
      <p>
        Sometimes I send out a newsletter with updates on what I&apos;m working on and
        what I&apos;ve found interesting. Drop your email below if you want those in your
        inbox.
      </p>
      <form
        name="subscribe"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className={subscribeForm}
      >
        <input type="hidden" name="form-name" value="subscribe" />
        <p hidden>
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>
        <label htmlFor="email" className={subscribeLabel}>
          Email
        </label>
        <input
          id="email"
          className={subscribeInput}
          type="email"
          name="email"
          placeholder="Email address"
          required
        />
        <button className={subscribeButton} type="submit">
          Subscribe
        </button>
      </form>
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
