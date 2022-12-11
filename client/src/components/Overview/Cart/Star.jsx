import React, { useState, useEffect } from 'react';

const Star = (props) => {
  const handleClick = () => {
    props.addToOutfit(props.product);
  };

  return (
    <div className="star-container">
      <button onClick={handleClick}>*</button>
    </div>
  );
};

export default Star;