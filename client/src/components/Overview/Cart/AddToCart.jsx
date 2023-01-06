import React, { useState, useEffect } from 'react';
import API from '../../../API/Overview.js';

const AddToCart = (props) => {

  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleOptionsClick = () => {
    props.setNeedSize(true);
  };

  const handlePutClick = () => {
    const data = {
      'sku_id': props.skuSelected,
      count: props.countPurchasing
    };
    API.addToCart(data)
      .then(() => {
        setPurchaseSuccess(true);
      })
      .catch(() => {
        alert('Purchase unsuccessful');
      });
  };

  if (!props || props.sizeOptions === 'OUT OF STOCK') {
    return null;
  }

  if (props.sizeOptions === 'Select a size') {
    return (
      <div className='add-to-cart-container'>
        <button
          data-testid="add-to-cart-btn"
          className='add-to-cart-btn'
          onClick={handleOptionsClick} >
            Add to Cart
        </button>
      </div>
    );
  }

  if (purchaseSuccess) {
    return (
      <div className='add-to-cart-container'>
        <h4>Item added to cart!</h4>
        <button
          className='add-to-cart-btn'
          onClick={handlePutClick} >
            Add to Cart
        </button>
      </div>
    );
  }

  return (
    <div className='add-to-cart-container'>
      <button
        className='add-to-cart-btn'
        onClick={handlePutClick} >
          Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;