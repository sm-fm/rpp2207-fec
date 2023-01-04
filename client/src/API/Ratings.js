const fetch = require('node-fetch');
const testing = true;
const apiUrl = testing ? 'http://localhost:3000/' : '';
const Ratings = {
  getReviewList: (product_id, sort, page, count) => {
    return fetch(apiUrl + 'reviews/?' +
      new URLSearchParams({
        product_id: product_id,
        sort: sort,
        page: page,
        count: count
      }), {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(data => {
        return data.json();
      });
  },
  getReviewMetadata: (id) => {
    return fetch(apiUrl + 'reviews/meta/?' +
    new URLSearchParams({
      product_id: id,
    }),
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(results => {
        return results.json();
      });
  },
  helpfulReview: (review_id) => {
    return fetch(apiUrl + 'reviews/helpful/?' +
    new URLSearchParams({
      review_id: review_id
    }),
    {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    )
      .then((data) => {
        return data.json();
      })
      .then(data => {
        if (Object.keys(data).length === 0) {
          throw new Error('Fail');
        }
        return data;
      })
      .catch(err => {
        return false;
      });
  },
  reportReview: (review_id) => {
    return fetch(apiUrl + 'reviews/report/?' +
    new URLSearchParams({
      review_id: review_id
    }),
    {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(() => {
        return true;
      })
      .catch(err => {
        return err;
      });
  },
  getAll: (product_id, sort = 'relevant', page = 1, count = 5) => {
    return Promise.all([Ratings.getReviewList(product_id, sort, page, count), Ratings.getReviewMetadata(product_id)])
      .then(data => {
        return data;
      });
  },
  userReview: (review_id, {rating, recommend, characteristics, reviewSummary, reviewBody, nickName, email, photos = []}) => {
    let chars = {};
    for (let i = 0; i < characteristics.length; i++) {
      chars[characteristics[i].id] = characteristics[i].value;
    }

    return fetch(apiUrl + 'reviews/userReview/', {
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
      .then((data) => {
        return data.json();
      })
      .then(data => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  },
  submitUserPhoto: (file) => {
    let data = new Blob([file.file]);
    const payload = new FormData();
    payload.append('imageData', data, 'imageData');
    return fetch(apiUrl + 'reviews/photoUpload', {
      method: 'POST',
      body: payload
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
};

export default Ratings;