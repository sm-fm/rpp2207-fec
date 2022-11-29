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
      setRelatedProducts(products);
    })
  }, [])

<<<<<<< HEAD
const Related = (props  ) => {
  return (
    <div>
      <h1>Related.jsx</h1>
      <p>{props.generateStars(0.2, 'related')}</p>
    </div>
=======
  return (
      <div className='related-container'>
        <RelatedProducts relatedProducts={relatedProducts} generateStars={props.generateStars}/>
        <YourOutfit />
      </div>
>>>>>>> 56ed82231899fc23ced72b2d56cfed1bf350c94b
  )
}

export default Related;