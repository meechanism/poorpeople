import React from 'react';
import Layout from './index';
import Hero from '../components/hero.js';
import Body from '../components/body.js';
import Seo from '../seo';
import MetaSeo from '../seo';
import { graphql } from 'gatsby';

export default ({ location, data }) => {
  const {
    category,
    date,
    dateOriginal,
    author,
    title,
    slug,
    metaDescription
  } = data.post.frontmatter;
  const content = data.post.html;
  return (
    <Layout>
      <Seo
        slug={slug}
        title={title}
        date={dateOriginal}
        description={metaDescription}
        author={author}
      />
      <MetaSeo title={title} description={metaDescription} />
      <Hero author={author} date={date} category={category} title={title} />
      <Body
        content={content}
        description={metaDescription}
        location={location}
      />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMM Do, YYYY")
        dateOriginal: date
        category
        author
        title
        metaDescription
        slug
      }
    }
    date: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        date
      }
    }
  }
`;
