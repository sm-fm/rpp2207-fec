import React, { useState, useEffect } from 'react';

const AddToCart = (props) => {

  const handleOptionsClick = () => {

  };

  const handlePutClick = () => {

  };

  if (props.sizeOptions === 'OUT OF STOCK') {
    return null;
  }

  if (props.sizeOptions === 'Select a size') {
    return (
      <div className='add-to-cart-container'>
        <button
          className='add-to-cart-btn'
          onClick={handleOptionsClick} >
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