import React, { useState, useEffect } from 'react';
import SpecificSize from './SpecificSize.jsx';
import { v4 as uuidv4 } from 'uuid';

const SizeSelector = (props) => {
  const [defaultVal, setDefaultVal] = useState('Select a size');
  const [open, setOpen] = useState();

  useEffect(() => {
    if (Object.keys(props.skus)[0] === 'null') {
      setDefaultVal('OUT OF STOCK');
      props.setSizeOptions('OUT OF STOCK');
    }
  });

  const handleChange = () => {
    setOpen(!open);
  };

  const createSizeDropDown = () => {
    var componentArr = [];
    var preventDuplicates = [];
    var skuNumbers = Object.keys(props.skus);
    for (var i = 0; i < skuNumbers.length; i++) {
      var specificSku = props.skus[skuNumbers[i]];
      if (!preventDuplicates.includes(specificSku.size)) {
        componentArr.push(<SpecificSize
          size={specificSku.size}
          sku={specificSku}
          skus={props.skus}
          key={uuidv4()}
          setDefaultVal={setDefaultVal}
          data-testid="size"
          setOpen={setOpen}
          setSizeSelected={props.setSizeSelected}
          setSizeOptions={props.setSizeOptions}
          setNeedSize={props.setNeedSize}
          setSkuSelected={props.setSkuSelected}
          open={open}
          setSizeChanged={props.setSizeChanged} />);
        preventDuplicates.push(specificSku.size);
      }
    }
    return componentArr;
  };

  if (defaultVal === 'OUT OF STOCK') {
    return (
      <div className="size-selector">
        <button name="sizes" className="sizes-btn" disabled>-</button>
      </div>
    );
  }
  if (props.needSize) {
    alert('Please select a size');
    !open ? setOpen(true) : null;
  }
  if (open) {
    var currentVal = defaultVal || 'Select a size';
    return (
      <div className="size-selector">
        <button
          onClick={handleChange}
          role="sizes-btn"
          className="sizes-btn">
          {currentVal} <>&or;</>
        </button>
        <ul className="list">
          {createSizeDropDown()}
        </ul>
      </div>
    );
  }
  if (!open) {
    return (
      <div className="size-selector">
        <button
          value={defaultVal}
          onClick={handleChange}
          role="sizes-btn"
          className="sizes-btn">
          {defaultVal} <>&or;</>
        </button>
      </div>
    );
  }
};

export default SizeSelector;
// data-testid="select"
//         name="sizes"
//         className="sizes"
//         ref={props.sizeDropDown}
//         onChange={handleChange}
//         options={createSizeDropDown()} >
//         <option value={defaultVal}>{defaultVal}</option>
//         {createSizeDropDown()}
// props.setSizeSelected(e.target.value);
// setDefaultVal(e.target.value);
// props.setSizeOptions(e.target.value);
// Object.keys(props.skus).forEach(sku => {
//   if (props.skus[sku].size === e.target.value) {
//     props.setSkuSelected(sku);
//   }
// });