import React from 'react';

let ProductRect = (props) => {
  return (
    <div className='product-rect'>
      <svg width={props.width} height={props.height}>
        <rect width={props.width + 'px'} height={props.height + 'px'} rx='2' ry = '2' fill='rgb(213, 216, 222)' stroke='rgb(213, 216, 222)'/>
        <line x1={props.ratio * props.width + 'px'} y1 = '0px' x2={props.ratio * props.width + 'px'} y2={props.height + 'px'} stroke='black'/>
      </svg>
    </div>
  );
};

export default ProductRect;