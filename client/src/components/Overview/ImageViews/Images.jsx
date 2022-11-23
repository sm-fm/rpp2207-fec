import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificImage from './SpecificImage.jsx';

const Images = (props) => {

  const [mainImg, setMainImg] = useState(props.chosenStyle.photos[0].thumbnail_url);

  return (
    <div>
      <img src={mainImg} />
      <div id="specific-photo">
        {props.chosenStyle.photos.map(photo => {
          return <SpecificImage photo={photo} setMainImg={setMainImg} key={uuidv4()} />
        })}
      </div>
    </div>
  )
};

export default Images;