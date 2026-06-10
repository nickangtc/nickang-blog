---
title: "Devin added search on this blog"
date_published: "2026-05-25"
date_updated: "2026-05-25"
excerpt: "Yet another engineering task that I could completely outsource to an AI coding agent"
tags: ["Tech", "AI"]
fav: false
creation_duration_minutes:
backlinks:
  - slug: "/rag-explained/"
    title: "RAG (Retrieval Augmented Generation) explained"
  - slug: "/support-engineering/"
    title: "Support Engineering"
ai_summary: "The post describes how the author added search to a personal blog by using an AI coding agent, Devin, to evaluate and implement a search solution for an Astro site hosted on Netlify, including rebuilding the index on every deployment. The author's main point is that well-scoped engineering tasks can be outsourced effectively to AI agents, saving significant time and making previously low-priority work worth doing. The conclusion is that AI agents are reliable for end-to-end implementation when guided by clear prompts and domain knowledge, even if some polishing is still needed afterward."
---

I recently added search to this blog and it was yet another engineering task that I could completely outsource to an [AI coding agent](/to-claw-or-not-to-claw/). I wanted to write about that.

In 2023, Netlify acquired Gatsby. This blog runs on that [static site generator framework](/2020-05-30-why-i-migrated-my-blog-from-wordpress-to-gatsby/), so when I found out this year that it was basically unmaintained, I found Astro and told Devin to port my blog over to Astro. I sent it a total of 2 messages and it [finished the job](https://www.linkedin.com/posts/nickangtc_with-just-42-devin-ai-just-helped-me-do-activity-7460916911778729984-jOr1) for $42. It would have taken me at least 5-10 hours if I did it myself... likely 20 hours factoring in reading Astro docs.

That gave me confidence that Devin can handle stuff like that. What's adding search functionality then?

The engineering task is really quite straightforward in my mind as an engiener:

1. Search for popular, maintained libraries that handle search for static sites. Prefer Astro's native offering if they have one.
2. List them down. Compare and contrast the pros and cons. Some may have more features, others may be simpler. Prefer simple. Always prefer simple for v1.
3. Read the lib's docs and implement it. Ensure the search index is rebuilt upon every deployment to Netlify.

This is a very well scoped task, so I fired it off to Devin and it came back with a working PR. It cost less than $9 to have this done, which I was happy to pay for (I also had credits, but I would have been happy to pay that in cash).

Visually, the work was only 80% of the way of what I expected. But I must take blame here for not specifying much. The 3 messages I sent Devin for this work were basically:

1. add search functionality to the blog that works with the astro framework and static builds hosted on netlify. before using any library, read up on the existing security vulnerabilities and pick one that is safe, preferably not the latest version
2. make sure the search index etc. will be updated on every rebuild (i.e. every time deployed to netlify)
3. render the search bar in the same style but wiht magnifying glass icon, above the subscribe form in the left side bar. no search term placeholder

Not much to go on, I know. There were a lot of basic CSS layout issues with the search results page, which I totally underspecified. But that didn't bother me because I knew that part was easy to fix later with a few simple prompts with another agent (I used gpt-5.5 using my $20 ChatGPT subscription).

What was helpful was Devin knocking down the lead domino (search integration). To put things into perspective, I've ran this blog on Gatsby for 6 years and have always wanted to integrate search but I've always put it off because it just never felt important enough (people/I can google search). Now, since it's a task that takes 30 minutes of my time to prompt, review, and merge, I finally made it happen.

The main takeaways from this exercise are:

1. AI agents are very capable of working end to end given well scoped prompts
2. Scoping prompts well is easier when you have domain knowledge (e.g. I knew how search works on statically-built websites)
3. AI agents make a whole class of work that was uneconomical economical
4. Don't waste your time doing things yourself that AI agents can do reliably
