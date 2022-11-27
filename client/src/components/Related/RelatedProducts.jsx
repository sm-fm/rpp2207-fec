import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

const RelatedProducts = (props) => {
  const componentName = "RelatedProducts";
  return (
    <div className='related-products-container'>
      {props.relatedProducts ?


      props.relatedProducts.map((product) => {
        return <ProductCard
        key={product.id}
        product={product}
        generateStars={props.generateStars}
        isFetching={props.isFetching}
        setIsFetching={props.setIsFetching}
        parentComponent={componentName}
        yourOutfit={props.yourOutfit}
        addToOutfit={props.addToOutfit}
        />
      })
      : null
      }
      <div className="arrow right"></div>
    </div>

  )
}

export default RelatedProducts;