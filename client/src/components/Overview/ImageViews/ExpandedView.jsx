import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Zoom from './Zoom.jsx';

const ExpandedView = (props) => {
  const [indexOfCurrentImg, setIndexOfCurrentImg] = useState(props.indexOfExpandedImg);
  const [zoomView, setZoomView] = useState(false);
  const [photos, setPhotos] = useState(props.photos);

  const handleLeftClick = () => {
    setIndexOfCurrentImg(indexOfCurrentImg - 1);
  };

  const handleRightClick = () => {
    setIndexOfCurrentImg(indexOfCurrentImg + 1);
  };

  if (!zoomView) {
    return (
      <div id="expanded-view">
        <FontAwesomeIcon
          id="exit-expanded"
          icon={faX}
          onClick={() => props.setExpandedView(false)} />
        {indexOfCurrentImg === 0
          ? null
          : <FontAwesomeIcon
            id="left-arrow"
            data-testid="left-arrow"
            icon={faAngleLeft}
            onClick={() => handleLeftClick()} />
        }
        {photos && indexOfCurrentImg === photos.length - 1
          ? null
          : <FontAwesomeIcon
            id="right-arrow"
            data-testid="right-arrow"
            icon={faAngleRight}
            onClick={() => handleRightClick()} />
        }
        <div id="circle-expanded-view">
          {photos ?
            photos.map((photo, index) => {
              const highlight = {
                transform: indexOfCurrentImg === index ? 'scale(2)' : null
              };
              return <FontAwesomeIcon
                id="circle"
                data-testid={`circle ${index}`}
                style={highlight}
                icon={faCircle}
                key={uuidv4()}
                onClick={() => setIndexOfCurrentImg(index)} />;
            })
            : null}
        </div>
        <img
          src={props.chosenStyle.photos[indexOfCurrentImg].thumbnail_url.replace('w=300', 'w=1000')}
          alt="Image of current style"
          loading="lazy"
          id="expanded-img"
          onClick={() => setZoomView(true)}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Zoom
          img={props.chosenStyle.photos[indexOfCurrentImg].thumbnail_url}
          setZoomView={setZoomView} />
      </div>
    );
  }
};

export default ExpandedView;