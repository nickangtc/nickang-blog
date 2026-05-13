import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { getPaginatedListConfig } from "../../../../lib/pagination";
import { topicPages, projectsPage } from "../../../../lib/topics";

const allTopicConfigs = [
  ...topicPages.map((t) => ({
    tag: t.tag,
    basePath: t.basePath,
    slug: t.basePath.replace("/", ""),
  })),
  {
    tag: projectsPage.tag,
    basePath: projectsPage.basePath,
    slug: projectsPage.basePath.replace("/", ""),
  },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getCollection("blog");
  const paths = [];

  for (const topicConfig of allTopicConfigs) {
    const topicPosts = allPosts
      .filter(
        (post) =>
          post.data.status !== "draft" &&
          post.data.tags?.includes(topicConfig.tag)
      )
      .sort(
        (a, b) =>
          new Date(b.data.date_published).getTime() -
          new Date(a.data.date_published).getTime()
      );

    const config = getPaginatedListConfig(topicPosts.length, 0);

    for (let i = 1; i < config.numPages; i++) {
      const pageConfig = getPaginatedListConfig(topicPosts.length, i);
      const pagePosts = topicPosts.slice(
        pageConfig.skip,
        pageConfig.skip + pageConfig.limit
      );

      const renderedPosts = pagePosts.map((post) => ({
        slug: post.id,
        title: post.data.title,
        date_published: new Date(post.data.date_published).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
        excerpt: post.data.excerpt || "",
        cover: post.data.cover || "",
      }));

      paths.push({
        params: {
          topic: topicConfig.slug,
          page: String(i + 1),
        },
        props: {
          posts: renderedPosts,
          currentPage: i + 1,
          numPages: config.numPages,
        },
      });
    }
  }

  return paths;
};

export const GET: APIRoute = ({ props }) => {
  return new Response(JSON.stringify(props), {
    headers: { "Content-Type": "application/json" },
  });
};
