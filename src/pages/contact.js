import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import 'tachyons';

import Layout from '../common/layouts/';
import Seo from '../common/seo';
import Header from '../common/components/header';

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteTitle: title
            mailChimpUrl
            pinterest
            facebook
            twitter
            youtube
            github
          }
        }
      }
    `}
    render={(data) => (
      <Layout>
        <Seo title="Contact" description="Contact the Poor People team" />
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header>Contact</Header>
        <div className="lh-copy f4 serif mw8 center mv5 ph4">
          <p>
            If you have any comments, suggestions, concerns, topics, want to be
            interviewed, or anything else you would like to discuss, please
            contact us. We are available on social media!
          </p>
          <ul>
            {data.site.siteMetadata.facebook && (
              <li>
                Facebook:{' '}
                <a
                  className="light-red no-underline"
                  href={data.site.siteMetadata.facebook}>
                  Poor People Podcast
                </a>
              </li>
            )}
            {data.site.siteMetadata.youtube && (
              <li>
                YouTube:{' '}
                <a
                  className="light-red no-underline"
                  href={data.site.siteMetadata.youtube}>
                  Poor People Podcast
                </a>
              </li>
            )}
            {data.site.siteMetadata.github && (
              <li>
                Github:{' '}
                <a
                  className="light-red no-underline"
                  href={data.site.siteMetadata.github}>
                  Poor People Podcast
                </a>
              </li>
            )}
            {data.site.siteMetadata.twitter && (
              <li>
                Twitter:{' '}
                <a
                  className="light-red no-underline"
                  href={data.site.siteMetadata.twitter}>
                  @PoorPeoplePod
                </a>
              </li>
            )}
          </ul>
        </div>
      </Layout>
    )}
  />
);
