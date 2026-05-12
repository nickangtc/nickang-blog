import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import {
  header,
  accent,
  headerInner,
  siteTitle,
  titleLink,
  navList,
  navItem,
  navLink,
  active,
  avatar,
} from "./header.module.scss"

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
    <header className={header}>
      <div className={accent} />
      <div className={headerInner}>
        <Link to={`/`} className={titleLink}>
          <StaticImage
            src="../../content/assets/nick-ang-profile-photo-square-jun-2018-min.jpg"
            alt={`${data.site.siteMetadata.author.name} profile picture`}
            className={avatar}
          />
          <h1 className={siteTitle}>{title}</h1>
        </Link>

        <nav aria-label="Main navigation">
          <ul className={navList}>
            <li className={navItem}>
              <Link to="/" activeClassName={active} className={navLink}>
                Blog
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/topics" activeClassName={active} className={navLink}>
                Topics
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/books" activeClassName={active} className={navLink}>
                Books
              </Link>
            </li>
            <li className={navItem}>
              <Link
                to="/subscribe"
                activeClassName={active}
                className={navLink}
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
