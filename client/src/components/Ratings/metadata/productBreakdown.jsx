import React from 'react';
import ReviewRectangle from './productRect.jsx';

let ProductBreakdown = (props) => {
  return (
    <div className='product-breakdown'>
      <h3>Product Breakdown</h3>
      {Object.keys(props.data).map((val, idx) => {
        let ratio = (parseFloat(props.data[val].value) / 5);
        return (
          <div key={idx}>
            <p>{val}</p>
            <ReviewRectangle key={idx} idx={`product-${idx}`} ratio={ratio}/>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ProductBreakdown;