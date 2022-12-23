import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SpecificStyle = (props) => {

  return (
    <div id="specific-style">
      {props.styleClicked === props.style.name
        ? <FontAwesomeIcon id="checkmark" data-testid="checkmark" icon={faCheckCircle} />
        : null
      }
      <img className="icon"
        src={props.style.photos[0].thumbnail_url}
        alt="thumbnail of current style"
        onClick={() => {
          props.setChosenStyle(props.style);
          props.setStyleClicked(props.style.name);
          props.setSkus(props.style.skus);
        }} />
    </div>
  );
};

export default SpecificStyle;