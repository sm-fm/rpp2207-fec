import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const ExpandedView = (props) => {

  const [indexOfCurrentImg, setIndexOfCurrentImg] = useState(props.indexOfExpandedImg);

  const handleLeftClick = () => {
    setIndexOfCurrentImg(indexOfCurrentImg - 1);
  }

  const handleRightClick = () => {
    setIndexOfCurrentImg(indexOfCurrentImg + 1);
  }

  return (
    <div id="expanded-view">
      {indexOfCurrentImg === 0
          ? null
          : <FontAwesomeIcon id="left-arrow" icon={faAngleLeft} onClick={() => handleLeftClick()} />
        }
        {indexOfCurrentImg === props.photos.length - 1
          ? null
          : <FontAwesomeIcon id="right-arrow" icon={faAngleRight} onClick={() => handleRightClick()} />
          }
      <div id="circle-expanded-view">
        {props.photos.map((photo, index) => {
          const highlight = {
            transform: indexOfCurrentImg === index ? 'scale(2.5)' : null
          };
          return <FontAwesomeIcon id="circle" style={highlight} icon={faCircle} key={uuidv4()} />
        })}
      </div>
      <img id="expanded-img" src={props.chosenStyle.photos[indexOfCurrentImg].thumbnail_url} />
    </div>
  );
};

export default ExpandedView;