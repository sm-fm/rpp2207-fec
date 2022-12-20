import React, { useState, useEffect } from 'react';
import SpecificQuantity from './SpecificQuantity.jsx';
import { v4 as uuidv4 } from 'uuid';

const QuantitySelector = (props) => {

  const [sizeIsSelected, setSizeIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [quantChosen, setQuantChosen] = useState();
  const [quantClicked, setQuantClicked] = useState(false);

  useEffect(() => {
    if (props.skuSelected && Object.keys(props.skuSelected).length > 0) {
      setSizeIsSelected(true);
      setQuantity(props.allSkus[props.skuSelected].quantity);
    }
  });

  const handleClick = (e) => {
    props.setCountPurchasing(e.target.value);
    setQuantClicked(true);
  };

  const createQuantityDropDown = () => {
    var arr = [];
    var q = quantity > 15 ? 15 : quantity;
    for (var i = 2; i < q + 1; i++) {
      arr.push(<SpecificQuantity
        num={i}
        setQuantity={props.setQuantity}
        setQuantChosen={setQuantChosen}
        setQuantClicked={setQuantClicked}
        key={uuidv4()} />);
    }
    return arr;
  };

  if (!sizeIsSelected || quantity === null || !props) {
    return (
      <div className="quantity-selector">
        <button name="quantity" className="quantity-btn">
          -- <>&or;</>
        </button>
      </div>
    );
  } else {
    if (!quantChosen || quantChosen > props.allSkus[props.skuSelected].quantity) { setQuantChosen(1); }
    return (
      <div className="quantity-selector">
        <button role="quantity" name="quantity" className="quantity-btn" onClick={handleClick}>
          {quantChosen} <>&or;</>
        </button>
        <ul>
          {quantClicked
            ? createQuantityDropDown()
            : null}
        </ul>
      </div>
    );
  }

};

export default QuantitySelector;