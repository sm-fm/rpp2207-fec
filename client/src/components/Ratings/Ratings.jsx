import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import UserReviews from './ReviewCard.jsx';
import Metadata from './metadata/Metadata.jsx';
import hf from './helperFunctions.js';
import './rating.css';
import ReviewForm from './ReviewForm.jsx';

const Ratings = (props) => {
  // use 71697 for testing
  const holderReviewData = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": []
  };

  let product_id;
  product_id = props.objID || 71697;

  // Refering to the review list
  const [allData, setAllData] = useState([]);
  const [reviewData, setReviewData] = useState(holderReviewData);
  const [isLoadingreview, setIsLoadingreview] = useState(true);
  const [category, setCategory] = useState(null);
  const [reviewError, setReviewError] = useState('Loading reviews.');
  const [reviewListDisplayLength, setReviewListDisplayLength] = useState(2);
  const [numberReviewsDisplayed, setNumberReviewsDisplayed] = useState(0);

  // Refering to metadata
  const [metadata, setMetadata] = useState({});
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [metaError, setMetaError] = useState('Loading metadata.');


  const [reviewForm, setReviewForm] = useState(false);
  /**
   *
   * @param {*} id - product_id which can be found from the url
   * @param {*} sort - sort preferenced based on the front end input
   * @param {*} page - Speciries the page from which the results are returned
   * @param {*} count - Tells how many results per page
   */
  let getReviewList = (id, sort = 'relevant', page = 1, count = 100) => {
    return ratingsAPI.getReviewList(product_id, sort, page, count)
      .then(data => {
        console.log('Success!', data);
        setAllData(data);
        return data;
      })
      .catch(err => {
        setReviewError('Something went wrong, please try again later.');
      });
  };

  let filterReviewList = (ratingsList) => {
    if (ratingsList.length === 0) {
      setReviewData(allData);
      return;
    }
    let dataHolder = JSON.parse(JSON.stringify(allData));
    let relevantReviews = dataHolder.results.filter((val) => {
      return ratingsList.includes(val.rating.toString());
    });
    dataHolder.results = relevantReviews;
    setReviewData(dataHolder);
    return ratingsList;
  };

  useEffect(() => {
    filterReviewList(ratings);
  }, [allData]);

  useEffect(() => {
    refreshReviewList;
  }, [reviewData]);

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
        let errMsg = 'Uh-oh! There was an error when trying to retrieve the data. Please try again later.';
        setMetaError(errMsg);
        setReviewError(errMsg);
      });
  }, [props.objID]);

  let catChange = (e) => {
    setCategory(e.target.value);
    getReviewList(product_id, e.target.value);
  };

  let useRating = async (e) => {
    let holder;
    if (e.target.id === '') {
      return;
    }

    if (e.target.id === 'resetRatingsFilters') {
      setRatings([]);
      return filterReviewList([]);
    }
    if (ratings.includes(e.target.id)) {
      holder = JSON.parse(JSON.stringify(ratings));
      holder.splice(holder.indexOf(e.target.id), 1);
      setRatings(holder);
      return filterReviewList(holder);
    } else {
      setRatings([...ratings, e.target.id]);
      return filterReviewList([...ratings, e.target.id]);
    }
  };

  let incrementReviewsList = () => {
    setReviewListDisplayLength(hf.returnMin(reviewData.results.length, reviewListDisplayLength + 2));
  };

  let collapseReviewList = () => {
    setReviewListDisplayLength(hf.returnMin(reviewData.results.length, 2));
  };

  let refreshReviewList = () => {
    console.log(reviewData.results);
    console.log(reviewListDisplayLength);
    setReviewListDisplayLength(hf.returnMin(reviewData.results.length, reviewListDisplayLength));
  };

  let toggleReviewForm = (e) => {
    console.log('enable form review: ', e);
    setReviewForm(!reviewForm);
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
          <select data-testid='select' id='sortBy' onChange={catChange} className='reviews-pointer'>
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

          {(reviewData.results.length >= 2 && reviewListDisplayLength < reviewData.results.length) &&
          <p onClick={incrementReviewsList} className='reviews-pointer'>Show more</p>
          }

          {(reviewListDisplayLength > 2) &&
          <p onClick={collapseReviewList} className='reviews-pointer'>Collapse reviews</p>}

          <p onClick={toggleReviewForm} className='reviews-pointer'>Review Form</p>
          {reviewForm &&
            <>
              <ReviewForm toggleReviewForm = {toggleReviewForm}/>
            </>
          }

        </div>
        }
        {reviewError &&
        <p className='errorMsg'>{reviewError}</p>}

      </div>

    </div>

  );
};

export default Ratings;