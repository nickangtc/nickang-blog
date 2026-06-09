---
title: "Reflect"
date_published: "2026-05-17"
excerpt: "A local-first Chrome extension for highlighting, annotating, and remembering what you read or watch."
tags: ["Project"]
cover: "/project-covers/reflect-cover.png"
backlinks:
ai_summary: "The post describes Reflect, a Chrome extension built to make reading and watching content more deliberate by letting the user highlight web pages, annotate YouTube videos, save items for later, and review engagement analytics. The author's main point is that the tool helps combat passive consumption and improve retention, and the useful conclusion is that it proved valuable enough in personal use to be open-sourced and kept in daily use for 40 to 50 days."
---

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/8WJR5_6PJD8"
  title="Reflect"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

Reflect is a Chrome extension I built for myself after noticing how often I read and watch things without really retaining them.

The idea is simple: make consumption more deliberate.

With Reflect, I can:

- highlight anything on a webpage and add an annotation
- click back into notes to edit or delete them later
- annotate YouTube videos while they play
- save things to a read-later list
- see analytics on what I've been engaging with

It also works locally by default, with an optional backend if you want to sync data to Postgres.

One small detail I like: when I reach the end of a video, Reflect asks me what I learned. That's why I called it Reflect.

I open-sourced it after sharing it with a few people, and it ended up being useful enough that I kept using it for 40 to 50 days straight.

The code is here: [github.com/nickangtc/reflect-chrome](https://github.com/nickangtc/reflect-chrome).
