const fetch = require('node-fetch');
const Ratings = {
  getReviewList: (product_id, sort, page, count) => {
    return fetch('http://localhost:3000/reviews/?' +
      new URLSearchParams({
        product_id: product_id,
        sort: sort,
        page: page,
        count: count
      }), {
      method: 'GET',
    })
      .then(data => {
        return data.json();
      });
  },
  getReviewMetadata: (id) => {
    return fetch('http://localhost:3000/reviews/meta/?' +
    new URLSearchParams({
      product_id: id,
    }),
    {
      method: 'GET',
    })
      .then(results => {
        return results.json();
      });
  },
  helpfulReview: (review_id) => {
    return fetch('http://localhost:3000/reviews/helpful/?' +
    new URLSearchParams({
      review_id: review_id
    }),
    {
      method: 'PUT',
    }
    )
      .then(() => {
        return true;
      })
      .catch(err => {
        return err;
      });
  },
  reportReview: (review_id) => {
    return fetch(`http://localhost:3000/reviews/report/?review_id=${review_id}`,
      {
        method: 'PUT'
      })
      .then(() => {
        return true;
      })
      .catch(err => {
        return err;
      });
  },
  getAll: (product_id, sort = 'relevant', page = 1, count = 100) => {
    return Promise.all([Ratings.getReviewList(product_id, sort, page, count), Ratings.getReviewMetadata(product_id)])
      .then(data => {
        return data;
      });
  }
};

export default Ratings;