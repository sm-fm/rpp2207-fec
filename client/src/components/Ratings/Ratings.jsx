import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import UserReviews from './ReviewCard.jsx';

const Ratings = (props) => {
  console.log(props.data);
  return (
    <div className='ratings'>
      <div className='reviewListHeading'>
        <label>{props.data.results.length} reviews, sorted by </label>
        <select id='sortBy'>
          <option value='relevance'>relevance</option>
          <option value='newest'>newest</option>
          <option value='helpful'>most helpful</option>
        </select>
      </div>
      {props.data.results.map((elem, idx) => {
        return (
          <UserReviews generateStars = {props.generateStars} key={`reviews-${idx}`} data={elem}/>
        )
      })}
    </div>

  )
}

export default Ratings;