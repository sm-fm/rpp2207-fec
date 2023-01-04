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
    props.setSizeChanged(true);
    props.setOpen(false);
  };

  if (props.size) {
    return (
      <div className="sizes-container">
        <li
          value={props.size}
          role="size"
          className="size-item"
          onClick={handleClick}
        >
          {props.size}
        </li>
      </div>
    );
  }
};

export default SpecificSize;