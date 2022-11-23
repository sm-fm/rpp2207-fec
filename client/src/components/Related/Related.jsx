import React, { useState, useEffect } from 'react';
import relatedAPI from '../../API/Related.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './related.css'

const Related = (props) => {
  const [relatedProducts, setRelatedProducts] = useState();

  useEffect(() => {
    relatedAPI.getRelatedProducts(props.objID)
    .then((products) => {
      console.log('product from useEffect: ', products)
      setRelatedProducts(products);
    })
  }, [])

  return (
      <div className='related-container'>
        <RelatedProducts relatedProducts={relatedProducts} generateStars={props.generateStars}/>
        <YourOutfit />
      </div>
  )
}

export default Related;