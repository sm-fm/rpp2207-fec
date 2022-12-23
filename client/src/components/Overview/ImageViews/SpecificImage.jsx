import React, { useState, useEffect } from 'react';

const SpecificImage = (props) => {

  const highlight = {
    borderBottom: props.index === props.indexOfMainImg ? '5px solid black' : 'none'
  };

  return (
    <div>
      {props.photo
        ?
        <img
          id="thumbnail-img"
          alt="thumbnail of image style"
          style={highlight}
          src={props.photo.thumbnail_url}
          onClick={() => { props.setIndexOfMainImg(props.index); }} />
        : null}
    </div>
  );
};

export default SpecificImage;
