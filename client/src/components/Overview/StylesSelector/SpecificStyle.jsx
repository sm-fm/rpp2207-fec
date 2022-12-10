import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SpecificStyle = (props) => {

  return (
    <div id="specific-style">
      {props.styleClicked === props.style.name
<<<<<<< HEAD
        ? <FontAwesomeIcon id="checkmark" icon={faCheckCircle} />
=======
        ? <FontAwesomeIcon id="checkmark" data-testid="checkmark" icon={faCheckCircle} />
>>>>>>> size-selector
        : null
      }
      <img className="icon"
        src={props.style.photos[0].thumbnail_url}
        alt="thumbnail of current style"
<<<<<<< HEAD
        onClick={() => { props.setChosenStyle(props.style); props.toggleClick(props.style.name); }} />
=======
        onClick={() => {
          props.setChosenStyle(props.style);
          props.toggleClick(props.style.name);
          props.setSkus(props.style.skus) }} />
>>>>>>> size-selector
    </div>
  )
};

export default SpecificStyle;