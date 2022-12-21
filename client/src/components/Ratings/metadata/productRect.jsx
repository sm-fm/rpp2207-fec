import React from 'react';

let ProductRect = (props) => {
  return (
    // TODO: Need to add descriptions of what a 1 and a 5 star reviews means for the category
    <div className='product-rect'>
      <svg width='100px' height='10px'>
        <rect width='100px' height='10px' rx='2' ry = '2' fill='rgb(213, 216, 222)' stroke='rgb(213, 216, 222)'/>
        <line x1={props.ratio * 100 + 'px'} y1 = '0px' x2={props.ratio * 100 + 'px'} y2='10px' stroke='black'/>
      </svg>
    </div>
  );
};

export default ProductRect;