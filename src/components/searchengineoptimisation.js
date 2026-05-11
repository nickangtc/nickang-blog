/**
 * SEO component using Gatsby Head API to insert head meta to every page.
 * Used via exported Head functions in page/template components.
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import twitterCardPic from "../../content/assets/nickang-twitter-large-card.png"

const SearchEngineOptimisation = ({ title, description, pathname }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const url = `${site.siteMetadata.siteUrl}${pathname || ""}`

  return (
    <>
      <title>{`${title} | ${site.siteMetadata.title}`}</title>
      <meta name="title" content={title} />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={twitterCardPic} />
      <meta property="og:site_name" content="Nick Ang" />
      <meta property="og:url" content={url} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={`@${site.siteMetadata.social.twitter}`}
      />
      <meta
        name="twitter:site"
        content={`@${site.siteMetadata.social.twitter}`}
      />
      <meta name="twitter:image" content={twitterCardPic} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="msapplication-TileColor" content="#da532c" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    </>
  )
}

SearchEngineOptimisation.defaultProps = {
  description: ``,
}

SearchEngineOptimisation.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
}

export default SearchEngineOptimisation
