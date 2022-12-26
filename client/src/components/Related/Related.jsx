import React, { useState, useEffect } from 'react';
import overviewAPI from '../../API/Overview.js';
import relatedAPI from '../../API/Related.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './related.css';

const Related = (props) => {
  const [relatedProducts, setRelatedProducts] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({});

  // const handleSetIsFetching = () => {
  //   setIsFetching(!isFetching);
  // };

  useEffect(() => {
    relatedAPI.getRelatedProducts(props.objID)
      .then((products) => {
        var productsMap = new Map();
        products.forEach(product => productsMap.set(product.id, product));
        setRelatedProducts([...productsMap.values()]);
      });
      //won't need this call anymore, just change to current info based on inherited state
    overviewAPI.getProductById(props.objID)
      .then((result) => {
        return result.json();
      })
      .then((product) => {
        setCurrentProduct(product);
      });
  }, [props.objID]);

  return (
    <div className='related-container'>
      <div className="related-products-header">RELATED PRODUCTS</div>
      <RelatedProducts currentProduct={currentProduct} addToOutfit={props.addToOutfit} yourOutfit={props.yourOutfit} relatedProducts={relatedProducts} generateStars={props.generateStars} isFetching={isFetching}setIsFetching={setIsFetching} />
      <div className="your-outfit-header">YOUR OUTFIT</div>
      <YourOutfit
        objID={props.objID}
        yourOutfit={props.yourOutfit}
        addToOutfit={props.addToOutfit}
        removeFromOutfit={props.removeFromOutfit}
        generateStars={props.generateStars}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
    </div>
  );
};

export default Related;