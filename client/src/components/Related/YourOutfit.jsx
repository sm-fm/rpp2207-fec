import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import relatedAPI from '../../API/Related.js';

const YourOutfit = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = 'YourOutfit';
  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    relatedAPI.getProductById(props.objID)
      .then((product) => {
        setCurrentProduct(product);
      });
  }, [props.objID]);

  useEffect(() => {
    props.setIsFetching(false);
  }, [currentProduct]);

  return (
    !props.isFetching && currentProduct ?
      <>
        <div className='your-outfit-container' style={{marginLeft: `-${position}px`}}>
          <div className='product-card-container' onClick={() => {
            props.addToOutfit(currentProduct);
          }}>
            <div className='add-to-outfit-btn' role='button' aria-label='add to your outfit'>+</div>
          </div>
          { props.yourOutfit.length > 0 ?
            props.yourOutfit.map((product) => {
              return <ProductCard
                key={product.id}
                product={product}
                generateStars={props.generateStars}
                isFetching={props.isFetching}
                setIsFetching={props.setIsFetching}
                parentComponent={componentName}
                removeFromOutfit={props.removeFromOutfit}
              />;
            })
            : null }
        </div>
        <div className='fade-bottom'>
          { position > 0 ?
            <div className='arrow-container-left'>
              <div className='arrow-left' role='button' aria-label='scroll left' onClick={() => { setPosition(position - 250); }}></div>
            </div>
            : null
          }
          { props && props.yourOutfit && position <= (props.yourOutfit.length - 3) * 250 ?
            <div className='arrow-container-right'>
              <div className='arrow-right' role='button' aria-label='scroll right' onClick={() => { setPosition(position + 250); }}></div>
            </div>
            : null
          }
        </div>

      </>
      :
      null

  );
};

export default YourOutfit;