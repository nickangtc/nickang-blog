import React from "react"
import { Link } from "gatsby"

import {
  articleTitle,
  meta,
  entry,
  divider,
  body,
} from "./post-list.module.scss"

const PostList = ({ posts }) => {
  return posts.map(post => {
    const { node } = post
    const published = node.frontmatter.date_published

    return (
      <article className={entry} key={node.fields.slug}>
        <h1 className={articleTitle}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </h1>
        <div className={body} dangerouslySetInnerHTML={{ __html: node.html }} />
        <hr className={divider} />
        <p className={meta}>{published}</p>
      </article>
    )
  })
}

export default PostList
