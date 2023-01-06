import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import UserReviews from './ReviewCard.jsx';
import Metadata from './metadata/Metadata.jsx';
import hf from './helperFunctions.js';
import './rating.css';
import ReviewForm from './ReviewForm.jsx';

const Ratings = (props) => {
  const holderReviewData = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": []
  };

  let product_id;
  product_id = props.objID || 71697;

  // Refering to the review list
  const [allData, setAllData] = useState(props.data.allData);
  const [reviewData, setReviewData] = useState(props.data.allData);
  const [isLoadingreview, setIsLoadingreview] = useState(true);
  const [category, setCategory] = useState(null);
  const [reviewError, setReviewError] = useState('Loading reviews.');
  const [reviewListDisplayLength, setReviewListDisplayLength] = useState(2);
  const [numberReviewsDisplayed, setNumberReviewsDisplayed] = useState(0);

  // Refering to metadata
  const [metadata, setMetadata] = useState(props.data.metaData);
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [metaError, setMetaError] = useState('Loading metadata.');

  const [reviewForm, setReviewForm] = useState(false);
  const [reviewFormInformation, setReviewFormInformation] = useState(false);

  // Refering to the load state
  const [madeInitialCall, setMadeInitialCall] = useState(false);
  /**
   *
   * @param {*} id - product_id which can be found from the url
   * @param {*} sort - sort preferenced based on the front end input
   * @param {*} page - Speciries the page from which the results are returned
   * @param {*} count - Tells how many results per page
   */
  let getReviewList = (sort = category || 'relevant', page = 1, count = 300) => {
    return ratingsAPI.getReviewList(product_id, sort, page, count)
      .then(data => {
        setAllData(data);
        return data;
      })
      .catch(err => {
        setReviewError('Something went wrong, please try again later.');
      });
  };
  // Running this so that the first time the component loads it will grab all the necessary information
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
    if (!Object.keys(metadata.ratings).length) {
      setMetaError('Uh-oh! Something went wrong, please try again later.');
      setReviewError('Uh-oh! Something went wrong, please try again later.');

    } else {
      setIsLoadingMeta(false);
      setIsLoadingreview(false);

      setMetaError('');
      setReviewError('');
    }
  }, [allData]);

  let catChange = (e) => {
    setCategory(e.target.value);
    getReviewList(e.target.value);
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
    if (!madeInitialCall) {
      getReviewList();
      setMadeInitialCall(true);
    }
  };

  let collapseReviewList = () => {
    setReviewListDisplayLength(hf.returnMin(reviewData.results.length, 2));
  };

  let refreshReviewList = () => {
    setReviewListDisplayLength(hf.returnMin(reviewData.results.length, reviewListDisplayLength));
  };

  let toggleReviewForm = async (e, optionalParamForPostReviewSubmission) => {
    setReviewForm(!reviewForm);

    if (optionalParamForPostReviewSubmission) {
      setReviewFormInformation('Your review was successfully submitted.');
      const timer = (time) => {
        return new Promise((resolve) => {
          setTimeout(resolve, time);
        });
      };
      await timer(4000);
      setReviewFormInformation(false);
    }
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
          <label className='heading'>{reviewListDisplayLength} reviews, sorted by </label>
          <select data-testid='select' id='sortBy' onChange={catChange} className='reviews-pointer heading'>
            <option data-testid='select-option' value='relevance'>relevance</option>
            <option data-testid='select-option' value='newest'>newest</option>
            <option data-testid='select-option' value='helpful'>most helpful</option>
          </select>
        </div>

        {reviewFormInformation ?
          <p style={{'animation-play-state': 'running'}} className='successful-form'>{reviewFormInformation}</p>
          :
          null
        }
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
          <button onClick={incrementReviewsList} className='reviews-pointer show-more'>Show More</button>
          }

          {(reviewListDisplayLength > 2) &&
          <button onClick={collapseReviewList} className='reviews-pointer collapse-review'>Collapse Reviews</button>}

          <button onClick={toggleReviewForm} className='reviews-pointer review-form'>Add a Review &nbsp;&nbsp; +</button>
          {reviewForm &&
            <>
              <ReviewForm toggleReviewForm = {toggleReviewForm} generateStars={props.generateStars} availableOptions={metadata.characteristics} product_id = {product_id} getReviewList={getReviewList}/>
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