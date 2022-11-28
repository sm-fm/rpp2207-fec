import GITHUB_ACCESS_TOKEN from '../auth.js';

const Ratings = {
  getReviewList: (product_id, sort, page, count) => {
    return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?` +
    new URLSearchParams({
      product_id: product_id,
      sort: sort,
      page: page,
      count: count,
    })
    , {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
    .then(data => {
      return data.json();
    })
  }
  ,
  getReviewMetadata: (id) => {
    console.log('id: ', id)
    return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?` +
    new URLSearchParams({
      product_id: id,
    }),
    {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
    .then(results => {
      return results.json();
    })
  },
  getAll: (product_id, sort = 'relevant', page = 1, count = 5) => {
    return Promise.all([Ratings.getReviewList(product_id, sort, page, count), Ratings.getReviewMetadata(product_id)])
      .then(data => {
        return data;
      })
  }
};

export default Ratings;