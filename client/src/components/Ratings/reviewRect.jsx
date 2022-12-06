import React, { useState, useEffect } from 'react';

let Rectangle = (props) => {
  let [notHover, setHover] = useState(true);
  console.log(notHover);

  if (notHover) {
    return (
      <svg width='100px' height='10px'>
        <linearGradient id={`Gradient${props.idx}-1`}>
          <stop key={`${props.idx}-stop-1`} className='stop1' offset="0%" stopColor="rgb(60, 201, 107)" />
          <stop key={`${props.idx}-stop-2`} className='stop2' offset={`${props.val.ratio * 100}%`} stopColor="rgb(60, 201, 107)" stopOpacity="1" />
          <stop key={`${props.idx}-stop-3`} className='stop3' offset={`${props.val.ratio}%`} stopColor="rgb(213, 216, 222)" />
          <stop key={`${props.idx}-stop-4`} className='stop4' offset="100%" stopColor="rgb(213, 216, 222)" stopOpacity="1" />
        </linearGradient>
        <rect onMouseEnter= {() => { setHover(!notHover); }} width='100px' height='10px' fill={`url(#Gradient${props.idx}-1)`}/>
      </svg>
    );
  } else {
    return (
      <svg width='100px' height='10px'>
        <linearGradient id={`Gradient${props.idx}-2`}>
          <stop key={`${props.idx}-stop-1`} className='stop1' offset="0%" stopColor="green" />
          <stop key={`${props.idx}-stop-2`} className='stop2' offset={`${props.val.ratio * 100}%`} stopColor="rgb(60, 201, 107)" stopOpacity="1" />
          <stop key={`${props.idx}-stop-3`} className='stop3' offset={`${props.val.ratio}%`} stopColor="rgb(213, 216, 222)" />
          <stop key={`${props.idx}-stop-4`} className='stop4' offset="100%" stopColor="rgb(213, 216, 222)" stopOpacity="1" />
        </linearGradient>
        <rect onMouseLeave = {() => { setHover(!notHover); }} width='100px' height='10px' fill={`url(#Gradient${props.idx}-2)`}/>
      </svg>
    );
  }
};

export default Rectangle;