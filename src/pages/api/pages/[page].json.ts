import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, render } from "astro:content";
import { getPaginatedListConfig } from "../../../lib/pagination";

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getCollection("blog");
  const blogPosts = allPosts
    .filter((post) => {
      return (
        post.data.status !== "draft" &&
        !post.data.tags?.includes("Personal") &&
        !post.data.tags?.includes("Project")
      );
    })
    .sort(
      (a, b) =>
        new Date(b.data.date_published).getTime() -
        new Date(a.data.date_published).getTime()
    );

  const config = getPaginatedListConfig(blogPosts.length, 0);
  const paths = [];

  for (let i = 1; i < config.numPages; i++) {
    const pageConfig = getPaginatedListConfig(blogPosts.length, i);
    const pagePosts = blogPosts.slice(
      pageConfig.skip,
      pageConfig.skip + pageConfig.limit
    );

    const renderedPosts = await Promise.all(
      pagePosts.map(async (post) => {
        return {
          slug: post.id,
          title: post.data.title,
          date_published: new Date(
            post.data.date_published
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
      })
    );

    paths.push({
      params: { page: String(i + 1) },
      props: {
        posts: renderedPosts,
        currentPage: i + 1,
        numPages: config.numPages,
      },
    });
  }

  return paths;
};

export const GET: APIRoute = ({ props }) => {
  return new Response(JSON.stringify(props), {
    headers: { "Content-Type": "application/json" },
  });
};
