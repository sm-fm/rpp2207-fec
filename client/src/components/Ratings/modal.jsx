import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

let Modal = (props) => {
  if (props.desc === 'reviewCard') {
    return (
      <div className='reviews-modal' onBlur={props.onClick}>
        <div className='image-wrapper'>
          <span id='reviews-modal-overlay' className='review-exit-modal' onClick={props.onClick}><FontAwesomeIcon icon={faXmark} /></span>
          <img src={props.src}
            alt='Sorry, the image could not be loaded at this time, please try again later.'/>
        </div>
      </div>
    );
  } else {
    return (
      <div className='reviews-modal'>
        <div className='form-wrapper'>
          <span
            id='reviews-modal-overlay'
            className='review-exit-modal'
            onClick={props.onClick}>
            <FontAwesomeIcon icon={faXmark} />
          </span>

        </div>
      </div>
    );
  }
};

export default Modal;