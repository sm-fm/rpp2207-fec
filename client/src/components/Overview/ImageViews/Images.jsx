import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificImage from './SpecificImage.jsx';

const Images = (props) => {

  const [indexOfMainImg, setIndexOfMainImg] = useState(0);

  return (
    <div>
      <div id="main-img">
        <img className="specific-img" src={props.chosenStyle.photos[indexOfMainImg].thumbnail_url} />
      </div>
      <div id="style-photos">
        {props.chosenStyle.photos.map((photo, index) => {
          return <SpecificImage photo={photo} key={uuidv4()} setIndexOfMainImg={setIndexOfMainImg} index={index} indexOfMainImg={indexOfMainImg} />
        })}
      </div>
    </div>
  )
};

export default Images;