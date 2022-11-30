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
    console.log(count)
    // ratingsAPI.getReviewList(id, sort, page, count)
    //   .then(data => {
    //     setReviewData(data);
    //     setIsLoadingreview(false);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  useEffect(()=> {
    // ratingsAPI.getAll(product_id)
    //   .then(data => {
    //     setReviewData(data[0]);
    //     setMetadata(data[1]);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    fetch('/reviews/?' + new URLSearchParams({
      product_id: product_id,
    }))
      .then(result => {
        console.log('Congrats!', result.body);
        return result;
      })
      .catch(err => {
        console.log('Uh-oh!', err);
      })
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