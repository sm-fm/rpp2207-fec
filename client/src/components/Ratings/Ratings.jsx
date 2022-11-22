import React, { useState, useEffect } from 'react';
import UserReviews from './ReviewCard.jsx';

const Ratings = (props) => {
  console.log(props.data);
  return (
    <div className='ratings'>

      {props.data.results.map((elem, idx) => {
        return (
        <UserReviews generateStars = {props.generateStars} key={`reviews-${idx}`} data={elem}/>
        )
      })}
    </div>

  )
}

export default Ratings;