---
name: cv-pdf
description: Use when editing Nick's CV pages or regenerating CV PDFs for nickang.com.
---

# CV PDF

## When to Use

Use this skill whenever editing CV pages such as `src/pages/cv.astro`, `src/pages/cv-support.astro`, shared CV components, or files under `public/cv/`.

## Workflow

1. Generate CV PDFs from the matching Astro route using local headless Chrome against a local Astro dev server.
2. Save generated PDFs under `public/cv/`.
3. Keep the HTML-only `Download PDF` link pointed at the generated PDF.
4. Keep the print/PDF-only `View online` link pointed at the matching HTML route.
5. After any CV page or PDF content change, visually inspect the generated PDF and confirm everything fits cleanly on a single page.

## Link Behavior

Use root-relative paths for CV route links in HTML, such as `/cv/` and `/cv-support/`, so the source works in both local development and production.

