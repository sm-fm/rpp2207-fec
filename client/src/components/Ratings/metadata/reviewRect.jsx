import React, { useState } from 'react';

let Rectangle = (props) => {
  let [notHover, setHover] = useState(true);

  if (notHover) {
    return (
      <svg width='100px' height='10px'>
        <linearGradient id={`Gradient${props.idx}-1`}>
          <stop key={`${props.idx}-stop-1`} className='stop1' offset="0%" stopColor="rgb(10, 191, 58)" />
          <stop key={`${props.idx}-stop-2`} className='stop2' offset={`${props.val.ratio * 100}%`} stopColor="rgb(10, 191, 58)" stopOpacity="1" />
          <stop key={`${props.idx}-stop-3`} className='stop3' offset={`${props.val.ratio * 100}%`} stopColor="rgb(213, 216, 222)" />
          <stop key={`${props.idx}-stop-4`} className='stop4' offset="100%" stopColor="rgb(213, 216, 222)" stopOpacity="1" />
        </linearGradient>
        <rect onMouseEnter= {() => { setHover(!notHover); }} width='100px' height='10px' id = {props.idx} fill={`url(#Gradient${props.idx}-1)`} rx='2' ry = '2'/>
      </svg>
    );
  } else {
    return (
      <svg width='100px' height='10px'>
        <linearGradient id={`Gradient${props.idx}-2`}>
          <stop key={`${props.idx}-stop-1`} className='stop1' offset="0%" stopColor="green" />
          <stop key={`${props.idx}-stop-2`} className='stop2' offset={`${props.val.ratio * 100}%`} stopColor="green" stopOpacity="1" />
          <stop key={`${props.idx}-stop-3`} className='stop3' offset={`${props.val.ratio * 100}% `} stopColor="gray" />
          <stop key={`${props.idx}-stop-4`} className='stop4' offset="100%" stopColor="gray" stopOpacity="1" />
        </linearGradient>
        <rect onMouseLeave = {() => { setHover(!notHover); }} width='100px' height='10px' id = {props.idx} fill={`url(#Gradient${props.idx}-2)`} rx='2' ry = '2'/>
      </svg>
    );
  }
};

export default Rectangle;