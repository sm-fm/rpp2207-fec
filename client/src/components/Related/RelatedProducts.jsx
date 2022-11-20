import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

const RelatedProducts = (props) => {
  return (
    <div className='related-products-container'>
      {props.relatedProducts ?


      props.relatedProducts.map((product) => {
        return <ProductCard key={product.id} product={product}/>
      })
      : null
      }
    </div>

  )
}

export default RelatedProducts;