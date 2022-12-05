import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import relatedAPI from '../../API/Related.js';

const YourOutfit = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = 'YourOutfit';
  const [currentProduct, setCurrentProduct] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    relatedAPI.getProductById(props.currentProductID)
      .then((product) => {
        setCurrentProduct(product);
        setIsFetching(false);
      });
  }, [props.objID]);

  return (
    !isFetching ?
      <>
        <div className='your-outfit-container' style={{marginLeft: `-${position}px`}}>
          {props.yourOutfit.length > 0 ?
            props.yourOutfit.map((product) => {
              return <ProductCard
                key={product.id}
                product={product}
                generateStars={props.generateStars}
                isFetching={isFetching}
                parentComponent={componentName}
                removeFromOutfit={props.removeFromOutfit}
              />;
            })
            :
            <div className='product-card-container' onClick={() => { props.addToOutfit(currentProduct); }}>
              <div className='add-to-outfit-btn'>+</div>
            </div>
          }
        </div>
        <div className='fade-bottom'>
          { position > 0 ?
            <div className='arrow-container-left'>
              <div className='arrow-left' onClick={() => { setPosition(position - 250); }}></div>
            </div>
            : null
          }
          { props && props.yourOutfit && position <= (props.yourOutfit.length - 4) * 250 ?
            <div className='arrow-container-right'>
              <div className='arrow-right' onClick={() => { setPosition(position + 250); }}></div>
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