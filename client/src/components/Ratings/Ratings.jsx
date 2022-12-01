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
    return fetch('/reviews/?' + new URLSearchParams({
      product_id: product_id,
    }))
      .then(result => {
        const reader = result.body.getReader();
        return reader.read()
      })
      .then(({done, value}) => {
        // setReviewData(JSON.parse(String.fromCharCode.apply(null, value)));
        return JSON.parse(String.fromCharCode.apply(null, value))
      })
      .catch(err => {
        console.log('Uh-oh! There was an error in Ratings.jsx: ', err);
      })
  }

  let getMetaData = (id) => {

  }


  useEffect(()=> {
    fetch('/reviews/meta')
  }, []);

  let catChange = (e) => {
    getReviewList(product_id, e.target.value);
  }

  return (
    <div className='ratings'>
      <div className='metaDataDisplay'>

      </div>
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
          )
        })}
      </div>

    </div>

  )
}

export default Ratings;