import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import 'tachyons';

export default (props) => {
  return (
    <Link className="dark-gray no-underline" to={props.slug}>
      <div className="mb4 flex items-center flex-wrap grow">
        <Img
          className="w-50-l w-100 mw6 h-100"
          fluid={props.fluidImage}
          alt=""
        />
        <div className="w-50-l mw7 pa2 ph4-ns">
          <span className="db f2 display">{props.title}</span>
          <div className="mv3 mb5-ns flex justify-between">
            <div className="db f6 silver ttu tracked sans-serif">
              {props.date}
            </div>
            {props.tag && (
              <div className="db f6 silver ttu tracked sans-serif">
                TAGGED: {props.tag}
              </div>
            )}
            {props.topic && (
              <div className="db f6 silver ttu tracked sans-serif">
                TOPIC: {props.topic}
                {props.topic}
              </div>
            )}
          </div>
          <div className="serif f4 lh-copy">{props.description}</div>
        </div>
      </div>
    </Link>
  );
};
