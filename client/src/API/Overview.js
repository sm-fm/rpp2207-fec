const fetch = require('node-fetch');

const Overview = {
  getAllProducts: () => {
    return fetch('products')
      .then(results => {
        return results.json();
      })
      .catch(err => {
        console.log(err);
      });
  },

  getProductById: (id) => {
    return fetch(`products/${id}`)
      .then(result => {
        return result.json();
      })
      .catch(err => {
        console.log(err);
      });
  },

  getStylesById: (id) => {
    return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
      .then(result => {
        return result.json();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default Overview;