---
title: "Adding backlinks to a Gatsby blog without plugins"
date_published: "2025-12-19"
date_updated: "2025-12-19"
excerpt: "A practical approach to bidirectional linking in Gatsby by pre-computing backlinks at build time and storing them in frontmatter"
tags: ["Tech", "Gatsby"]
backlinks:
ai_summary: "The post explains how the author added backlinks to a custom Gatsby blog without using plugins by precomputing reverse links with a Node.js script and storing them in each post's frontmatter. The main point is that this approach keeps the system simple, transparent, and fast, while a git pre-commit hook ensures backlinks stay updated automatically. The author concludes that for their blog, this was a practical, dependency-free solution that also clarified how Gatsby and the site's content connect."
---

**Warning, this was written by AI**: I asked Claude to write this post for me after I guided it to implement the backlinks feature in this custom-rolled blog of mine. I have taken time to read the post and it's 80% in my tone, and 100% what I would have written. If you hate AI-generated write-ups, read other posts. Only posts with this disclaimer are written by AI.

I have been thinking a lot about backlinks lately. If you are familiar with digital gardens or personal knowledge management systems, you know that backlinks—the inverse of regular links—are powerful. They help readers discover related content that they might otherwise miss. They also give you a sense of how your ideas are connected across your blog.

When I started exploring how to add backlinks to this Gatsby blog, I quickly realised that most solutions out there rely on Gatsby plugins. And while plugins are convenient, they come with their own complexity and dependencies. I wondered: is it possible to implement backlinks without relying on any plugins at all?

Turns out, yes. And the solution is surprisingly simple.

## The approach: pre-compute and store in frontmatter

Instead of trying to compute backlinks on the fly, I decided to compute them once and store the results directly in the markdown frontmatter. This trades a small amount of extra file processing for a huge gain in simplicity.

Here's the idea:

1. Create a Node.js script that scans all markdown files
2. For each file, extract all internal links
3. Build a reverse index: which posts link to which?
4. Update each markdown file's frontmatter with the backlinks array
5. At build time, Gatsby just reads this data from frontmatter like any other field

### The script

I created `scripts/generate-backlinks.js` that does all this:

```javascript
// Parse all markdown files
const postsBySlug = {}
const postsWithLinks = []

mdFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, "utf8")
  const { frontmatterStr, body } = parseFrontmatter(content)
  const slug = `/${path.basename(path.dirname(filePath))}/`

  postsBySlug[slug] = { filePath, frontmatterStr, body, title }

  const links = extractInternalLinks(body)
  if (links.length > 0) {
    postsWithLinks.push({ slug, links })
  }
})

// Build backlinks index (reverse mapping)
const backlinksBySlug = {}

postsWithLinks.forEach(({ slug: sourceSlug, links }) => {
  links.forEach(targetSlug => {
    if (postsBySlug[targetSlug]) {
      if (!backlinksBySlug[targetSlug]) {
        backlinksBySlug[targetSlug] = []
      }
      backlinksBySlug[targetSlug].push({
        slug: sourceSlug,
        title: postsBySlug[sourceSlug].title,
      })
    }
  })
})

// Update each file's frontmatter
Object.entries(postsBySlug).forEach(([slug, postData]) => {
  const backlinks = backlinksBySlug[slug] || []
  const newFrontmatterStr = updateFrontmatterBacklinks(
    postData.frontmatterStr,
    backlinks
  )

  const newContent = `---\n${newFrontmatterStr}\n---\n${postData.body}`
  fs.writeFileSync(postData.filePath, newContent, "utf8")
})
```

The key insight here is that the script:

- Parses the YAML frontmatter (not just reading raw markdown, but actually understanding the structure)
- Finds the existing `backlinks:` line if it exists, or appends before the closing `---`
- Updates ONLY that section, leaving the rest of the file untouched
- Is idempotent: running it 10 times produces the same result as running it once

### Integrating with git

To keep backlinks up-to-date automatically, I added a pre-commit hook:

```bash
#!/bin/sh
# .git/hooks/pre-commit

node scripts/generate-backlinks.js

if [ $? -ne 0 ]; then
  echo "❌ Backlinks generation failed"
  exit 1
fi

git add content/blog/**/index.md 2>/dev/null || true

exit 0
```

Now, every time I commit, the backlinks are regenerated and automatically staged. This means I never have to think about it—it just works.

### Querying in Gatsby

Once the backlinks are in frontmatter, querying them is trivial:

```javascript
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        backlinks {
          slug
          title
        }
      }
    }
  }
`
```

And rendering is equally straightforward:

```jsx
{
  post?.frontmatter?.backlinks && post.frontmatter.backlinks.length > 0 && (
    <>
      <hr />
      <section>
        <p>Posts that link to this one:</p>
        <ul>
          {post.frontmatter.backlinks.map(backlink => (
            <li key={backlink.slug}>
              <Link to={backlink.slug}>{backlink.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
```

## Why this approach works well

**No plugins.** This solution doesn't depend on any Gatsby plugins. It's just plain Node.js and the tools Gatsby already provides.

**Predictable performance.** There's no runtime computation. Backlinks are pre-computed, stored, and queried like any other field. This means your build time is predictable and your site renders fast.

**Transparent.** The backlinks data is right there in your markdown files. You can see it, edit it if needed, and track changes in version control.

**Flexible.** Want to add more metadata to backlinks? Change the script. Want to filter certain backlinks? Modify the logic. No fighting against plugin APIs.

**Idempotent and safe.** The script is designed to be run multiple times without side effects. It's perfect for automation.

## Trade-offs

This approach isn't perfect, though. Here are the honest drawbacks:

The script is blazingly fast—it scanned and processed all 539 posts across my entire blog in less than a second. So performance isn't a concern unless you have tens of thousands of posts. Since the computation happens in a pre-commit hook (not during the Gatsby build), your actual site build time remains completely unaffected.

The script updates _all_ post files every time it runs, even if only one post changed. In a large repository, this creates a lot of churn in git. You could optimise this by checking if backlinks actually changed before writing, but I haven't bothered.

You need to remember to run the script before committing. I solved this with a git hook, but others might prefer to integrate it into CI/CD instead.

## Should you do this?

If you are using Gatsby and want backlinks without adding dependencies, this approach is solid. It's simple to understand, easy to modify, and requires no plugins.

If you are using a different static site generator, the core idea—pre-compute and store in frontmatter—translates well. The specifics would change, but the philosophy remains.

The real lesson here is that sometimes the "simpler" approach (relying on plugins or runtime computation) is actually more complex in practice. Sometimes it's worth investing 30 minutes in a custom script to get exactly what you want, with full control, and no external dependencies.

For my blog, this is a win. I added backlinks without bloating my build process or adding any plugins. My readers get to see how my posts are connected. And I learned something about Gatsby's internals in the process.

---

**Curious?** Check out the [full implementation on GitHub](https://github.com/nickangtc/nickang-gatsby). The script is in `scripts/generate-backlinks.js` and the git hook is in `.git/hooks/pre-commit`.

**Want to learn more?** If you are interested in digital gardens, backlinks, or personal knowledge management, I've written about these topics before. Check out [What is a Personal Knowledge Management system (PKM)?](/2020-07-05-personal-knowledge-management-system/) or [Types of Notes in a PKM explained with a Gardening Analogy](/2021-08-29-types-of-notes-in-a-pkm-explained-with-a-gardening-analogy-part-i/).
