---
title: "How URL shorteners generate 3 trillion unique URLs with just 7 characters"
date_published: "2021-12-21"
excerpt: "The answer is elegant: count up to 62 with base 62 counting!"
tags: ["Tech"]
fav: false
backlinks:
---

How do URL shorteners support 3.5 trillion unique URLs with just 7 characters?

Turns out, it's by expanding the way we count, from 0-10 to 0-62!

(Correction: I said 9 characters in the video, but 0-9 has 10 characters. The big numbers must be mushing my brain.)

<video controls width="350">
    <source src="/images/url-shortener-base-62-counting.mp4"
            type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

![the solution is to count in base62](./images/url-shortener-base-62-counting.png)

I referred to [this article](https://www.interviewcake.com/question/java/url-shortener) to learn about this.