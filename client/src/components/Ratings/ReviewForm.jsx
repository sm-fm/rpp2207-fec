import React from 'react';
import {useEffect, useState} from 'react';
import Modal from './modal.jsx';

let ReviewForm = (props) => {
  const [displayState, setDisplayState] = useState(true);

  let onExit = (e) => {
    setDisplayState(false);
  };
  return (
    <div className='review-form-modal'>
      {displayState &&
      <Modal onClick={onExit}/>
      }
    </div>
  );
};

export default ReviewForm;