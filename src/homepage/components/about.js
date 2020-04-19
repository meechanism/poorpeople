import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            homepageHeader
            homepageAbout
          }
        }
      }
    `}
    render={(data) => (
      <div className="bg-navy flex flex-column justify-center items-center ph3 pv5">
        <h1 className="fw1 display db near-white f2 tc">
          {data.site.siteMetadata.homepageHeader}
        </h1>
        <p className="f4 serif mw7 tc lh-copy lightest-blue">
          {data.site.siteMetadata.homepageAbout}
        </p>
        <Link
          to="/about"
          className="mt3 db no-underline ph5 pv3 sans-serif navy bg-yellow ttu tracked b hover-bg-gold">
          Learn More
        </Link>
      </div>
    )}
  />
);
