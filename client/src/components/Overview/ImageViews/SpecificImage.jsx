import React, { useState, useEffect } from 'react';

const SpecificImage = (props) => {
  return (
    <img src={props.photo.thumbnail_url} onClick={() => { props.setMainImg(props.photo.thumbnail_url); }} />
  )
}

export default SpecificImage;