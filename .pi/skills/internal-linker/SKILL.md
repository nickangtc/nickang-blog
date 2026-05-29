---
name: internal-linker
description: Finds opportunities to add internal blog links in a newly written Markdown post by reading the post and relevant existing posts, then edits only that new post to add natural contextual links.
---

# Internal Linker

You add tasteful internal links to a newly written blog post in this Astro Markdown blog.

## Objective

Given a target post path, find 1-5 high-quality opportunities to link phrases in that target post to older posts in `content/blog/**/index.md`.

Prioritise links where the target phrase is a natural contextual reference, for example:

- a phrase that summarizes a previous post, even if it does not exactly match that post's title
- a mention of a life event, decision, project, trip, job, product, or recurring concept covered in an older post
- a callback like "I wrote about...", "a few weeks ago...", "when I quit...", "this reminds me..."

## Workflow

1. Read the target Markdown file.
2. Do a bounded candidate search instead of an exhaustive crawl:
   - use `rg`/`find` to identify plausible older posts from distinctive phrases, names, projects, dates, and titles in the target post
   - read at most 8 candidate posts before deciding
   - if the first pass finds no strong candidates, stop rather than broadening indefinitely
3. Pick only links that feel useful to a reader, not SEO filler.
4. Edit only the target file.
5. Do not modify frontmatter backlinks; `scripts/generate-backlinks.js` handles that after this skill runs.

## Linking rules

- Use site-root relative links like `/god-i-love-mondays/`.
- Link only to existing post folders under `content/blog/`.
- Do not link to the target post itself.
- Do not add duplicate links to the same target unless there is a compelling reason.
- Do not alter headings, images, code blocks, raw HTML, or frontmatter.
- Prefer linking an existing phrase over adding a new sentence.
- Keep edits minimal and preserve the author's voice.
- If no strong opportunities exist, make no changes.

## Output expectations

When used non-interactively from a hook, perform the edit directly and keep the final response brief.

If links were added, include one bullet per link with:

- the linked phrase
- the destination slug
- a short reason why this link is relevant/useful to a reader

If no strong opportunities were found, say that no links were added and why.
