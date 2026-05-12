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
  socialList,
  socialItem,
  socialLink,
  socialIcon,
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

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/nickangtc/nickang-blog-gatsby",
    icon: (
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18.92-.26 1.9-.38 2.88-.39.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/nickang",
    icon: <path d="M13.96 10.47 22.12 1h-1.93l-7.09 8.23L7.44 1H.92l8.55 12.44L.92 23h1.93l7.48-8.69L16.31 23h6.52l-8.87-12.53Zm-2.65 3.08-.87-1.24L3.55 2.45h2.96l5.57 7.97.87 1.24 7.24 10.36h-2.96l-5.92-8.47Z" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nickangtc/",
    icon: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />,
  },
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

        <section className={sidebarSection}>
          <h2 className={sidebarHeading}>Socials</h2>
          <ul className={socialList}>
            {socials.map(social => (
              <li className={socialItem} key={social.href}>
                <a
                  className={socialLink}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className={socialIcon}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </header>
  )
}

export default Header
