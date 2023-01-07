import React from 'react';

const Star = (props) => {
  const handleClick = () => {
    props.product.styles = {};
    props.product.styles.results = props.styles;
    props.addToOutfit(props.product);
  };

  return (
    <div className="star-container">
      <button data-testid="star" className="star" onClick={handleClick}>*</button>
    </div>
  );
};

export default Star;