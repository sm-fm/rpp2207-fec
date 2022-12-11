import React, { useState, useEffect } from 'react';

const SpecificQuantity = (props) => {

  const handleClick = () => {
    props.setQuantity(props.num);
  };

  return (
    <option
      value={props.num}
      className="single-quantity"
      data-testid="quantity"
      onClick={handleClick}>
        {props.num}
      </option>
  );
};

export default SpecificQuantity;