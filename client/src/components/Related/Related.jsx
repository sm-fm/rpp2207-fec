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
      setRelatedProducts(products);
    })
  }, [])

  return (
      <div className='related-container'>
        <RelatedProducts addToOutfit={props.addToOutfit} yourOutfit={props.yourOutfit} relatedProducts={relatedProducts} generateStars={props.generateStars} setIsFetching={setIsFetching}/>
        <YourOutfit yourOutfit={props.yourOutfit} removeFromOutfit={props.removeFromOutfit} generateStars={props.generateStars} setIsFetching={setIsFetching}/>
      </div>
  )
}

export default Related;