import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { siteTitle, navList, navItem, active } from "./header.module.scss"

const Header = ({ title }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
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
    <header style={{ display: "flex" }}>
      <StaticImage
        src="../../content/assets/nick-ang-profile-photo-square-jun-2018-min.jpg"
        imgStyle={{
          borderRadius: `50%`,
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
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h1 className={siteTitle}>
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>

        <nav>
          <ul className={navList}>
            <li className={navItem}>
              <Link to="/blog" activeClassName={active}>
                Blog
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/topics" activeClassName={active}>
                Topics
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/books" activeClassName={active}>
                Books
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/ideas" activeClassName={active}>
                Ideas
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/subscribe" activeClassName={active}>
                Subscribe
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  )
}

export default Header
