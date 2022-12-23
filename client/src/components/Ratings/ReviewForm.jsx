import React from 'react';
import {useEffect, useState} from 'react';
import Modal from './modal.jsx';
import hf from './helperFunctions.js';

let ReviewForm = (props) => {
  const [overallRating, setOverallRating] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [characteristics, setCharacteristics] = useState({});

  useEffect(() => {
    let characteristics = Object.keys(props.availableOptions).map(val => {
      console.log(val);
      console.log(props.availableOptions[val]);
      return {name: val, id: props.availableOptions[val].id, value: 0};
    });
    setCharacteristics(characteristics);
  }, [props.availableOptions]);

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

  let characteristicMeanings = {
    Size: {
      '1': 'A size too small',
      '2': 'A half size too small',
      '3': 'Perfect',
      '4': 'A half size too big',
      '5': ' A size too wide'
    },
    Width: {
      '1': 'Too narrow',
      '2': 'Slightly narrow',
      '3': 'Perfect',
      '4': 'Slightly wide',
      '5': 'Too wide'
    },
    Comfort: {
      '1': 'Uncomfortable',
      '2': 'Slightly uncomfortable',
      '3': 'Ok',
      '4': 'Comfortable',
      '5': 'Perfect'
    },
    Quality: {
      '1': 'Poor',
      '2': 'Below average',
      '3': 'What I expected',
      '4': 'Pretty great',
      '5': 'Perfect'
    },
    Length: {
      '1': 'Runs short',
      '2': 'Runs slightly short',
      '3': 'Perfect',
      '4': 'Runs slightly long',
      '5': 'Runs long'
    },
    Fit: {
      '1': 'Runs tight',
      '2': 'Runs slightly tight',
      '3': 'Perfect',
      '4': 'Runs slightly loose',
      '5': 'Runs loose'
    }
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
        return {id: val.id, name: val.name, value: e.target.value};
      } else {
        return val;
      }
    });
    setCharacteristics(newObj);
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
            <td colSpan={2}>
              <input type='radio' id='recommend' name='recommendSt' value={true} onChange={handleRecommend}></input>
              <label htmlFor='recommend'>Yes</label>
              <input type='radio' value={false} name='recommendSt' id='dontRecommend' onChange={handleRecommend}></input>
              <label htmlFor='dontRecommend'>No</label>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody className='internal-characteristic-table'>
          <tr>
            <td colSpan={2} style={{'textAlign': 'center'}}>
              Rank particular attributes of this product
            </td>
          </tr>
          {Object.keys(props.availableOptions).map(option => {
            return (
              <tr key={'review-form-characteristic-' + option}>
                <td key={'review-form-characteristic-' + option}>{option}</td>
                <td>
                  <table>
                    <tbody>
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
            <td>Review Summary</td>
            <td><input className='text-input' type='textbox' placeholder='Example: Best Purchase Ever!'></input></td>
          </tr>

          <tr>
            <td>Review Body</td>
            <td>
              <textarea className='text-input' placeholder='Why did you like the product or not?'></textarea>
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