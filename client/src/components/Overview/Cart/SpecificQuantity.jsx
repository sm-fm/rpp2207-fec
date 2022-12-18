import React, { useState, useEffect } from 'react';

const SpecificQuantity = (props) => {

  const handleClick = () => {
    props.setQuantity(props.num);
    props.setQuantChosen(props.num);
  };

  return (
    <li
      value={props.num}
      className="single-quantity"
      data-testid="quantity"
      onClick={handleClick}>
      {props.num}
    </li>
  );
};

export default SpecificQuantity;