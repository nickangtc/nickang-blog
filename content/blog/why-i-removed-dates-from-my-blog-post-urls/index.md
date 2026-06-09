---
title: "Why I removed dates from my blog post URLs"
date_published: "2022-03-31"
date_updated: "2022-03-31"
excerpt: "I no longer see my blog posts as static after publication. They're"
tags: ["Creativity"]
fav: false
backlinks:
ai_summary: "The author explains that they removed publication dates from future blog post URLs because shorter URLs look cleaner and because they no longer see posts as fixed newspaper-like pieces. They now treat posts as evergreen, updateable documentation, showing both published and updated dates when needed. They keep existing dated URLs to avoid breaking search access and note that GitHub's edit history provides useful accountability and a record of changing views."
---

At the time of writing, I'm running this blog on Gatsby.js. It's [open sourced](https://github.com/nickangtc/nickang-blog-gatsby) and you can view the code on GitHub

Running the blog on Gatsby means I have free reign on how I want the site to work. Everything can be tweaked if you decide to invest time to read the documentation and apply your React/GraphQL knowledge, which is nice.

One of the things I decided early on when I first [moved to Gatsby from WordPress](/2020-05-30-why-i-migrated-my-blog-from-wordpress-to-gatsby) was to prepend the date of the post's publication to the URL:

```
https://www.nickang.com/annual-review-2021/
```

It's nice because it's date-stamped, but it's kind of long, isn't it?

## Original intent

I originally thought that I would value being able to see my content/blog/ directory automatically sorted in chronological order (given that VS Code and most code editors in which I write for this blog sort alphanumerically). I thought this would be an easy way to look back on how my thinking has evolved over time.

But shortly after this decision I realised that the presentational layer (i.e. the blog as viewed on a browser) already shows the posts in chronological order like most blogs do. (I could change that too - free reign, remember? - but I won't for now or the foreseeable future). In other words, I already have that feature, which, by the way, is enabled by the YAML metadata in each index.md file that corresponds to a blog post. The YAML for this particular post looks like this:

```yaml
---
title: "Why I removed dates from my blog post URLs"
date_published: "2022-03-31"
date_updated: "2022-03-31"
excerpt: "I no longer see my blog posts as static after publication. They're"
tags: ["Creativity"]
fav: false
---
```

So I'm covered if I ever want to look back on my intellectual evolution.

In the safety of that knowledge, I've decided to stop prepending the date in the URL for posts going forward. To continue to make it easy for my existing posts to be searched via Google without having to setup 400+ redirects, I decided to keep their current date-stamped URLs.

## Why I've removed them going forward

I have two reasons:

1. Shorter URLs look neater
2. I've changed my view on what a blog post should be

The first one probably needs no explanation. The second one needs some.

Here's how I thought about my blog posts in the past:

- **Static**: once published, hardly ever updated (only for typos or important corrections)
- New or updated thinking are written in a new post
- Like a newspaper article

And here's how I think about my blog posts now: 

- **Evergreen**: existing posts get regularly updated when new info or new thinking emerges
- Sometimes okay to publish before they're ready, knowing I can refine them with time
- Like a piece of online documentation

In the new mental model, the date of publication is just one of two dates that are relevant. The published date and the updated date are both important to signal to the reader about that my thoughts on something is not final (are *any* thoughts final?). I've updated each blog post to display both dates if they're different. 

What's nice about open-sourcing my blog on GitHub is that every edit leaves a trace, so if anyone ever wanted to, they could see how my views on a topic changed and call me out. I appreciate that kind of accountability on what I post publicly because I think it makes me a better thinker.