import React from 'react';

const SpecificSize = (props) => {

  const handleClick = () => {
    props.setDefaultVal(props.size);
    props.setSizeSelected(props.size);
    props.setNeedSize(false);
    props.setSizeOptions(props.size);
    Object.keys(props.skus).forEach(sku => {
      if (props.skus[sku].size === props.size) {
        props.setSkuSelected(sku);
      }
    });
    console.log('changing size');
    props.setSizeChanged(true);
    props.setOpen(false);
  };

  if (props.size) {
    return (
      <li
        value={props.size}
        type="number"
        className="size-item"
        onClick={handleClick}
      >
        {props.size}
      </li>
    );
  }
};

export default SpecificSize;