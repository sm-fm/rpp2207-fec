import React from 'react';
import {useEffect, useState} from 'react';
import Modal from './modal.jsx';

let ReviewForm = (props) => {
  let onExit = (e) => {
    props.toggleReviewForm(e);
  };

  let componentInformation = (
    <div className='review-review-form'>
      <p>hi</p>
    </div>
  );

  return (
    <div className='review-form-modal'>
      <Modal onClick={onExit} componentData = {componentInformation} additionalStyling={{border: '1px solid black'}}/>
    </div>
  );
};

export default ReviewForm;