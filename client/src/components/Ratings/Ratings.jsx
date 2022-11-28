import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import UserReviews from './ReviewCard.jsx';

const Ratings = (props) => {
  // console.log(props.data);
  const holderReviewData = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": []
  }
  const [reviewData, setReviewData] = useState(holderReviewData);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  // ratingsAPI.getReviewMetadata(71697);




  useEffect(()=> {
    ratingsAPI.getReviewList(71697)
      .then(data => {
        setReviewData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  let catChange = (e) => {
    console.log(e)
  }

  return (
    <div className='ratings'>
      <div className='reviewListHeading'>
        <label>{reviewData.results.length} reviews, sorted by </label>
        <select id='sortBy' onChange={catChange}>
          <option value='relevance'>relevance</option>
          <option value='newest'>newest</option>
          <option value='helpful'>most helpful</option>
        </select>
      </div>
      {reviewData.results.map((elem, idx) => {
        return (
          <UserReviews generateStars = {props.generateStars} key={`reviews-${idx}`} data={elem}/>
        )
      })}
    </div>

  )
}

export default Ratings;