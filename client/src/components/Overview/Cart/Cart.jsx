import React, { useState, useEffect } from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import AddToCart from './AddToCart.jsx';

const Cart = (props) => {
  const [sizeSelected, setSizeSelected] = useState('');
  const [skuSelected, setSkuSelected] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [sizeOptions, setSizeOptions] = useState('Select a size');
  const [countPurchasing, setCountPurchasing] = useState(0);

  return (
    <div className="cart-container">
      <SizeSelector
        skus={props.skus}
        setSizeSelected={setSizeSelected}
        setSkuSelected={setSkuSelected}
        setSizeOptions={setSizeOptions} />
      <QuantitySelector
        skuSelected={skuSelected}
        sizeSelected={sizeSelected}
        setQuantity={setQuantity}
        setCountPurchasing={setCountPurchasing}
        allSkus={props.skus} />
      <AddToCart
        sizeOptions={sizeOptions}
        skuSelected={skuSelected}
        allSkus={props.skus}
        countPurchasing={countPurchasing} />
    </div>
  );
};

export default Cart;