const path = require('path');

const POSTS_PER_PAGE = 10;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            # Alias the queries
            # name: query

            # Blog posts
            allPosts: allMarkdownRemark(
              filter: { frontmatter: { type: { eq: "post" } } }
              sort: { fields: frontmatter___date, order: DESC }
            ) {
              edges {
                node {
                  frontmatter {
                    slug
                  }
                }
              }
              group(field: frontmatter___category) {
                fieldValue
                edges {
                  node {
                    frontmatter {
                      slug
                    }
                  }
                }
              }
            }

            # Episode posts
            allEpisodes: allMarkdownRemark(
              filter: { frontmatter: { type: { eq: "episode" } } }
              sort: { fields: frontmatter___date, order: DESC }
            ) {
              edges {
                node {
                  frontmatter {
                    slug
                  }
                }
              }
              group(field: frontmatter___topic) {
                fieldValue
                edges {
                  node {
                    frontmatter {
                      slug
                    }
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        const template = path.resolve('./src/common/layouts/post.js');
        const episodesTmpl = path.resolve('./src/templates/episodes.js');
        const blogTmpl = path.resolve('./src/templates/blog.js');
        const categoryTemplate = path.resolve('src/templates/category.js');
        const topicTemplate = path.resolve('src/templates/topic.js');

        const allPosts = result.data.allPosts.edges;
        const allEpisodes = result.data.allEpisodes.edges;

        const groupedPosts = result.data.allPosts.group;
        const groupedEpisodes = result.data.allEpisodes.group;

        let blogPageCount = Math.ceil(allPosts.length / POSTS_PER_PAGE);
        let epPageCount = Math.ceil(allEpisodes.length / POSTS_PER_PAGE);

        // Creating the main episode index
        Array.from({ length: epPageCount }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/episodes' : `/episodes/${i + 1}`,
            component: episodesTmpl,
            context: {
              limit: POSTS_PER_PAGE,
              skip: i * POSTS_PER_PAGE,
              nextPage: `/episodes/${i + 2}`,
              pageNumber: i + 1
            }
          });
        });

        // Creating the main posts index
        Array.from({ length: blogPageCount }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/blog' : `/blog/${i + 1}`,
            component: blogTmpl,
            context: {
              limit: POSTS_PER_PAGE,
              skip: i * POSTS_PER_PAGE,
              nextPage: `/blog/${i + 2}`,
              pageNumber: i + 1
            }
          });
        });

        // Creating all category pages (for blog posts)
        let category;
        let categoryPosts;
        groupedPosts.forEach((group, _) => {
          category = group.fieldValue;
          categoryPosts = group.edges;
          numPages = Math.ceil(categoryPosts.length / POSTS_PER_PAGE);
          Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/${category}` : `/${category}/${i + 1}`,
              component: categoryTemplate,
              context: {
                limit: POSTS_PER_PAGE,
                skip: i * POSTS_PER_PAGE,
                nextPage: `/${category}/${i + 2}`,
                pageNumber: i + 1,
                category: category
              }
            });
          });
        });

        // Creating all topic pages (for episodes)
        let topic;
        let topicPosts;

        groupedEpisodes.forEach((group, _) => {
          // Example:
          //  {
          //   "fieldValue": "healthcare",
          //   "edges": [
          //     { "node": { "frontmatter": { "slug": "/ep4-healthcare-part2" } } },
          //     { "node": { "frontmatter": { "slug": "/ep3-healthcare-part1" } } }
          //   ]
          // },

          topic = group.fieldValue;
          topicPosts = group.edges;
          numPages = Math.ceil(topicPosts.length / POSTS_PER_PAGE);
          Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/${topic}` : `/${topic}/${i + 1}`,
              component: topicTemplate,
              context: {
                limit: POSTS_PER_PAGE,
                skip: i * POSTS_PER_PAGE,
                nextPage: `/${topic}/${i + 2}`,
                pageNumber: i + 1,
                topic: topic
              }
            });
          });
        });

        // Create all the post pages.
        allPosts.forEach(({ node }) => {
          let slug = node.frontmatter.slug;
          createPage({
            path: slug,
            component: template,
            context: {
              slug
            }
          });
        });

        // Create all the post pages.
        allEpisodes.forEach(({ node }) => {
          let slug = node.frontmatter.slug;
          createPage({
            path: slug,
            component: template,
            context: {
              slug
            }
          });
        });
      })
    );
  });
};
