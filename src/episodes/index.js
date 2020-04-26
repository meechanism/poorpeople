import React from 'react';
import Layout from '../common/layouts';
import { Link, graphql } from 'gatsby';
import Breadcrumbs from './components/breadcrumbs';
import Preview from './components/post-preview.js';
import Seo from '../common/seo';
import Header from '../common/components/header';
import 'tachyons';

export default class EpisodeIndex extends React.Component {
  render() {
    const posts = this.props.data.posts.edges;
    const hasNext = this.props.data.posts.pageInfo.hasNextPage;
    return (
      <Layout>
        <Seo
          title={`All Episodes - Page ${this.props.pageContext.pageNumber}`}
          description={`Index of all episodes. Page ${this.props.pageContext.pageNumber}`}
        />
        <Header>All Episodes</Header>

        <div className="mw9 center">
          <Breadcrumbs
            lastName="Episodes"
            lastPath="/episodes"
            currentPage={`Page ${this.props.pageContext.pageNumber}`}
          />
          {posts.map(({ node }) => (
            <Preview
              fluidImage={node.frontmatter.postImage.childImageSharp.fluid}
              slug={node.frontmatter.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              category={node.frontmatter.category}
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
  query posts($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } } }
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
