import React from 'react';
import Layout from '../common/layouts';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Seo from '../common/seo';

export default ({ props, data }) => {
  const desc = `Hosts of ${data.site.siteMetadata.title}`;
  const people = data.allMarkdownRemark.edges;

  const hosts = people.map((person, i) => {
    const personData = person.node;
    return (
      <div
        key={`host-${i}`}
        class="flex flex-wrap items-start justify-center mv6">
        <Img
          fluid={personData.frontmatter.postImage.childImageSharp.fluid}
          alt="The Author"
          className="w-20 mh3"
        />
        <div class="mw7 w-80 mh3 lh-copy serif flex flex-column justify-center f4">
          <h2 class="f2 lh-title">{personData.frontmatter.name}</h2>
          <div
            class="lh-copy serif"
            dangerouslySetInnerHTML={{ __html: personData.html }}
          />
        </div>
      </div>
    );
  });
  return (
    <Layout>
      <Seo title={desc} description={desc} />
      <div className="pv5 flex items-center justify-center bg-white">
        <h1 className="fw1 tc f2 display">{desc}</h1>
      </div>
      {hosts}
    </Layout>
  );
};

export const dataQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "host" } } }) {
      edges {
        node {
          html
          frontmatter {
            name
            title
            postImage {
              childImageSharp {
                original {
                  src
                }
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
