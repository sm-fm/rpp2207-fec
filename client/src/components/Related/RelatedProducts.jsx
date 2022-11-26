import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

const RelatedProducts = (props) => {
  return (
    <div className='related-products-container'>
      {props.relatedProducts ?


      props.relatedProducts.map((product) => {
        return <ProductCard key={product.id} product={product} generateStars={props.generateStars} isFetching={props.isFetching} setIsFetching={props.setIsFetching}/>
      })
      : null
      }
    </div>

  )
}

export default RelatedProducts;