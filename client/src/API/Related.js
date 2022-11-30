// import GITHUB_ACCESS_TOKEN from '../auth.js';
let GITHUB_ACCESS_TOKEN = 'l'
const RelatedAPI = {
  getRelatedProducts: (id) => {
    var relatedProducts = [];
    return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`, {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
      .then(results => {
        return results.json();
      })
      .then(relatedIDs => {
        return Promise.all(
          relatedIDs.map(id => {
            return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, {
              method: 'GET',
              headers: {
                'Authorization': GITHUB_ACCESS_TOKEN
              }
            })
            .then((result) => {
              return result.json();
            })
          })
        )
      })
      .then((products) => {
        relatedProducts = products;
        console.log('relatedProducts: ', relatedProducts)
        return Promise.all(
          products.map(product => {
            return fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${product.id}/styles`, {
              method: 'GET',
              headers: {
                'Authorization': GITHUB_ACCESS_TOKEN
              }
            })
            .then((result) => {
              return result.json();
            })
          })
        )
        .then((styles) => {
          for (var i = 0; i < styles.length; i++) {
            relatedProducts[i].styles = styles[i];
          }
          console.log('relatedProducts with styles: ', relatedProducts)
          return relatedProducts;
        })
      })
      .catch(err => {
        console.log(err);
      });
  },
};

export default RelatedAPI;