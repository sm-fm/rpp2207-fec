import React, { useState, useEffect } from 'react';
import SpecificQuantity from './SpecificQuantity.jsx';
import { v4 as uuidv4 } from 'uuid';

const QuantitySelector = (props) => {

  const [sizeIsSelected, setSizeIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [quantityArray, setQuantityArray] = useState([]);

  useEffect(() => {
    if (Object.keys(props.skuSelected).length > 0) {
      setSizeIsSelected(true);
      setQuantity(props.allSkus[props.skuSelected].quantity);
    }
  });

  const createQuantityDropDown = () => {
    var arr = [];
    var q = quantity > 15 ? 15: quantity;
    for (var i = 2; i < q + 1; i++) {
      arr.push(<SpecificQuantity
        num={i}
        setQuantity={props.setQuantity}
        key={uuidv4()} />);
    }
    return arr;
  }

  if (!sizeIsSelected || quantity === null) {
    return (
      <div className="quantity-selector">
        <select name="quantity" className="quantity">
          <option role="quantity" value="--" disabled>--</option>
        </select>
      </div>
    );
  } else {
    return (
      <div className="quantity-selector">
        <select name="quantity" className="quantity">
          <option value={1}>1</option>
          {createQuantityDropDown()}
        </select>
     </div>
    );
  }

 };

 export default QuantitySelector;