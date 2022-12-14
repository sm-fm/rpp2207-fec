import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';



const RelatedProducts = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = 'RelatedProducts';

  return (
    <>
      <div className='related-products-container' role="listbox" aria-label="related products" style={{marginLeft: `-${position}px`}}>
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
            />;
          })
          : null
        }

      </div>
      <div className='fade-top'>
        { position > 0 ?
          <div className="arrow-container-left" role="button" aria-label="scroll left" onClick={() => { setPosition(position - 250); }}>
            <div className="arrow-left"></div>
          </div>
          : null
        }
        { props && props.relatedProducts && position <= (props.relatedProducts.length - 4) * 250 ?
          <div className="arrow-container-right" role="button" aria-label="scroll right" onClick={() => { setPosition(position + 250); }}>
            <div className="arrow-right"></div>
          </div>
          : null
        }
      </div>
    </>
  );
};

export default RelatedProducts;