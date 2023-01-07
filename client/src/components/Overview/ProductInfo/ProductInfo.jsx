import React from 'react';

const ProductInfo = (props) => {
  console.log('Props: ', props);

  const handleClick = () => {
    props.setScrollToRatings(true);
  };

  if (props || props.stars || props.reviews) {
    return (
      <div id='product-info'>
        <div className="stars" data-testid="stars">
          {props.stars}
        </div>
        {props.reviews
          ? <p className="review-count" onClick={handleClick}>Read all {props.reviews} reviews</p>
          : null}
        <div className="category-container">
          {props.product.category
            ? <h2 className="category-name">{props.product.category}</h2>
            : null}
        </div>
        <h1 className="product-name">{props.product.name}</h1>
      </div>
    );
  }
};

export default ProductInfo;