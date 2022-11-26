import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

const YourOutfit = (props) => {
  const componentName = 'YourOutfit';
  return (
    <div className='your-outfit-container'>
      {props.yourOutfit ?
      props.yourOutfit.map((product) => {
        return <ProductCard
        key={product.id}
        product={product}
        generateStars={props.generateStars}
        isFetching={props.isFetching}
        setIsFetching={props.setIsFetching}
        parentComponent={componentName}
        removeFromOutfit={props.removeFromOutfit}
        />
      })
      : null
      }
    </div>
  )
}

export default YourOutfit;