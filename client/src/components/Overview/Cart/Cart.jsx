import React, { useState, useEffect } from 'react';
import SizeSelector from './SizeSelector.jsx';

const Cart = (props) => {

  return (
    <div className="cart-container">
      <SizeSelector
        skus={props.skus} />
    </div>
  );
};

export default Cart;