const fetch = require('node-fetch');
const options = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};
const RelatedAPI = {
  getRelatedProducts: (id) => {
    var relatedProducts = [];
    return fetch(`products/${id}/related`, options)
      .then(results => {
        return results.json();
      })
      .then(relatedIDs => {
        return Promise.all(
          relatedIDs.map(id => {
            return fetch(`products/${id}`, options)
              .then((result) => {
                return result.json();
              });
          })
        );
      })
      .then((products) => {
        relatedProducts = products;
        return Promise.all(
          products.map(product => {
            return fetch(`products/${product.id}/styles`, options)
              .then((result) => {
                return result.json();
              });
          })
        )
          .then((styles) => {
            for (var i = 0; i < styles.length; i++) {
              relatedProducts[i].styles = styles[i];
            }
            return relatedProducts;
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  getProductById: (id) => {
    return fetch(`products/${id}`, options)
      .then(json => {
        return json.json();
      })
      .then((product) => {
        return product;
      })
      .then((product) => {
        return fetch(`products/${product.id}/styles`, options)
          .then((json) => {
            return json.json();
          })
          .then((styles) => {
            return {...product, styles};
          });
      });
  }
};

export default RelatedAPI;