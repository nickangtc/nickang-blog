import React, { useEffect, useRef, useState } from "react"

import PostList from "./post-list"
import { status, trigger } from "./infinite-post-list.module.scss"

const pageDataPathFor = path => {
  if (path === "/") return "/page-data/index/page-data.json"
  return `/page-data${path.replace(/\/$/, "")}/page-data.json`
}

const nextPathFromContext = pageContext => {
  const { currentPage, numPages, basePath } = pageContext

  if (currentPage >= numPages) return null
  if (basePath) return `${basePath}/${currentPage + 1}`
  return `/${currentPage + 1}`
}

const InfinitePostList = ({ initialPosts, initialNextPath }) => {
  const [posts, setPosts] = useState(initialPosts)
  const [nextPath, setNextPath] = useState(initialNextPath)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const triggerRef = useRef(null)

  useEffect(() => {
    setPosts(initialPosts)
    setNextPath(initialNextPath)
  }, [initialPosts, initialNextPath])

  useEffect(() => {
    if (
      !nextPath ||
      isLoading ||
      hasError ||
      typeof IntersectionObserver === "undefined"
    ) {
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return

        setIsLoading(true)
        setHasError(false)

        fetch(pageDataPathFor(nextPath))
          .then(response => {
            if (!response.ok) throw new Error("Could not load more posts")
            return response.json()
          })
          .then(pageData => {
            const result = pageData.result
            const newPosts = result.data.allMarkdownRemark.edges
            setPosts(currentPosts => [...currentPosts, ...newPosts])
            setNextPath(nextPathFromContext(result.pageContext))
          })
          .catch(() => setHasError(true))
          .finally(() => setIsLoading(false))
      },
      { rootMargin: "600px 0px" }
    )

    const node = triggerRef.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
      observer.disconnect()
    }
  }, [hasError, isLoading, nextPath])

  return (
    <>
      <PostList posts={posts} />
      {nextPath && (
        <div className={trigger} ref={triggerRef} aria-live="polite">
          {isLoading && <p className={status}>Loading more posts…</p>}
          {hasError && <p className={status}>Could not load more posts.</p>}
        </div>
      )}
    </>
  )
}

export default InfinitePostList
