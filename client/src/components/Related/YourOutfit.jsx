import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

const YourOutfit = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = 'YourOutfit';

  return (
    <>
      <div className='your-outfit-container' style={{marginLeft: `-${position}px`}}>
        <div className='product-card-container' onClick={() => { props.addToOutfit(props.product); }}>
          <div className='add-to-outfit-btn' role='button' aria-label='add to your outfit'>+</div>
        </div>
        { props.yourOutfit.map((product) => {
          return <ProductCard
            avgRatings={props.avgRatings}
            key={product.id}
            product={product}
            generateStars={props.generateStars}
            parentComponent={componentName}
            removeFromOutfit={props.removeFromOutfit}
          />;
        })}
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
  );
};

export default YourOutfit;