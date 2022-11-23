import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificImage from './SpecificImage.jsx';

const Images = (props) => {

  return (
    <div>
      {props.chosenStyle.photos
        ? <img src={props.chosenStyle.photos[0].thumbnail_url} />
        : null}
      <div id="specific-photo">
        {props.chosenStyle.photos.map(photo => {
          return <SpecificImage photo={photo} key={uuidv4()} />
        })}
      </div>
    </div>
  )
};

export default Images;