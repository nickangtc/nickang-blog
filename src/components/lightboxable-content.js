import React, { useEffect, useRef, useState } from "react"

import {
  content,
  overlay,
  overlayOpen,
  lightboxImage,
  closeButton,
} from "./lightboxable-content.module.scss"

const MIN_LIGHTBOX_WIDTH = 768

const LightboxableContent = ({ className, html }) => {
  const contentRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageAlt, setImageAlt] = useState("")

  useEffect(() => {
    const contentNode = contentRef.current
    if (!contentNode) return undefined

    const handleClick = event => {
      if (window.innerWidth < MIN_LIGHTBOX_WIDTH) return

      const image = event.target.closest("img")
      if (!image || !contentNode.contains(image)) return

      event.preventDefault()
      const wrapperLink = image.closest("a")
      setImageSrc(wrapperLink?.href || image.currentSrc || image.src)
      setImageAlt(image.alt || "")
    }

    contentNode.addEventListener("click", handleClick)
    return () => contentNode.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    if (!imageSrc) return undefined

    const handleKeyDown = event => {
      if (event.key === "Escape") setImageSrc(null)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [imageSrc])

  return (
    <>
      <section
        ref={contentRef}
        className={`${content} ${className || ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {imageSrc && (
        <div
          className={`${overlay} ${overlayOpen}`}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setImageSrc(null)}
        >
          <button
            className={closeButton}
            type="button"
            aria-label="Close image preview"
            onClick={() => setImageSrc(null)}
          >
            ×
          </button>
          <img
            className={lightboxImage}
            src={imageSrc}
            alt={imageAlt}
            onClick={event => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default LightboxableContent
