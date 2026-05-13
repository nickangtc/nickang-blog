---
name: testing-astro-blog
description: Test the Astro blog site end-to-end. Use when verifying blog rendering, image handling, infinite scroll, or static page changes.
---

## Build & Serve Locally

```bash
cd /home/ubuntu/repos/nickang-blog-gatsby
npm run build   # runs copy-blog-images.sh then astro build
python3 -m http.server 4321 --directory dist
```

The build produces ~577 HTML pages + JSON pagination endpoints in `dist/`.

## Image Handling

There are three image path patterns in the blog:

1. **`images/` subdirectory** (most posts): Markdown references `images/foo.png` or `./images/foo.png`. The remark plugin (`src/plugins/remark-rewrite-images.mjs`) rewrites these to `/blog-images/{slug}/images/foo.png`. The copy script (`scripts/copy-blog-images.sh`) copies the files.

2. **Root-level images** (e.g., `content/blog/album/`): Markdown references bare filenames like `ig.jpeg` or `./album.jpeg`. The remark plugin matches these via a regex for known image extensions. The copy script copies root-level image files as fallback.

3. **Astro content collections processing**: Astro may also process images through its built-in pipeline, producing `/_astro/{name}.{hash}.{ext}` files served via `/.netlify/images?url=_astro%2F...` on Netlify.

### Local vs Netlify

- `/.netlify/images?url=...` URLs do NOT work locally — images will show broken icons. This is expected.
- `/blog-images/{slug}/images/...` URLs DO work locally via the static file server.
- To verify Netlify-optimized images locally, check that:
  - The `<img>` `src` attribute contains `_astro/` (not the raw relative path)
  - The corresponding file exists in `dist/_astro/`

## Key Test Patterns

### Homepage (8 posts + infinite scroll)
```javascript
// Count initial articles
document.querySelectorAll('#post-list-container article').length // Should be 8

// Trigger infinite scroll
document.getElementById('infinite-trigger')?.scrollIntoView();
// Wait 2s, then re-count — should be 12
```

### Dynamic post styling verification
After infinite scroll loads new posts, verify scoped styles apply:
```javascript
const lastArticle = document.querySelectorAll('#post-list-container article')[11];
getComputedStyle(lastArticle).marginBottom  // Should be '64px'
getComputedStyle(lastArticle.querySelector('h1 a')).color  // Should be 'rgb(0, 0, 0)'
getComputedStyle(lastArticle.querySelector('h1 a')).textDecorationLine  // Should be 'none'
```

### Image verification for a specific post
```javascript
const imgs = document.querySelectorAll('article section img');
imgs.forEach(img => console.log(img.alt, img.src, img.naturalWidth));
// naturalWidth > 0 means image loaded; 0 means broken (expected for Netlify URLs locally)
```

## Known Test Limitations

- **Netlify image optimization**: Cannot be tested locally. Verify `src` attributes and `dist/_astro/` files instead.
- **Custom 404 page**: `dist/404.html` exists but `python3 -m http.server` doesn't serve it for missing routes. Works on Netlify.
- **FFmpeg recording**: May fail on some VMs. Fall back to screenshot-based evidence if recording won't start.

## Devin Secrets Needed

No secrets are required for local testing. Netlify deployment testing would require Netlify access (not currently configured as a secret).
