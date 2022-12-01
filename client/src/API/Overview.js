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
  }
};

export default Overview;