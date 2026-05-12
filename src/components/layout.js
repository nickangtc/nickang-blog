import React from "react"

import Header from "../components/header"
import "../styles/global.scss"
import "../styles/prism-custom.scss"
import { layout, content } from "./layout.module.scss"

const Layout = ({ title, children }) => {
  return (
    <div className={layout}>
      <Header title={title} />
      <main className={content}>{children}</main>
    </div>
  )
}

export default Layout
