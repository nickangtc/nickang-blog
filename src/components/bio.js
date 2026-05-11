/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1),
      }}
    >
      <StaticImage
        src="../../content/assets/nick-ang-profile-photo-square-jun-2018-min.jpg"
        imgStyle={{
          borderRadius: `999px`,
        }}
        alt={`${data.site.siteMetadata.author.name} profile picture`}
        style={{
          marginBottom: 0,
          marginRight: "1rem",
          maxWidth: 75,
          maxHeight: 75,
          borderRadius: `100%`,
        }}
      />
      <div>
        <div>
          Husband, dad, and software engineer that writes. Big on learning
          something everyday and trying to have fun before the lights go out.
        </div>
        <small>
          <Link to="/contact">contact</Link>
        </small>
      </div>
    </div>
  )
}

export default Bio
