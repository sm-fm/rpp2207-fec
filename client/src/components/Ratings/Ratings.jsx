import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import UserReviews from './ReviewCard.jsx';
import Metadata from './Metadata.jsx';

const Ratings = (props) => {
  // use 71697 for testing
  const holderReviewData = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": []
  };

  const product_id = props.objID;

  // Refering to the review list
  const [reviewData, setReviewData] = useState(holderReviewData);
  const [isLoadingreview, setIsLoadingreview] = useState(true);
  const [category, setCategory] = useState(null);

  // Refering to metadata
  const [metadata, setMetadata] = useState({});
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);

  /**
   *
   * @param {*} id - product_id which can be found from the url
   * @param {*} sort - sort preferenced based on the front end input
   * @param {*} page - Speciries the page from which the results are returned
   * @param {*} count - Tells how many results per page
   */
  let getReviewList = (id, sort='relevant', page = 1, count = 5) => {
    return ratingsAPI.getReviewList(product_id, sort, page, count)
      .then(data => {
        console.log('Success!', data);
        setReviewData(data);
        return data;
      })
      .catch(err => {
        console.log('Uh-oh! There was an error: ', err);
      });
  };

  useEffect(()=> {
    ratingsAPI.getAll(product_id)
      .then(data=> {
        setMetadata(data[1]);
        setReviewData(data[0]);

        setIsLoadingMeta(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let catChange = (e) => {
    getReviewList(product_id, e.target.value);
  };

  return (
    <div className='ratings'>
      <div className='metaDataDisplay'>
        {!isLoadingMeta &&
        <Metadata generateStars={props.generateStars} meta={metadata}/>}
      </div>
      <div className='user-review-wrapper'>
        <div className='reviewListHeading'>
          <label>{reviewData.results.length} reviews, sorted by </label>
          <select id='sortBy' onChange={catChange}>
            <option value='relevance'>relevance</option>
            <option value='newest'>newest</option>
            <option value='helpful'>most helpful</option>
          </select>
        </div>
        <div className='userReviews'>
          {reviewData.results.map((elem, idx) => {
            return (
              <UserReviews generateStars = {props.generateStars} key={`reviews-${idx}`} data={elem}/>
            );
          })}
        </div>
      </div>

    </div>

  );
};

export default Ratings;