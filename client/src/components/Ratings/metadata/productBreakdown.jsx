import React from 'react';
import ReviewRectangle from './productRect.jsx';
import characteristicMeanings from '../characteristicMeaning.js';

let ProductBreakdown = (props) => {
  return (
    <div className='product-breakdown'>
      {Object.keys(props.data).map((val, idx) => {
        let ratio = (parseFloat(props.data[val].value) / 5);
        return (
          <div key={idx} className='individual-characteristic'>
            <p className='product-breakdown-title'>{val}</p>
            <ReviewRectangle key={idx} idx={`product-${idx}`} ratio={ratio} width={300} height={8}/>
            <br />

            <div className='flex-box'>
              <p>{characteristicMeanings[val][1]}</p>
              <p id={'characteristic-upperbound'}>{characteristicMeanings[val][5]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductBreakdown;