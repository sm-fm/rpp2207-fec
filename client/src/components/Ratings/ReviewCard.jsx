import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import './rating.css';

let ReviewCard = (props) => {
  console.log(props.data.date)
  var date = new Date(props.data.date);
  console.log(date);
  date = format(date, 'MMM d, y');
  return(
    <div className = 'userReview'>
      <div className='flex-box'>
        <div className='starHolder'>
          {props.generateStars(props.data.rating, 'userReview')}
        </div>
        <h6 id='username'>{`${props.data.reviewer_name}, ${date}`}</h6>
      </div>
      <h3 className='summary'>{props.data.summary}</h3>
      <p className='reviewBody'>{props.data.body}</p>
      {props.data.recommend &&
        <p>✓ I recommend this product</p>}
      {props.data.response !== '' &&
        <p className='companyResponse'>{props.data.response}</p>}
      <h6>Helpful? <u>Yes</u> {`(${props.data.helpfulness})`} | <u>Report</u></h6>

      <div className='thumbnail-holder'>
        {props.data.photos.map((element, idx) => {
          return (
            <img key={`${props.data.reviewer_name} image - ${idx + 1}`} className='thumbnail' src={element.url} alt={`${props.data.reviewer_name} image - ${idx + 1}`}/>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewCard;