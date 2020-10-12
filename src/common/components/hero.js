import React from 'react';
import { Link } from 'gatsby';
import 'tachyons';

export default (props) => {
  // Blogs have categories
  // Episodes have topics
  const tag = props.category ? props.category : props.topic;
  return (
    <div className="bg-gold ph2 pv5 flex flex-column justify-center items-center">
      <Link to={`/${tag}`} className="sans-serif ttu mid-gray tracked f6">
        {tag}
      </Link>
      <h1 className="dark-gray display fw4 f1-l f2 tc">{props.title}</h1>
      <span className="sans-serif tracked ttu f6 mb2">by {props.author}</span>
      <span className="sans-serif tracked ttu f6">{props.date}</span>
    </div>
  );
};
