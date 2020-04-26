import React from 'react';
import Layout from '../common/layouts';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Seo from '../common/seo';
import Header from '../common/components/header';

export default ({ props, data }) => {
  const people = data.allMarkdownRemark.edges;

  const hosts = people.map((person, i) => {
    const personData = person.node;
    return (
      <div
        key={`host-${i}`}
        class="flex flex-wrap items-start justify-center mv4">
        <div class="w-100 mh3 mw5 pa4 bg-near-white">
          <Img
            fluid={personData.frontmatter.postImage.childImageSharp.fluid}
            alt={`Photo of ${personData.frontmatter.name}`}
          />
        </div>
        <div class="mw7 mh2 lh-copy serif flex flex-column justify-center f4">
          <h2 class="f2 lh-title ">{personData.frontmatter.name}</h2>
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
      <Seo
        title={`About ${data.site.siteMetadata.title}`}
        description={data.markdownRemark.frontmatter.title}
      />
      <Header>About {data.site.siteMetadata.title}</Header>

      <div className="mv4 center pa3 w-70-l w-100">
        <p className="f2-l display tc fw1 db lh-copy f3">
          {data.markdownRemark.frontmatter.title}
        </p>
      </div>

      <div className="mw9 center flex flex-wrap items-start">
        <div className="w-50-l w-100 pa4 bg-white mb4">
          <h2 className="bg-navy near-white pv3 ph4 ttu sans-serif no-underline mv2">
            Meet the Hosts
          </h2>
          {hosts}
        </div>
        <div
          className="w-50-l  w-100 h-copy serif pa4 f4 lh-copy"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </div>
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
    markdownRemark(frontmatter: { name: { eq: "about__pp" } }) {
      html
      frontmatter {
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
    banner: file(relativePath: { eq: "img/about__banner.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 720, maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
