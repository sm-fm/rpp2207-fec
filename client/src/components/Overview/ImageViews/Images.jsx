import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificImage from './SpecificImage.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Images = (props) => {

  const [indexOfMainImg, setIndexOfMainImg] = useState(0);

  const handleLeftClick = () => {
    setIndexOfMainImg(indexOfMainImg - 1);
  }

  const handleRightClick = () => {
    setIndexOfMainImg(indexOfMainImg + 1);
  }

  return (
    <div>
      <div id="main-img">
        {indexOfMainImg === 0
          ? null
          : <FontAwesomeIcon
            id="left-arrow"
            icon={faAngleLeft}
            onClick={() => handleLeftClick()} />
        }
        {indexOfMainImg === props.photos.length - 1
          ? null
          : <FontAwesomeIcon
              id="right-arrow"
              icon={faAngleRight}
              onClick={() => handleRightClick()} />
          }
        <img
          className="specific-img"
          src={props.chosenStyle.photos[indexOfMainImg].thumbnail_url}
          onClick={() => { props.setExpandedView(true); props.setIndexOfExpandedImg(indexOfMainImg); }}/>
      </div>
      <div id="style-photos">
        <FontAwesomeIcon id="up-arrow" icon={faAngleUp} />
        {props.chosenStyle.photos.map((photo, index) => {
          return <SpecificImage photo={photo} key={uuidv4()} setIndexOfMainImg={setIndexOfMainImg} index={index} indexOfMainImg={indexOfMainImg} />
        })}
       <FontAwesomeIcon id="down-arrow" icon={faAngleDown} />
      </div>
    </div>
  )
};

export default Images;