import React, { useState, useEffect } from 'react';

const SpecificStyle = (props) => {

  return (
    <div id="specific-style">
      <img src={props.style.photos[0].thumbnail_url} />
    </div>
  )
};

export default SpecificStyle;