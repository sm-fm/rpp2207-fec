import GITHUB_ACCESS_TOKEN from '../auth.js';

const RelatedAPI = {
  getRelatedProducts: (id) => {
    return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
      .then(result => {
        return result.json();
      })
      .then(result => {
        const category = result.category;
        console.log(category);
        return fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', {
          method: 'GET',
          headers: {
            'Authorization': GITHUB_ACCESS_TOKEN
          }
        })
          .then(results => {
            return results.json();
          })
          .then(results => {
            return results.filter(result => result.category === category);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
};

export default RelatedAPI;