import React from 'react';
import Features from './Features.jsx';

const Description = (props) => {
  if (props && props.product) {
    return (
      <>
        <div className="slogan-description">
          <h2 className="slogan" data-testid="slogan">{props.product.slogan}</h2>
          <p className="description" data-testid="description">{props.product.description}</p>
        </div>
        <div className="features">
          {props.product.features.length !== 0
            ? <Features product={props.product} />
            : null}
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Description;