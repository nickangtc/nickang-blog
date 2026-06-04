# Agent Notes

- Astro Markdown images are optimized only when referenced as local relative paths from `content/blog/**/index.md`. Do not rewrite them into `public/` URLs; files in `public/` are served as-is and trigger Astro Dev Toolbar "Use the Image component" warnings.
- When switching from the old Gatsby branch to the Astro PR locally, clean stale untracked Gatsby build output under `public/` before building/testing. Those files can shadow Astro routes and cause misleading build warnings.
- Astro 6 requires Node `>=22.12.0`; keep Netlify `NODE_VERSION`, `.node-version`, and `package.json` engines aligned so CI does not fall back to Node 20.
- Avoid accented/non-ASCII filenames for Markdown images. Unicode normalization can differ between macOS and Netlify/Linux, causing Astro `ImageNotFound` even when the file appears to exist locally.
- Astro serves favicons and project cover assets from `public/`; if restoring Gatsby-era assets, update `public/favicon-*` and `public/project-covers/*` rather than only `static/`, because `static/` is legacy/stale after the migration.
- Markdown image syntax in `content/blog/**/index.md` should use local relative `./images/...` paths so Astro can process the files. Raw HTML video `<source src="...">` entries are not processed the same way, so keep their referenced video files under `public/`.
- With Astro `ClientRouter`, avoid manually forcing `history.scrollRestoration = "manual"` or `window.scrollTo(0)` on the blog list page. Browser Back should restore the list scroll position naturally.
