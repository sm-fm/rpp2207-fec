import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificImage from './SpecificImage.jsx';

const Images = (props) => {

  return (
    <div>
      <div id="main-img">
        <img className="specific-img" src={props.mainImg} />
      </div>
      <div id="style-photos">
        {props.chosenStyle.photos.map(photo => {
          return <SpecificImage photo={photo} setMainImg={props.setMainImg} key={uuidv4()} />
        })}
      </div>
    </div>
  )
};

export default Images;