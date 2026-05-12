import React from "react"

import { intro, eyebrow, title, body } from "./page-intro.module.scss"

const PageIntro = ({ label = "Topic", title: heading, children }) => {
  return (
    <header className={intro}>
      {label && <p className={eyebrow}>{label}</p>}
      <h1 className={title}>{heading}</h1>
      <div className={body}>{children}</div>
    </header>
  )
}

export default PageIntro
