import React, { useState, useEffect, useRef } from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import AddToCart from './AddToCart.jsx';
import Star from './Star.jsx';

const Cart = (props) => {
  const [sizeSelected, setSizeSelected] = useState('');
  const [skuSelected, setSkuSelected] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [sizeOptions, setSizeOptions] = useState('Select a size');
  const [countPurchasing, setCountPurchasing] = useState(0);
  const sizeDropDown = useRef();
  const [needSize, setNeedSize] = useState(false);
  const [sizeChanged, setSizeChanged] = useState(false);

  const handleFocusSizeDropDrow = () => {
    sizeDropDown.current.focus();
  };

  return (
    <div className="cart-container">
      <div className="size-selector-quantity-container">
        <SizeSelector
          skus={props.skus}
          setSizeSelected={setSizeSelected}
          setSkuSelected={setSkuSelected}
          setSizeOptions={setSizeOptions}
          sizeDropDown={sizeDropDown}
          needSize={needSize}
          setNeedSize={setNeedSize}
          setSizeChanged={setSizeChanged} />
        <QuantitySelector
          skuSelected={skuSelected}
          sizeSelected={sizeSelected}
          setQuantity={setQuantity}
          setCountPurchasing={setCountPurchasing}
          allSkus={props.skus}
          sizeChanged={sizeChanged}
          setSizeChanged={setSizeChanged} />
      </div>
      <div className="add-to-cart-star-container">
        <AddToCart
          sizeOptions={sizeOptions}
          skuSelected={skuSelected}
          allSkus={props.skus}
          countPurchasing={countPurchasing}
          handleFocusSizeDropDrow={handleFocusSizeDropDrow}
          setNeedSize={setNeedSize} />
        <Star
          addToOutfit={props.addToOutfit}
          product={props.product}
          styles={props.styles} />
      </div>
    </div>
  );
};

export default Cart;