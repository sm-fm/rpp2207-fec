
const Overview = {
  getAllProducts: () => {
    return fetch('products', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(results => {
        console.log(results);
        return results;
      })
      .catch(err => {
        console.log(err);
      });
  },

  getProductById: (id) => {
    return fetch(`products/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  },

  getStylesById: (id) => {
    return fetch(`products/${id}/styles`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  },

  addToCart: (data) => {
    return fetch('cart', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(() => {
        return;
      })
      .catch(err => {
        console.log(err);
      });
  },

  getAllReviews: (id) => {
    return fetch(`allReviews/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(result => {
        return result.json();
      })
      .catch(err => {
        console.log(err);
      });
  },

  getAverageRating: (ratings) => {
    var sum = 0;
    var count = 0;
    Object.keys(ratings).forEach(function(rating) {
      sum += rating * parseInt(ratings[rating]);
      count += parseInt(ratings[rating]);
    });
    return sum / count;
  }
};

export default Overview;