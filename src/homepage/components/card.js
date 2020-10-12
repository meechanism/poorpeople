import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import 'tachyons';

export default (props) => (
  <Link to={props.to} className="dark-gray no-underline">
    <div className="w-100 mw6 pa4 grow">
      <Img fluid={props.image} alt="" className="w-100 h5" />
      <div className="pa2 display dark-gray f3 tc mb1">{props.title}</div>
      <div className="pa2 lh-copy serif tc mb3 h3">{props.description}</div>
    </div>
  </Link>
);
