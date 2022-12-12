import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import UserReviews from './ReviewCard.jsx';
import Metadata from './metadata/Metadata.jsx';
import './rating.css';

const Ratings = (props) => {
  // use 71697 for testing
  const holderReviewData = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": []
  };

  let product_id;
  product_id = props.objID;

  // Refering to the review list
  const [allData, setAllData] = useState([]);
  const [reviewData, setReviewData] = useState(holderReviewData);
  const [isLoadingreview, setIsLoadingreview] = useState(true);
  const [category, setCategory] = useState(null);
  const [reviewError, setReviewError] = useState('Loading reviews.');
  const [reviewListDisplayLength, setReviewListDisplayLength] = useState(2);

  // Refering to metadata
  const [metadata, setMetadata] = useState({});
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [metaError, setMetaError] = useState('Loading metadata.');

  /**
   *
   * @param {*} id - product_id which can be found from the url
   * @param {*} sort - sort preferenced based on the front end input
   * @param {*} page - Speciries the page from which the results are returned
   * @param {*} count - Tells how many results per page
   */
  let getReviewList = (id, sort = 'relevant', rating = [], page = 1, count = 5) => {
    return ratingsAPI.getReviewList(product_id, rating, sort, page, count)
      .then(data => {
        console.log('Success!', data);
        setReviewData(data);
        return data;
      })
      .catch(err => {
        console.log('Uh-oh! There was an error: ', err);
      });
  };

  let filterReviewList = (ratingsList) => {
    if (ratingsList.length === 0) {
      setReviewData(allData);
      return;
    }
    let dataHolder = JSON.parse(JSON.stringify(allData));
    let relevantReviews = dataHolder.results.filter((val) => {
      // console.log('ratings: ', ratingsList);
      // console.log('current review: ', val);
      // console.log('review rating: ', val.rating);
      // console.log('conditioanl: ', ratingsList.includes(val.rating.toString()));
      return ratingsList.includes(val.rating.toString());
    });
    dataHolder.results = relevantReviews;
    setReviewData(dataHolder);
    return ratingsList;
  };

  useEffect(()=> {
    ratingsAPI.getAll(product_id)
      .then(data=> {
        if (data[0].results.length === 0) {
          throw new Error('No data found');
        }
        setMetadata(data[1]);
        setReviewData(data[0]);
        setAllData(data[0]);

        setIsLoadingMeta(false);
        setIsLoadingreview(false);

        setMetaError('');
        setReviewError('');
      })
      .catch(err => {
        console.log('There was an error:', err);
        let errMsg = 'Uh-oh! There was an error when trying to retrieve the data. Please try again later.';
        setMetaError(errMsg);
        setReviewError(errMsg);
      });
  }, [props.objID]);

  let catChange = (e) => {
    setCategory(e.target.value);
    getReviewList(product_id, e.target.value, ratings);
  };

  let useRating = async (e) => {
    let holder;
    if (e.target.id === '') {
      return;
    }

    if (e.target.id === 'resetRatingsFilters') {
      setRatings([]);
      // return await getReviewList(product_id, category);
      return filterReviewList([]);
    }
    // This will be taken out when I toggle the ratings
    if (ratings.includes(e.target.id)) {
      holder = JSON.parse(JSON.stringify(ratings));
      holder.splice(holder.indexOf(e.target.id), 1);
      setRatings(holder);
      return filterReviewList(holder);
      // return await getReviewList(product_id, category, holder);
    } else {
      setRatings([...ratings, e.target.id]);
      return filterReviewList([...ratings, e.target.id]);
      // return await getReviewList(product_id, category, [...ratings, e.target.id]);
    }
  };

  let incrementReviewsList = () => {
    setReviewListDisplayLength(reviewListDisplayLength + 2);
  };

  let collapseReviewList = () => {
    setReviewListDisplayLength(2);
  };

  return (
    <div className='ratings'>
      <div className='metaDataDisplay'>
        {!isLoadingMeta &&
        <Metadata generateStars={props.generateStars} meta={metadata} useRatings = {useRating}/>}
        {metaError &&
        <div>
          {props.generateStars(0)}
          <p className='errorMsg'>{metaError}</p>
        </div>
        }
      </div>
      <div className='user-review-wrapper'>
        <div className='reviewListHeading'>
          <label>{reviewListDisplayLength} reviews, sorted by </label>
          <select data-testid='select' id='sortBy' onChange={catChange}>
            <option data-testid='select-option' value='relevance'>relevance</option>
            <option data-testid='select-option' value='newest'>newest</option>
            <option data-testid='select-option' value='helpful'>most helpful</option>
          </select>
        </div>
        {!isLoadingreview &&
        <div className='userReviews'>
          {reviewData.results.map((elem, idx) => {
            if (idx < reviewListDisplayLength) {
              return (
                <UserReviews generateStars = {props.generateStars} key={`reviews-${idx}`} data={elem}/>
              );
            } else {
              return null;
            }
          })}
          <p onClick={incrementReviewsList}>Show more</p>
          {reviewListDisplayLength > 2 &&
          <p onClick={collapseReviewList}>Collapse reviews</p>}
        </div>
        }
        {reviewError &&
        <p className='errorMsg'>{reviewError}</p>}

      </div>

    </div>

  );
};

export default Ratings;