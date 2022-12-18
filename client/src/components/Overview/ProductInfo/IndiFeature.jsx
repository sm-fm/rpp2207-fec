import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const IndiFeature = (props) => {
  return (
    <div className="indi-feature-container">
      <FontAwesomeIcon
        className="feature-check"
        role="check"
        icon={faCheck} />
      <p className="indi-feature">{props.feature.feature}: {props.feature.value}</p>
    </div>
  );
};

export default IndiFeature;