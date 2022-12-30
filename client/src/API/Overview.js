
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
  }
};

export default Overview;