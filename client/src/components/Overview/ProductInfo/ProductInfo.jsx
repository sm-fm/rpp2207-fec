import React from 'react';

const ProductInfo = (props) => {

  const handleClick = () => {
    props.setScrollToRatings(true);
  };

  return (
    <div id='product-info'>
      <div className="stars" role="stars">
        {props.stars}
      </div>
      {props.reviews && props.reviews.count
        ? <p className="review-count" onClick={handleClick}>Read all {props.reviews.count} reviews</p>
        : null}
    </div>
  );
};

export default ProductInfo;