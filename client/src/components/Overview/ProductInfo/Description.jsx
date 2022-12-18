import React from 'react';
import Features from './Features.jsx';

const Description = (props) => {
  return (
    <div className="desc-ctn">
      <div className="slogan-description">
        <h2 className="slogan">{props.product.slogan}</h2>
        <p className="description">{props.product.description}</p>
      </div>
      <div className="features">
        {props.product.features.length !== 0
          ? <Features product={props.product} />
          : null}
      </div>
    </div>
  );
};

export default Description;