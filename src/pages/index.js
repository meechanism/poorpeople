import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../common/layouts';
import Hero from '../homepage/components/hero';
import Card from '../homepage/components/card';
import About from '../homepage/components/about';
import Seo from '../common/seo';

export default ({ data }) => {
  let post = data.featuredPost.edges[0].node;
  return (
    <Layout>
      <Seo
        title={'Home Page'}
        description={data.site.siteMetadata.description}
      />
      <About />
      <Hero
        title={post.frontmatter.title}
        image={post.frontmatter.postImage.childImageSharp.fluid}
        to={post.frontmatter.slug}
        description={post.frontmatter.description}
      />
      <div className="flex flex-wrap center mw9 justify-around pb3">
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
            postImage {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    cards: allMarkdownRemark(
      limit: 3
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
                fluid(maxWidth: 1920) {
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
