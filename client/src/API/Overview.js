import GITHUB_ACCESS_TOKEN from '../auth.js';

const Overview = {
  getAllProducts: () => {
    fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
      .then(results => {
        return results.json();
      })
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },

};

export default Overview;