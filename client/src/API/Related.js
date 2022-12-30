const fetch = require('node-fetch');

const RelatedAPI = {
  getRelatedProducts: (id) => {
    var relatedProducts = [];
    return fetch(`http://localhost:3000/products/${id}/related`)
      .then(results => {
        return results.json();
      })
      .then(relatedIDs => {
        return Promise.all(
          relatedIDs.map(id => {
            return fetch(`http://localhost:3000/products/${id}`)
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
            return fetch(`http://localhost:3000/products/${product.id}/styles`)
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
    return fetch(`http://localhost:3000/products/${id}`)
      .then(json => {
        return json.json();
      })
      .then((product) => {
        return product;
      })
      .then((product) => {
        return fetch(`http://localhost:3000/products/${product.id}/styles`)
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