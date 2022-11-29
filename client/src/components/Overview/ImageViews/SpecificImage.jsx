import React, { useState, useEffect } from 'react';

const SpecificImage = (props) => {

  const highlight = {
    borderBottom: props.index === props.indexOfMainImg ? '5px solid black' : 'none'
  };

  return (
    <div>
      <img id="thumbnail-img" style={highlight} src={props.photo.thumbnail_url} onClick={() => { props.setIndexOfMainImg(props.index); }} />
    </div>
  )
}

export default SpecificImage;
