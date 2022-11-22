import GITHUB_ACCESS_TOKEN from '../auth.js';
const fetch = require('node-fetch');

const Overview = {
  getAllProducts: () => {
    return fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
      .then(results => {
        return results.json();
      })
      .catch(err => {
        console.log(err);
      });
  },

  getProductById: (id) => {
    return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, {
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