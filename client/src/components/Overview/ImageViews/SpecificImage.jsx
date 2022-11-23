import React, { useState, useEffect } from 'react';

const SpecificImage = (props) => {
  return (
    <div>
      <img id="thumbnail-img" src={props.photo.thumbnail_url} onClick={() => { props.setMainImg(props.photo.thumbnail_url);/*props.setChosenStyle(props.chosenStyle); */ }} />
    </div>
  )
}

export default SpecificImage;
