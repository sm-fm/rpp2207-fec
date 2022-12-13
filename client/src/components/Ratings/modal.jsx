import React from 'react';

let Modal = (props) => {
  console.log('modal is loading in');
  return (
    <div className='reviews-modal'>
      <div className='exit-modal' onClick={props.onClick}>X</div>
      <div className='image-wrapper'>
        <img src={props.src}
          alt='Sorry, the image could not be loaded at this time, please try again later.'/>
      </div>
    </div>
  );
};

export default Modal;