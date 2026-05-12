const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// onCreateNode: Called when a new node is created
// node refers to a piece of data in Gatsby (e.g. blog post, page)
// all data that's added to Gatsby is modeled using nodes.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Add slug field to all markdown nodes from folder name
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      value: slug,
      node,
    })
  }
}

const initialPostsPerList = 8
const postsPerInfiniteLoad = 4

const getPaginatedListConfig = (totalCount, pageIndex) => {
  const numPages =
    totalCount <= initialPostsPerList
      ? 1
      : 1 + Math.ceil((totalCount - initialPostsPerList) / postsPerInfiniteLoad)

  return {
    numPages,
    limit: pageIndex === 0 ? initialPostsPerList : postsPerInfiniteLoad,
    skip:
      pageIndex === 0
        ? 0
        : initialPostsPerList + (pageIndex - 1) * postsPerInfiniteLoad,
  }
}

const topicPages = [
  {
    tag: "Tech",
    title: "Tech",
    basePath: "/tech",
    intro: "Articles about software engineering and web development.",
    eyebrow: "Topic",
  },
  {
    tag: "Living",
    title: "Living",
    basePath: "/living",
    intro: "Articles about living a meaningful life.",
    eyebrow: "Topic",
  },
  {
    tag: "Creativity",
    title: "Creativity",
    basePath: "/creativity",
    intro:
      "Articles about writing, blogging, visual thinking, problem solving, and just about anything creative.",
    eyebrow: "Topic",
  },
  {
    tag: "Annual Review",
    title: "Annual Review",
    basePath: "/annual-review",
    intro: "Yearly reflections on what happened, what changed, and what I learned.",
    eyebrow: "Topic",
  },
  {
    tag: "Leadership",
    title: "Leadership",
    basePath: "/leadership",
    intro: "Articles about being a leader.",
    eyebrow: "Topic",
  },
  {
    tag: "Communication",
    title: "Communication",
    basePath: "/communication",
    intro: "Articles about mastering the art of communication.",
    eyebrow: "Topic",
  },
  {
    tag: "Books",
    title: "Books",
    basePath: "/books",
    intro: "Notes and reflections from books I've read.",
    eyebrow: "Topic",
  },
]

// createPages: Generate blog post pages
// Backlinks are now stored in frontmatter and queried directly
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const topicList = path.resolve(`./src/templates/topic-list.js`)
  const projectsList = path.resolve(`./src/templates/projects-list.js`)

  const projectsPage = {
    tag: "Project",
    title: "Projects",
    basePath: "/projects",
    intro: "Things I've made. This page in WIP.",
  }
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { date_published: DESC } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                status
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges
  const blogPosts = posts.filter(post => {
    const frontmatter = post.node.frontmatter
    return (
      frontmatter.status !== "draft" &&
      !frontmatter.tags?.includes("Personal") &&
      !frontmatter.tags?.includes("Project")
    )
  })

  // Create individual blog post pages
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create paginated blog index pages. The first page renders more posts;
  // subsequent pages are fetched by infinite scroll in smaller batches.
  const blogNumPages = getPaginatedListConfig(blogPosts.length, 0).numPages

  Array.from({ length: blogNumPages }).forEach((_, i) => {
    const pagination = getPaginatedListConfig(blogPosts.length, i)

    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: pagination.limit,
        skip: pagination.skip,
        numPages: pagination.numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create paginated topic pages
  topicPages.forEach(topic => {
    const topicPosts = posts.filter(post => {
      const frontmatter = post.node.frontmatter
      return (
        frontmatter.status !== "draft" &&
        frontmatter.tags &&
        frontmatter.tags.includes(topic.tag)
      )
    })
    const topicNumPages = getPaginatedListConfig(topicPosts.length, 0).numPages

    Array.from({ length: topicNumPages }).forEach((_, i) => {
      const pagination = getPaginatedListConfig(topicPosts.length, i)

      createPage({
        path: i === 0 ? topic.basePath : `${topic.basePath}/${i + 1}`,
        component: topicList,
        context: {
          tag: topic.tag,
          title: topic.title,
          intro: topic.intro,
          eyebrow: topic.eyebrow,
          basePath: topic.basePath,
          limit: pagination.limit,
          skip: pagination.skip,
          numPages: pagination.numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create paginated project pages (separate from topics)
  const projectPosts = posts.filter(post => {
    const frontmatter = post.node.frontmatter
    return (
      frontmatter.status !== "draft" &&
      frontmatter.tags &&
      frontmatter.tags.includes(projectsPage.tag)
    )
  })
  const projectNumPages = getPaginatedListConfig(projectPosts.length, 0).numPages

  Array.from({ length: projectNumPages }).forEach((_, i) => {
    const pagination = getPaginatedListConfig(projectPosts.length, i)

    createPage({
      path: i === 0 ? projectsPage.basePath : `${projectsPage.basePath}/${i + 1}`,
      component: projectsList,
      context: {
        tag: projectsPage.tag,
        title: projectsPage.title,
        intro: projectsPage.intro,
        basePath: projectsPage.basePath,
        limit: pagination.limit,
        skip: pagination.skip,
        numPages: pagination.numPages,
        currentPage: i + 1,
      },
    })
  })
}
