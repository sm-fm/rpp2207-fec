import React from 'react';
import IndiFeature from './IndiFeature.jsx';
import { v4 as uuidv4 } from 'uuid';

const Features = (props) => {
  if (props && props.product && Object.keys(props.product).length > 0) {
    return (
      <div className="features-list">
        {props.product.features.map(feature => {
          return <IndiFeature
            key={uuidv4()}
            role="feature-check"
            feature={feature} />;
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default Features;