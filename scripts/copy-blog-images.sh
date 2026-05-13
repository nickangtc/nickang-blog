#!/bin/bash
# Copy blog post images to public/blog-images/ for serving
# Each post's images go to public/blog-images/<post-slug>/images/

set -e

BLOG_DIR="content/blog"
OUT_DIR="public/blog-images"

# Clean existing
rm -rf "$OUT_DIR"

# Copy images from each post
for post_dir in "$BLOG_DIR"/*/; do
  if [ -d "${post_dir}images" ]; then
    slug=$(basename "$post_dir")
    mkdir -p "$OUT_DIR/$slug/images"
    cp -r "${post_dir}images/"* "$OUT_DIR/$slug/images/" 2>/dev/null || true
  fi
done

echo "Blog images copied to $OUT_DIR"
