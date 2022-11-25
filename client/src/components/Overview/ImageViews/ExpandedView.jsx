import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

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
      <img id="expanded-img" src={props.chosenStyle.photos[indexOfCurrentImg].thumbnail_url} />
    </div>
  );
};

export default ExpandedView;