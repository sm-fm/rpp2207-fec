import React from 'react';
import {useEffect, useState} from 'react';
import Modal from './modal.jsx';
import hf from './helperFunctions.js';
import api from '../../API/Ratings.js';
import characteristicMeanings from './characteristicMeaning.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';

let ReviewForm = (props) => {
  const [overallRating, setOverallRating] = useState('');
  const [recommend, setRecommend] = useState(undefined);
  const [characteristics, setCharacteristics] = useState({});
  const [reviewBody, setReviewBody] = useState('');
  const [reviewSummary, setReviewSummary] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [submissionError, setSubmissionError] = useState([]);
  const [photoList, setPhotoList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [displayPhotoModal, setDisplayPhotoModal] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [serverSubmissionError, setServerSubmissionError] = useState('');

  useEffect(() => {
    let characteristics = Object.keys(props.availableOptions).map(val => {
      return {name: val, id: props.availableOptions[val].id, value: 0};
    });
    setCharacteristics(characteristics);
  }, [props.availableOptions]);

  let onExit = () => {
    props.toggleReviewForm();
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

  let handleCharacteristics = (e) => {
    let newObj = JSON.parse(JSON.stringify(characteristics));
    newObj = newObj.map(val => {
      if (val.name === e.target.name) {
        return {id: val.id, name: val.name, value: parseInt(e.target.value)};
      } else {
        return val;
      }
    });
    setCharacteristics(newObj);
  };

  let handleReviewSummary = (e) => {
    let elementClass = e.target.className.split(' ')[1];
    if (elementClass === 'reviewBody') {
      setReviewBody(e.target.value);
    } else if (elementClass === 'reviewSummary') {
      setReviewSummary(e.target.value);
    } else if (elementClass === 'nickname') {
      setNickname(e.target.value);
    } else if (elementClass === 'email') {
      setEmail(e.target.value);
    }
  };

  let encodeImageFileAsURL = async (file) => {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        if (reader.result) {
          resolve(reader.result);
        } else {
          reject('didnt work');
        }
      };
    });
  };

  let photoChangeHandler = async (e) => {
    const file = e.target.files[0];
    let encoded = await encodeImageFileAsURL(file);
    setImageProcessing(true);
    let result = await api.submitUserPhoto({file: encoded});
    setSelectedPhoto(result.url);
    setImageProcessing(false);
  };

  useEffect(() => {
    if (selectedPhoto && photoList.length < 5) {
      setPhotoList([...photoList, selectedPhoto]);
    }
  }, [selectedPhoto]);

  let photoSubmission = () => {
    setDisplayPhotoModal(false);
  };

  let photoForm = (
    <div className='photo-modal'>
      <label htmlFor = 'photo-upload'>
        Upload your photo
        <FontAwesomeIcon className='camera-icon' icon={faCamera}/>
        {photoList.length < 5 ?
          <>
            <input type='file' id='photo-upload' onChange={photoChangeHandler} accept='image/png, image/jpg, image/jpeg'/>
            <p className='discloser'>* Please use .png, .jpg, or .jpeg. Submit up to 5 images.</p>
          </>
          :
          <>
            <input type='file' id='photo-upload' accept='image/png, image/jpg, image/jpeg' disabled/>
            <p className='discloser'>* You have reached the maximum number of uploads.</p>
          </>
        }
      </label>
      {photoList.length < 5 ?
        <div>
          <button onClick={photoSubmission} className='photo-modal-submission'>Submit</button>
          {imageProcessing ?
            <p style={{'display':'inline-block'}}>Image is processing, please wait...</p>
            :
            null
          }
        </div>
        :
        null
      }


      <div className='photo-submission-thumbnails'>
        {photoList.map((val, idx) => {
          return (
            <img key={'photo-submission' + idx} src = {val} onClick={() => { window.open(val); }}/>
          );
        })}
      </div>
    </div>
  );

  let dataValidation = () => {
    let currentData = {
      characteristics: characteristics,
      email: email,
      nickName: nickname,
      rating: overallRating,
      recommend: recommend,
      reviewBody: reviewBody,
      reviewSummary: reviewSummary,
      photos: photoList,
    };

    let errors = hf.reviewFormValidation(currentData, hf.validationRules);
    if (Object.keys(errors).length) {
      setSubmissionError(Object.values(errors));
    } else {
      setSubmissionError({});
      api.userReview(parseInt(props.product_id), currentData)
        .then(data => {
          if (Object.keys(data).length === 0) {
            throw new Error('There was an issue');
          }
          setServerSubmissionError('');
          props.toggleReviewForm(true, true);
          props.getReviewList();
        })
        .catch(err => {
          setServerSubmissionError('There was an error when trying to submit your review. Please try again later.');
        });
    }
  };

  let componentInformation = (

    <div className='review-review-form'>
      <h3>Have feedback for this product? Leave a review!</h3>
      <table className='general-review'>
        <tbody>
          <tr>
            <td>How would you rate this product?</td>
            <td>{hf.reviewFormStars(overallRating, 'review-form', overallRatingClickHandler)}</td>
            <td className='rating-meaning-holder'>{overallRatingMeanings[overallRating.toString()] || ''}</td>
          </tr>
          <tr>
            <td>Would you recommend this item?</td>
            <td colSpan={2}>
              <input
                type='radio'
                id='recommend'
                name='recommendSt'
                value={true}
                onChange={handleRecommend}></input>
              <label htmlFor='recommend'>Yes</label>
              <input
                type='radio'
                value={false}
                name='recommendSt'
                id='dontRecommend'
                onChange={handleRecommend}></input>
              <label htmlFor='dontRecommend'>No</label>
            </td>
          </tr>
        </tbody>
      </table>
      <table className='second-table'>
        <tbody>
          <tr>
            <td colSpan={2} ><div className='general-review-spacer'></div></td>
          </tr>
          <tr>
            <td className='title' colSpan={2} style={{'textAlign': 'center'}}>
              Rank particular attributes of this product
            </td>
          </tr>
          {Object.keys(props.availableOptions).map(option => {
            return (
              <tr key={'review-form-characteristic-' + option}>
                <td key={'review-form-characteristic-' + option} className='vertical-align'>{option}</td>
                <td>
                  <table>
                    <tbody className='characteristics-table'>
                      <tr>

                        {[1, 2, 3, 4, 5].map(vals => {
                          return (
                            <td key={'characteristic-label' + vals} className='characteristic-label'>
                              <label htmlFor={option}>{characteristicMeanings[option][vals]}</label>
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        {[1, 2, 3, 4, 5].map(vals => {
                          return (
                            <td key={'radio - ' + vals} className='characteristic-radio'>
                              <input type='radio' id={vals} name={option} value={vals} onChange={handleCharacteristics}></input>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          })}

          <tr>
            <td colSpan={2} ><div className='general-review-spacer'></div></td>
          </tr>
          <tr>
            <td>Title</td>
            <td><input
              className='text-input reviewSummary'
              type='textbox'
              placeholder='Example: Best Purchase Ever!'
              onChange={handleReviewSummary}
              maxLength={60}></input>
            </td>
          </tr>

          <tr>
            <td className='vertical-align'>Review</td>
            <td>
              <textarea
                className='text-input reviewBody'
                placeholder='Why did you like the product or not?'
                onChange={handleReviewSummary}
                maxLength={1000}></textarea>
            </td>
          </tr>

          <tr>
            <td>Nickname</td>
            <td>
              <input
                className='text-input nickname'
                type='textbox'
                placeholder='Example: Jackson11!'
                onChange={handleReviewSummary}
                maxLength={60}></input>
            </td>
          </tr>

          <tr>
            <td colSpan={2} className='discloser'>
              *For privacy reasons, do not use your full name or email address.
            </td>
          </tr>

          <tr>
            <td >Email </td>
            <td>
              <input
                className='text-input email'
                type='textbox'
                placeholder='Example: jackson11@email.com'
                onChange={handleReviewSummary}
                maxLength={60}></input>
            </td>
          </tr>

          <tr>
            <td colSpan={2} className='discloser'>
              *For authentication reasons, you will not be emailed.
            </td>
          </tr>

          <tr>
            <td colSpan={2} className='submitBtn' align='right'>
              <button onClick={dataValidation}>Submit your review</button>
              <button onClick={() => { setDisplayPhotoModal(!displayPhotoModal); }}>Upload photos</button>
            </td>
          </tr>

          {!!(submissionError.length) &&
            <>
              <tr>
                <td colSpan={2} style={{'maxWidth': '500px'}} className='discloser review-form-err'>Your submission could not be submitted due to the following reason(s): {submissionError.join(', ')}.</td>
              </tr>
            </>
          }

          {!!(serverSubmissionError) &&
            <>
              <tr>
                <td colSpan={2} style={{'maxWidth': '500px'}} className='discloser review-form-err'>{serverSubmissionError}</td>
              </tr>
            </>
          }
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='review-form-modal'>
      <>
        {displayPhotoModal &&
        <Modal componentData={photoForm} additionalStyling={{'zIndex': 100}} onClick={() => {
          setDisplayPhotoModal(false);
          setPhotoList([]);
        }}/>
        }
        <Modal onClick={onExit} componentData = {componentInformation}/>
      </>

    </div>
  );
};

export default ReviewForm;