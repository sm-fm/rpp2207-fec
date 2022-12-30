/**
 *
 * @param {*} reviews - Object returned by the ratings property in the metadata API call
 *                      Has the shape of: {1: '20', 2: '19', 3: '38', 4: '43', 5: '86'}
 */
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

module.exports = {
  calculateAverageReviews: calculateAverageReviews,
  calculateRecommended: calculateRecommended,
  manipulateRatings: manipulateRatings,
  returnMin: returnMin
};