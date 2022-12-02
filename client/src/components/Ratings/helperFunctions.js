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
}

let printResults = (expected, actual, testName) => {
  if (expected == actual) {
    console.log(`PASSED [${testName}]`)
  } else {
    console.log(`FAILED [${testName}] expected [${expected}] but got [${actual}]`)
  }
}

let calculateRecommended = (rec) => {
  if (typeof (rec) !== 'object') {
    return null;
  }
  return (parseInt(rec.true) / parseInt(rec.true) + parseInt(rec.false)).toFixed(0)
}

let calculateAverageReviewsTests = () => {
  let expected, actual, testName;

  expected = null;
  actual = calculateAverageReviews(undefined);
  testName = 'Test 1 - Should return null for non-object type inputted';
  printResults(expected, actual, testName);

  expected = 3.8;
  actual = calculateAverageReviews({1: '20', 2: '19', 3: '38', 4: '43', 5: '86'});
  testName = 'Test 2 - Should return average rating rounded to the nearest tenth';
  printResults(expected, actual, testName);

  expected = 2;
  actual = calculateAverageReviews({1: '0', 2: '20', 3: '0', 4: '0', 5: '0'});
  testName = 'Test 3 - If only one rating has votes it should return that rating';
  printResults(expected, actual, testName);
}

let calculateRecommendedTests = () => {
  let expected, actual, testName;

  expected = null;
  actual = calculateRecommended(undefined);
  testName = 'Test 1 - Should return null for non-object type inputted';
  printResults(expected, actual, testName);

  expected = 55;
  actual = calculateRecommended({false:'54', true:'152'});
  testName = 'Test 2 - Should return a whole number when given clean data';
  printResults(expected, actual, testName);
}
// calculateAverageReviewsTests();
// calculateRecommendedTests();
module.exports = {
  calculateAverageReviews: calculateAverageReviews,
  calculateRecommended: calculateRecommended
}