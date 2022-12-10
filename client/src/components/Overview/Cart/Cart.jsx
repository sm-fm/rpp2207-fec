import React, { useState, useEffect } from 'react';
<<<<<<< HEAD

const Cart = (props) => {

=======
import SizeSelector from './SizeSelector.jsx';

const Cart = (props) => {

  return (
    <div className="cart-container">
      <SizeSelector
        skus={props.skus} />
    </div>
  );
>>>>>>> size-selector
};

export default Cart;