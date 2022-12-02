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
  return (parseInt(rec.true) / parseInt(rec.true) + parseInt(rec.false)).toFixed(0);
};

module.exports = {
  calculateAverageReviews: calculateAverageReviews,
  calculateRecommended: calculateRecommended
};