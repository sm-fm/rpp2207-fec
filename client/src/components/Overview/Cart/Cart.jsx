import React, { useState, useEffect } from 'react';
import SizeSelector from './SizeSelector.jsx';

const Cart = (props) => {

  console.log(props.skus);

  return (
    <div>
      <SizeSelector
        skus={props.skus} />
    </div>
  );
};

export default Cart;