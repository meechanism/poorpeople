const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            # Alias the queries

            # Episode posts
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
          }
        `
      ).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        const allPosts = result.data.allPosts.edges;
        const groupedPosts = result.data.allPosts.group;
        const paginationTemplate = path.resolve('src/episodes/index.js');
        const postsPerPage = 10;
        let numPages = Math.ceil(allPosts.length / postsPerPage);

        // Creating the main episode index
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/episodes' : `/episodes/${i + 1}`,
            component: paginationTemplate,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              nextPage: `/episodes/${i + 2}`,
              pageNumber: i + 1
            }
          });
        });

        // Creating all category pages.
        let category;
        let categoryPosts;
        const categoryTemplate = path.resolve('src/episodes/category.js');
        groupedPosts.forEach((group, _) => {
          category = group.fieldValue;
          categoryPosts = group.edges;
          numPages = Math.ceil(categoryPosts.length / postsPerPage);
          Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/${category}` : `/${category}/${i + 1}`,
              component: categoryTemplate,
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                nextPage: `/${category}/${i + 2}`,
                pageNumber: i + 1,
                category: category
              }
            });
          });
        });

        // Create all the episodes post pages.
        const template = path.resolve('src/episodes/post.js');
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
      })
    );
  });
};
