const fetch = require('node-fetch');
const Ratings = {
  getReviewList: (product_id, rating, sort, page, count) => {
    return fetch('http://localhost:3000/reviews/?' +
      new URLSearchParams({
        product_id: product_id,
        sort: sort,
        page: page,
        count: count,
        rating: JSON.stringify(rating)
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
  getAll: (product_id, rating = [], sort = 'relevant', page = 1, count = 5) => {
    console.log('thjis is the rating: ', rating);
    return Promise.all([Ratings.getReviewList(product_id, JSON.stringify(rating), sort, page, count), Ratings.getReviewMetadata(product_id)])
      .then(data => {
        return data;
      });
  }
};

export default Ratings;