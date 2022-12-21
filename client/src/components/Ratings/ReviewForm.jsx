import React from 'react';
import {useEffect, useState} from 'react';
import Modal from './modal.jsx';
import hf from './helperFunctions.js';

let ReviewForm = (props) => {
  const [overallRating, setOverallRating] = useState('');
  const [recommend, setRecommend] = useState(false);

  let onExit = (e) => {
    props.toggleReviewForm(e);
  };

  let overallRatingMeanings = {
    '1': 'Poor',
    '2': 'Fair',
    '3': 'Average',
    '4': 'Good',
    '5': 'Great'
  };

  let overallRatingClickHandler = (e) => {
    let currRating = parseInt((e.target.className.baseVal.split('-')[2]).toString()) + 1;
    setOverallRating(currRating);
  };

  let handleRecommend = (e) => {
    setRecommend(e.target.value);
  };

  let componentInformation = (
    <div className='review-review-form'>
      <h3>Have feedback for this product? Leave a review!</h3>
      <table>
        <tbody>
          <tr>
            <td>How would you rate this product?</td>
            <td>{hf.reviewFormStars(overallRating, 'review-form', overallRatingClickHandler)}</td>
            <td>{overallRatingMeanings[overallRating.toString()] || ''}</td>
          </tr>
          <tr>
            <td>Would you recommend this item?</td>
            <td style={{colSpan: '2'}}>
              <input type='radio' id='recommend' name='recommendSt' value={true} onChange={handleRecommend}></input>
              <label htmlFor='recommend'>Yes</label>
              <input type='radio' value={false} name='recommendSt' id='dontRecommend' onChange={handleRecommend}></input>
              <label htmlFor='dontRecommend'>No</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='review-form-modal'>
      <Modal onClick={onExit} componentData = {componentInformation} additionalStyling={{border: '1px solid black'}}/>
    </div>
  );
};

export default ReviewForm;