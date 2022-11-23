import React, { useState, useEffect } from 'react';
import checkmark3 from './checkmark3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircleO } from '@fortawesome/free-solid-svg-icons';

const SpecificStyle = (props) => {

  const [clicked, toggleClick] = useState(false);

  return (
    <div id="specific-style">
      {clicked
        ? <FontAwesomeIcon id="checkmark" icon="fa-sharp fa-solid fa-check" />
        : null
      }
      <img className="icon" src={props.style.photos[0].thumbnail_url} onClick={() => { props.setChosenStyle(props.style); toggleClick(true) }} />
    </div>
  )
};

export default SpecificStyle;