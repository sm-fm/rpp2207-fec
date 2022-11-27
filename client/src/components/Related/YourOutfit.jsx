import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

const YourOutfit = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = 'YourOutfit';

  return (
    <>
      <div className='your-outfit-container' style={{marginLeft: `-${position}px`}}>
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
      <div className='fade-bottom'>
        { position > 0 ?
        <div className="arrow-container-left">
          <div className="arrow-left" onClick={() => {setPosition(position - 250)}}></div>
        </div>
        : null
        }
        { props && props.yourOutfit && position <= (props.yourOutfit.length - 4) * 250?
        <div className="arrow-container-right">
          <div className="arrow-right" onClick={() => {setPosition(position + 250)}}></div>
        </div>
        : null
        }
      </div>
    </>
  )
}

export default YourOutfit;