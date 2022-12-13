
const Overview = {
  getAllProducts: () => {
    return fetch('http://localhost:3000/products', {
      method: 'GET'
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
    return fetch(`http://localhost:3000/products/${id}`, {
      method: 'GET'
    })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  },

  getStylesById: (id) => {
    return fetch(`http://localhost:3000/products/${id}/styles`, {
      method: 'GET'
    })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default Overview;