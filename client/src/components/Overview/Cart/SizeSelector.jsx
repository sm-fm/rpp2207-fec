import React, { useState, useEffect } from 'react';
import SpecificSize from './SpecificSize.jsx';
import { v4 as uuidv4 } from 'uuid';

const SizeSelector = (props) => {
  const [defaultVal, setDefaultVal] = useState('Select a size');

  useEffect(() => {
    if (Object.keys(props.skus)[0] === 'null') {
      setDefaultVal('OUT OF STOCK');
      props.setSizeOptions('OUT OF STOCK');
    }
  });

  const handleChange = (e) => {
    props.setSizeSelected(e.target.value);
    setDefaultVal(e.target.value);
    props.setSizeOptions(e.target.value);
    Object.keys(props.skus).forEach(sku => {
      if (props.skus[sku].size === e.target.value) {
        props.setSkuSelected(sku);
      }
    });
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
          key={uuidv4()}
          setDefaultVal={setDefaultVal}
          data-testid="size" />);
        preventDuplicates.push(specificSku.size);
      }
    }
    return componentArr;
  };

  if (defaultVal === 'OUT OF STOCK') {
    return (
      <div className="size-selector">
        <select name="sizes" className="sizes">
          <option role="sizes" value={defaultVal} disabled>{defaultVal}</option>
        </select>
      </div>
    );
  }
  if (props.needSize) {
    return (
      <div className="size-selector">
        <p className="size-needed">Please select a size</p>
        <select
          data-testid="select"
          name="sizes"
          className="sizes"
          ref={props.sizeDropDown}
          onChange={handleChange}
          options={createSizeDropDown()} >
          <option value={defaultVal}>{defaultVal}</option>
          {createSizeDropDown()}
        </select>
      </div>
    );
  }
  return (
    <div className="size-selector">
      <select
        data-testid="select"
        name="sizes"
        className="sizes"
        ref={props.sizeDropDown}
        onChange={handleChange}
        options={createSizeDropDown()} >
        <option value={defaultVal}>{defaultVal}</option>
        {createSizeDropDown()}
      </select>
    </div>
  );
};

export default SizeSelector;
