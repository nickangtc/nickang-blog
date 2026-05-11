import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SearchEngineOptimisation from "../components/searchengineoptimisation"

const NowPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <h1>What I'm doing now</h1>
      <h2>Trying my best to be a good parent & partner</h2>
      <p>
        Our first child, Charlotte, was born in the winter of 2021. My wife and
        I are trying our best to be there for her without being there{" "}
        <em>too much</em> for her - it's a fine balance! But I know the
        fundamental principle is easy: be attentive and present for as much of
        her childhood as possible. Who doesn't want their parents' undivided
        attention on demand?
      </p>
      <p>
        The other part of being a parent is being a partner. Mothers give a lot
        more than fathers and I try every single day to balance the workload{" "}
      </p>
      <h2>Learning something 5x weekly</h2>
      <p>
        Motivated by my new job as a senior developer at Shopify, I recently
        started a{" "}
        <a href="https://learndaily.life">new blog called LearnDaily</a> to
        share my learning notes (about web development like Ruby, Rails,
        GraphQL, React, but also about learning itself and other things related
        to working as a developer) publicly. It's a forcing function for me to
        keep learning daily, or in my case, 5x weekly, because I prefer to spend
        my weekends relaxing with family.
      </p>
      <h2>Living in Germany</h2>
      <p>
        My wife, dog, and I moved from Singapore to Germany in the winter of
        2019. We love being in a vast country that is connected to many others
        because of the access to mountains, national parks and lakes, but also
        to an overall sense of novelty and self discovery. I'm writing an
        observation note every year (see:{" "}
        <Link to="/2020-10-04-7-things-i-learned-from-my-first-year-living-in-berlin-away-from-singapore/">
          2020
        </Link>{" "}
        and{" "}
        <Link to="/2021-10-03-6-things-i-learned-from-my-second-year-living-in-berlin-away-from-singapore/">
          2021
        </Link>
        ).
      </p>

      <hr />
      <p>
        <em>Page last updated: 31.01.2022</em>
      </p>
    </Layout>
  )
}

export default NowPage

export const Head = ({ location }) => (
  <SearchEngineOptimisation title="What I'm doing now" pathname={location.pathname} />
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
