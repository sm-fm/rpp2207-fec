import React, { useState, useEffect } from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

const Cart = (props) => {
  const [sizeSelected, setSizeSelected] = useState('');
  const [skuSelected, setSkuSelected] = useState('');
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="cart-container">
      <SizeSelector
        skus={props.skus}
        setSizeSelected={setSizeSelected}
        setSkuSelected={setSkuSelected} />
      <QuantitySelector
        skuSelected={skuSelected}
        sizeSelected={sizeSelected}
        setQuantity={setQuantity}
        allSkus={props.skus} />
    </div>
  );
};

export default Cart;