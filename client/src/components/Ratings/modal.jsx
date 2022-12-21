import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

let Modal = (props) => {
  return (
    <div className='reviews-modal' style={props.additionalStyling || {}}>
      <div className='form-wrapper'>
        <span
          id='reviews-modal-overlay'
          className='review-exit-modal reviews-pointer'
          onClick={props.onClick}>
          <FontAwesomeIcon icon={faXmark} />
        </span>

        {props.componentData}
      </div>
    </div>
  );
};

export default Modal;