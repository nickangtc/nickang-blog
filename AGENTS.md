# Agent Notes

- Astro Markdown images are optimized only when referenced as local relative paths from `content/blog/**/index.md`. Do not rewrite them into `public/` URLs; files in `public/` are served as-is and trigger Astro Dev Toolbar "Use the Image component" warnings.
- When switching from the old Gatsby branch to the Astro PR locally, clean stale untracked Gatsby build output under `public/` before building/testing. Those files can shadow Astro routes and cause misleading build warnings.
- Astro 6 requires Node `>=22.12.0`; keep Netlify `NODE_VERSION`, `.node-version`, and `package.json` engines aligned so CI does not fall back to Node 20.
- Avoid accented/non-ASCII filenames for Markdown images. Unicode normalization can differ between macOS and Netlify/Linux, causing Astro `ImageNotFound` even when the file appears to exist locally.
- Astro serves favicons from `public/`; if restoring Gatsby-era favicon assets, update `public/favicon-*` rather than only `static/`, because `static/` is legacy/stale after the migration.
