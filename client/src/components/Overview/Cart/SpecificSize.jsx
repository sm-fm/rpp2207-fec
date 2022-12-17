import React, { useState, useEffect } from 'react';

const SpecificSize = (props) => {

  const handleClick = (e) => {
    props.setDefaultVal(props.size);
  }

  if (props.size) {
    return (
      <option
        value={props.size}
        className="size-item"
        onClick={handleClick}>
        {props.size}
      </option>
    )
  }
};

export default SpecificSize;