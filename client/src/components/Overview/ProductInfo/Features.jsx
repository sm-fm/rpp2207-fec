import React from 'react';
import IndiFeature from './IndiFeature.jsx';
import { v4 as uuidv4 } from 'uuid';

const Features = (props) => {
  return (
    <div className="features-list">
      {props.product.features.map(feature => {
        return <IndiFeature
          key={uuidv4()}
          feature={feature} />;
      })}
    </div>
  );
};

export default Features;