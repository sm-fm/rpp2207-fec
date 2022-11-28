import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import UserReviews from './ReviewCard.jsx';

const Ratings = (props) => {
  // use 71697 for testing
  const holderReviewData = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": []
  }
  const product_id = props.objID;

  const [reviewData, setReviewData] = useState(holderReviewData);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);

  // Take it in the order: id, sort, page, count
  let getReviewList = (id, sort='relevant', page = 1, count = 5) => {
    console.log(sort)
    ratingsAPI.getReviewList(id, sort, page, count)
      .then(data => {
        setReviewData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(()=> {
    getReviewList(product_id);
  }, []);

  let catChange = (e) => {
    getReviewList(product_id, e.target.value);
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