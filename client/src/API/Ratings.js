import GITHUB_ACCESS_TOKEN from '../auth.js';

const Ratings = {
  getReviewMetadata: (id) => {
    return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
    .then(results => {
      return results.json();
    })
  }
};

export default Ratings;