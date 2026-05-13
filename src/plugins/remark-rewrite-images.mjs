import { visit } from "unist-util-visit";

export function remarkRewriteImages() {
  return (tree, file) => {
    // Get the post directory name from the file path
    // The file.history[0] or file.path gives us the full path
    const filePath = file.history?.[0] || file.path || "";
    // Extract the blog post folder name (e.g., "1-2-3-logged" from ".../content/blog/1-2-3-logged/index.md")
    const match = filePath.match(/content\/blog\/([^/]+)\/index\.md$/);
    const postSlug = match ? match[1] : null;

    if (!postSlug) return;

    visit(tree, "image", (node) => {
      if (node.url && (node.url.startsWith("images/") || node.url.startsWith("./images/"))) {
        const normalizedUrl = node.url.replace(/^\.\//, "");
        node.url = `/blog-images/${postSlug}/${normalizedUrl}`;
      }
    });

    // Also handle HTML img tags in raw HTML nodes
    visit(tree, "html", (node) => {
      if (node.value && (node.value.includes('src="images/') || node.value.includes('src="./images/'))) {
        node.value = node.value.replace(
          /src="(?:\.\/)?images\//g,
          `src="/blog-images/${postSlug}/images/`
        );
      }
      // Handle source tags with src attributes (for video)
      if (node.value && node.value.includes('src="/images/')) {
        // These are already absolute paths to /images/, leave them for static folder
      }
    });
  };
}
