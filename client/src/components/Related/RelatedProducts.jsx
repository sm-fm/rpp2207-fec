import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';



const RelatedProducts = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = "RelatedProducts";

  return (
    <>
      <div className='related-products-container' style={{marginLeft: `-${position}px`}}>
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

      </div>
      <div className='fade-top'>
        { position > 0 ?
        <div className="arrow-container-left">
          <div className="arrow-left" onClick={() => {setPosition(position - 250)}}></div>
        </div>
        : null
        }
        { props && props.relatedProducts && position <= (props.relatedProducts.length - 4) * 250?
        <div className="arrow-container-right">
          <div className="arrow-right" onClick={() => {setPosition(position + 250)}}></div>
        </div>
        : null
        }
      </div>
    </>
  )
}

export default RelatedProducts;