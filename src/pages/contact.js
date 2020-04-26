import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../common/layouts/';
import Seo from '../common/seo';
import Header from '../common/components/header';
import 'tachyons';

export default () => (
  <Layout>
    <Seo title="Contact" description="Contact the Poor People team" />
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <Header>Contact</Header>
    <div className="lh-copy f4 serif mw8 center mv5 ph4">
      <p>
        If you have any comments, suggestions, concerns, topics, want to be
        interviewed, or anything else you would like to discuss, please contact
        us. We will try our best to contact you back within 1-3 business days.
      </p>
      [form]
    </div>
  </Layout>
);
