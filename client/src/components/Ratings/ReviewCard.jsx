import React, { useState, useEffect } from 'react';
import './rating.css';

let ReviewCard = (props) => {
  console.log(props)
  return(
    <div className = 'userReview'>
      {props.generateStars(props.data.rating, 'userReview')}
    </div>
  )
}

export default ReviewCard;