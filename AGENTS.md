# Agent Notes

- Astro Markdown images are optimized only when referenced as local relative paths from `content/blog/**/index.md`. Do not rewrite them into `public/` URLs; files in `public/` are served as-is and trigger Astro Dev Toolbar "Use the Image component" warnings.
- When switching from the old Gatsby branch to the Astro PR locally, clean stale untracked Gatsby build output under `public/` before building/testing. Those files can shadow Astro routes and cause misleading build warnings.
