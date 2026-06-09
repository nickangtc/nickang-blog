export const initialPostsPerList = 8;
export const postsPerInfiniteLoad = 4;

export function getPaginatedListConfig(totalCount: number, pageIndex: number) {
  const numPages =
    totalCount <= initialPostsPerList
      ? 1
      : 1 +
        Math.ceil(
          (totalCount - initialPostsPerList) / postsPerInfiniteLoad
        );

  return {
    numPages,
    limit:
      pageIndex === 0 ? initialPostsPerList : postsPerInfiniteLoad,
    skip:
      pageIndex === 0
        ? 0
        : initialPostsPerList + (pageIndex - 1) * postsPerInfiniteLoad,
  };
}

export interface PostEntry {
  slug: string;
  title: string;
  date_published: string;
  ai_summary?: string;
  html?: string;
}

export interface PageData {
  posts: PostEntry[];
  currentPage: number;
  numPages: number;
  basePath?: string;
}
