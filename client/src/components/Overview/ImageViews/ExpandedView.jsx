import React, { useState, useEffect } from 'react';

const ExpandedView = (props) => {
  console.log(props.chosenStyle);
  return (
    <div>
      <img id="expanded-img" src={props.chosenStyle.photos[props.indexOfExpandedImg].thumbnail_url} />
    </div>
  );
};

export default ExpandedView;