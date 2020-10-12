import React from 'react';
import { Link, graphql } from 'gatsby';
import 'tachyons';

import Layout from '../common/layouts';
import Breadcrumbs from '../common/components/breadcrumbs';
import Preview from '../common/components/post-preview.js';
import Seo from '../common/seo';
import Header from '../common/components/header';

const TITLE = 'Episodes';

export default class EpisodeIndex extends React.Component {
  render() {
    const episodes = this.props.data.episodes.edges;
    const hasNext = this.props.data.episodes.pageInfo.hasNextPage;

    return (
      <Layout>
        <Seo
          title={`${TITLE} - Page ${this.props.pageContext.pageNumber}`}
          description={`Index of all episodes. Page ${this.props.pageContext.pageNumber}`}
        />
        <Header>{TITLE}</Header>

        <div className="mw9 center">
          <Breadcrumbs
            lastName={TITLE}
            lastPath="/episodes"
            currentPage={`Page ${this.props.pageContext.pageNumber}`}
          />
          {episodes.map(({ node }) => (
            <Preview
              key={node.frontmatter.slug}
              fluidImage={node.frontmatter.postImage.childImageSharp.fluid}
              slug={node.frontmatter.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              tag={
                node.frontmatter.category
                  ? node.frontmatter.category
                  : node.frontmatter.topic
              }
              description={node.frontmatter.metaDescription}
            />
          ))}
          <div className="pv5 flex w-100">
            {hasNext && (
              <Link
                className="dark-gray sans-serif ttu tracked no-underline"
                to={this.props.pageContext.nextPage}>
                Next Page &rarr;
              </Link>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export const episodeListQuery = graphql`
  query episodes($skip: Int!, $limit: Int!) {
    episodes: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "episode" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            category
            metaDescription
            slug
            postImage {
              childImageSharp {
                fluid(maxWidth: 1080, maxHeight: 512) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
