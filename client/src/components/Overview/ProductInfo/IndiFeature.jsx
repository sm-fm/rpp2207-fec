import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const IndiFeature = (props) => {
  if (props) {
    return (
      <div className="indi-feature-container">
        <FontAwesomeIcon
          className="feature-check"
          role="check"
          data-testid="check"
          icon={faCheck} />
        <p className="indi-feature" role="indi-feature">{props.feature.feature}: {props.feature.value}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default IndiFeature;