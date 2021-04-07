import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../common/layouts';
// import Hero from '../homepage/components/hero';
import Card from '../homepage/components/card';
import About from '../homepage/components/about';
import Seo from '../common/seo';
import Preview from '../common/components/post-preview.js';

export default ({ data }) => {
  let post = data.featuredPost.edges[0].node;
  return (
    <Layout>
      <Seo
        title={'Home Page'}
        description={data.site.siteMetadata.description}
      />
      <About />

      <div className="center mw9 mt5">
        <Preview
          key={'hero-post'}
          fluidImage={post.frontmatter.postImage.childImageSharp.fluid}
          slug={post.frontmatter.slug}
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          description={post.frontmatter.description}
        />
      </div>

      <div className="center mw9 mb4">
        <Link
          to="/blog"
          className="mt3 db no-underline ph5 pv3 sans-serif navy bg-yellow ttu tracked b hover-bg-gold">
          Read more blog posts
        </Link>
      </div>

      <div className="flex flex-wrap center mw9 justify-around">
        {data.cards.edges.map(({ node }) => (
          <Card
            key={node.frontmatter.slug}
            title={node.frontmatter.title}
            image={node.frontmatter.postImage.childImageSharp.fluid}
            to={node.frontmatter.slug}
            description={node.frontmatter.description}
          />
        ))}
      </div>

      <div className="center mw9 mb5">
        <Link
          to="/episodes"
          className="mt3 db no-underline ph5 pv3 sans-serif navy bg-yellow ttu tracked b hover-bg-gold">
          View more episodes
        </Link>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    featuredPost: allMarkdownRemark(
      limit: 1
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description: metaDescription
            slug
            date
            postImage {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    cards: allMarkdownRemark(
      limit: 4
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { type: { eq: "episode" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description: metaDescription
            slug
            postImage {
              childImageSharp {
                fluid(maxWidth: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        description
      }
    }
  }
`;
