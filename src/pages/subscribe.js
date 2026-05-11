import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const SubscribePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Subscribe</h1>
      <blockquote>
        I want to thank you for helping me down this path of facing the finite
        nature of my time and abilities (trying to internalise that that's okay)
        and figuring out what a meaningful life truly means for me (an answer
        that needs to come from me)
      </blockquote>
      <blockquote>
        I just wanted to drop you a note to tell you that you write very well -
        as in I'm, not saying in the literary sense but in a straightforward and
        straight to the heart kind of writing. No bullshit and unnecessary
        preamble.
      </blockquote>
      <blockquote>
        I really like your style of writing, hence I subscribed! I have been off
        social media ever since my child was born and have been searching for
        non-influencer types blogs to read, so it was a pleasant discovery.{" "}
      </blockquote>
      <blockquote>
        I used to follow many blogs, but then I realized they're becoming too
        formulaic and inauthentic. Your blog is the opposite. I love it for
        being raw, for being honest.
      </blockquote>

      <iframe
        src="https://nickang.substack.com/embed"
        width="100%"
        height="320"
        style={{ border: "1px solid #EEE", background: "white" }}
        frameborder="0"
        scrolling="no"
        title="Subscribe to In the End newsletter"
      ></iframe>
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
