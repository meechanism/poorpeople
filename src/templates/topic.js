import React from 'react';
import { Link, graphql } from 'gatsby';
import 'tachyons';

import Layout from '../common/layouts';
import Breadcrumbs from '../common/components/breadcrumbs';
import Preview from '../common/components/post-preview';
import Seo from '../common/seo';

export default class EpisodeIndex extends React.Component {
  render() {
    const posts = this.props.data.posts.edges;
    const hasNext = this.props.data.posts.pageInfo.hasNextPage;
    const topic = this.props.pageContext.topic;
    return (
      <Layout>
        <Seo
          title={`Posts Tagged ${topic} - Page ${this.props.pageContext.pageNumber}`}
        />
        <div className="pv5 flex items-center justify-center bg-washed-red">
          <h1 className="fw1 tc f2 display">Posts Tagged {topic}</h1>
        </div>
        <div className="mw9 center">
          <Breadcrumbs
            lastName={topic}
            lastPath={`${topic}`}
            currentPage={`Page ${this.props.pageContext.pageNumber}`}
          />
          {posts.map(({ node }) => (
            <Preview
              fluidImage={node.frontmatter.postImage.childImageSharp.fluid}
              slug={node.frontmatter.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              tag={node.frontmatter.topic}
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
  query topicPosts($skip: Int!, $limit: Int!, $topic: String!) {
    posts: allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "episode" }, topic: { eq: $topic } }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            topic
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
