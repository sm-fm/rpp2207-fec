const RelatedAPI = {
  getRelatedProducts: (id) => {
    var relatedProducts = [];
    return fetch(`products/${id}/related`)
      .then(results => {
        return results.json();
      })
      .then(relatedIDs => {
        return Promise.all(
          relatedIDs.map(id => {
            return fetch(`products/${id}`)
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
            return fetch(`products/${product.id}/styles`)
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