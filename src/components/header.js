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
  subscribeForm,
  subscribeInput,
  subscribeButton,
  subscribeLabel,
  sidebarSection,
  sidebarHeading,
  sidebarList,
  sidebarItem,
  sidebarLink,
} from "./header.module.scss"

const topics = [
  { label: "Tech", path: "/tech" },
  { label: "Living", path: "/living" },
  { label: "Creativity", path: "/creativity" },
  { label: "Annual Review", path: "/annual-review" },
  { label: "Leadership", path: "/leadership" },
  { label: "Communication", path: "/communication" },
  { label: "Books", path: "/books" },
]

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
          </ul>
        </nav>

        <section className={sidebarSection}>
          <h2 className={sidebarHeading}>Topics</h2>
          <ul className={sidebarList}>
            {topics.map(topic => (
              <li className={sidebarItem} key={topic.path}>
                <Link
                  to={topic.path}
                  activeClassName={active}
                  className={sidebarLink}
                >
                  {topic.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

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
          <label htmlFor="sidebar-email" className={subscribeLabel}>
            Subscribe
          </label>
          <input
            id="sidebar-email"
            className={subscribeInput}
            type="email"
            name="email"
            placeholder="bob@email.com"
            required
          />
          <button className={subscribeButton} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header
