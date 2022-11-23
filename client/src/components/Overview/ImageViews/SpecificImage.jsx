import React, { useState, useEffect } from 'react';

const SpecificImage = (props) => {
  return (
    <div>
      <img id="thumbnail-img" src={props.photo.thumbnail_url} onClick={() => { props.setMainImg(props.photo.thumbnail_url); }} />
    </div>
  )
}

export default SpecificImage;
