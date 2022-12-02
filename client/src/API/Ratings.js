const fetch = require('node-fetch');

const Ratings = {
  getReviewMetadata: (id) => {
    return fetch(`http://localhost:3000/reviews/meta?product_id=${id}`)
      .then(results => {
        return results.json();
      });
  }
};

export default Ratings;