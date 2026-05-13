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
  slug=$(basename "$post_dir")

  # Copy images/ subdirectory if it exists
  if [ -d "${post_dir}images" ]; then
    mkdir -p "$OUT_DIR/$slug/images"
    cp -r "${post_dir}images/"* "$OUT_DIR/$slug/images/" 2>/dev/null || true
  fi

  # Copy image files at the post root directory (e.g., album/ig.jpeg)
  root_images=$(find "$post_dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.gif' -o -iname '*.svg' -o -iname '*.webp' \) 2>/dev/null)
  if [ -n "$root_images" ]; then
    mkdir -p "$OUT_DIR/$slug"
    echo "$root_images" | while read -r img; do
      cp "$img" "$OUT_DIR/$slug/" 2>/dev/null || true
    done
  fi
done

echo "Blog images copied to $OUT_DIR"
