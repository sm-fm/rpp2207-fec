/**
 *
 * @param {*} reviews - Object returned by the ratings property in the metadata API call
 *                      Has the shape of: {1: '20', 2: '19', 3: '38', 4: '43', 5: '86'}
 */

import React from 'react';
let calculateAverageReviews = (reviews) => {
  if (typeof(reviews) !== 'object') {
    return null;
  }

  let totalVotes = 0;
  let starCount = 0;

  let reviewsKeys = Object.keys(reviews);
  for (let i = 0; i < reviewsKeys.length; i++) {
    starCount += parseInt(reviewsKeys[i]) * parseInt(reviews[reviewsKeys[i]]);
    totalVotes += parseInt(reviews[reviewsKeys[i]]);
  }
  return ((starCount / (totalVotes ))).toFixed(1);
};

let calculateRecommended = (rec) => {
  if (typeof (rec) !== 'object') {
    return null;
  }
  return Math.round((parseInt(rec.true) / (parseInt(rec.true) + parseInt(rec.false))) * 100);
};

let manipulateRatings = (obj) => {
  if (typeof(obj) !== 'object') {
    return undefined;
  }

  var totalVotes = Object.values(obj).reduce((a, b)=>{ return parseInt(a) + parseInt(b); }, 0);
  var resultObj = {};

  var currKey, currVotes;
  for (let i = 0; i < Object.keys(obj).length; i++) {
    currKey = Object.keys(obj)[i];
    currVotes = parseInt(obj[currKey]);

    resultObj[currKey] = {'votes': currVotes, 'ratio': parseFloat((currVotes / totalVotes).toFixed(2))};
  }

  for (let i = 0; i < 5; i++) {
    if (resultObj[i + 1] === undefined) {
      resultObj[i + 1] = {'votes': 0, 'ratio': 0};
    }
  }
  return resultObj;
};

let returnMin = (a, b) => {
  if (typeof(a) !== typeof(b)) {
    return undefined;
  }
  return (a > b) ? b : a;
};

let reviewFormStars = (numberStars, key, clickHandler) => {
  const fullStar = (id, st, key) => {
    if (st === 'f') {
      return (
        <svg key={`${key}-${id}`} width="15px" height="15px" viewBox="0 0 31 31" onClick={clickHandler} className={`${key}-${id}`}>
          <defs>
            <linearGradient id="grad-full-review-form">
              <stop offset="100%" stopColor="black"/>
            </linearGradient>
          </defs>
          <path fill="url(#grad-full-review-form)" className={`${key}-${id}`} stroke="black" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
        l11.547-1.2L16.026,0.6L20.388,10.918z"/>
        </svg>
      );
    } else if (st === 'e') {
      return (
        <svg key={`${key}-${id}`} width="15px" height="15px" viewBox="0 0 31 31" onClick={clickHandler} className={`${key}-${id}`}>
          <defs>
            <linearGradient id="grad-full">
              <stop offset="100%" stopColor="white"/>
            </linearGradient>
          </defs>
          <path className={`${key}-${id}`} fill="white" stroke="black" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
        l11.547-1.2L16.026,0.6L20.388,10.918z"/>
        </svg>
      );
    }
  };

  const generateStars = (rating, key) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(fullStar(i, 'f', key));
      } else if ( i > fullStars - 1) {
        stars.push(fullStar(i, 'e', key));
      }
    }
    return stars;
  };
  if (numberStars === undefined) {
    return generateStars(0, key);
  } else {
    return generateStars(numberStars, key);
  }
};

let reviewFormValidation = (inputData, validationRules) => {
  let errors = {};
  const createPredicate = ([test, errMsg]) => {
    return (a) => {
      return test(a) ? null : errMsg;
    };
  };

  let currentElement, validations, testResult;
  for (let i = 0; i < Object.keys(validationRules).length; i++) {
    currentElement = Object.keys(validationRules)[i];
    for (let j = 0; j < validationRules[currentElement].length; j++) {
      validations = createPredicate(validationRules[currentElement][j]);
      testResult = validations(inputData[currentElement]);
      if (testResult) {
        if (errors[currentElement] === undefined) {
          errors[currentElement] = testResult;
        } else {
          errors[currentElement] = [errors[currentElement], testResult];
        }
      }
    }
  }
  return errors;
};

let validationRules = {
  rating: [
    [
      ((b) => { return Boolean(b); }).bind(null),
      'Overall Rating is a required field'
    ],
  ],
  recommend: [
    [
      ((b) => { return Boolean(b); }).bind(null),
      'Recommended is a required field'
    ]
  ],
  characteristics: [
    [
      ((characteristics) => {
        for (let y = 0; y < Object.keys(characteristics).length; y++) {
          if (!characteristics[Object.keys(characteristics)[y]].value) {
            return false;
          }
        }
        return true;
      }).bind(null),
      'All attributes are required field(s)'
    ]
  ],
  reviewSummary: [
    [
      ((b) => { return b.length <= 60; }).bind(null),
      'Review summary must not exceed 60 characters'
    ]
  ],
  reviewBody: [
    [
      ((b) => { return b.length >= 50; }).bind(null),
      'The review body must have more than 50 characters'
    ],
    [
      ((b) => { return b.length <= 1000; }).bind(null),
      'The review body must not exceed 1000 characters'
    ],
  ],
  nickName: [
    [
      ((b) => { return b.length <= 60; }).bind(null),
      'The nickname must not exceed 60 characters'
    ],
    [
      ((b) => { return b.length >= 1; }).bind(null),
      'A nickname is required for submission'
    ]
  ],
  email: [
    [
      ((b) => { return (b.includes('@') && b.includes('.') && b.length > 4); }).bind(null),
      'The email entered is not valid',
    ],
    [
      ((b) => { return b.length <= 60; }).bind(null),
      'The email must not exceed 60 characters'
    ]
  ]
};

export default {
  calculateAverageReviews: calculateAverageReviews,
  calculateRecommended: calculateRecommended,
  manipulateRatings: manipulateRatings,
  returnMin: returnMin,
  reviewFormStars: reviewFormStars,
  reviewFormValidation: reviewFormValidation,
  validationRules: validationRules
};