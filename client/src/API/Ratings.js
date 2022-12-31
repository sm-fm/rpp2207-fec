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
  },
  userReview: (review_id, {rating, recommend, characteristics, reviewSummary, reviewBody, nickName, email, photos = []}) => {
    console.log('hi there: ', review_id, {rating, recommend, characteristics, reviewSummary, reviewBody, nickName, email});
    let chars = {};
    for (let i = 0; i < characteristics.length; i++) {
      chars[characteristics[i].id] = characteristics[i].value;
    }

    return fetch('http://localhost:3000/reviews/userReview/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: review_id,
        rating: rating,
        summary: reviewSummary,
        body: reviewBody,
        recommend: JSON.parse(recommend),
        name: nickName,
        email: email,
        photos: photos,
        characteristics: chars,
      })
    })
      .then(() => {
        return true;
      })
      .catch((err) => {
        return err;
      });
  },
  submitUserPhoto: (file) => {
    console.log(file);
    return fetch('reviews/photoUpload', {
      method: 'POST',
      body: file
    })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      })
  }
};

export default Ratings;