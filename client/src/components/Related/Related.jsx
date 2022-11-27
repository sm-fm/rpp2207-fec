import React, { useState, useEffect } from 'react';
import relatedAPI from '../../API/Related.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './related.css'

const Related = (props) => {
  const [relatedProducts, setRelatedProducts] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const handleSetIsFetching = () => {
    setIsFetching(!isFetching);
  }

  useEffect(() => {
    relatedAPI.getRelatedProducts(props.objID)
    .then((products) => {
      var productsMap = new Map();
      products.forEach(product => productsMap.set(product.id, product));
      setRelatedProducts([...productsMap.values()]);
    })
  }, [])

  return (
      <div className='related-container'>
        <div className="related-products-header">RELATED PRODUCTS</div>
        <RelatedProducts addToOutfit={props.addToOutfit} yourOutfit={props.yourOutfit} relatedProducts={relatedProducts} generateStars={props.generateStars} setIsFetching={setIsFetching}/>
        <div className="your-outfit-header">YOUR OUTFIT</div>
        <YourOutfit yourOutfit={props.yourOutfit} removeFromOutfit={props.removeFromOutfit} generateStars={props.generateStars} setIsFetching={setIsFetching}/>
      </div>
  )
}

export default Related;