
import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './related.css';

const Related = (props) => {
  const [relatedContainerWidth, setRelatedContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const elementRef = useRef(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    props.data.product.styles = {};
    props.data.product.styles.results = props.data.styles;
  }, [props.data]);

  useEffect(() => {
    setRelatedContainerWidth(elementRef.current.getBoundingClientRect().width);
  }, [windowWidth]);

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <div className='related-container' ref={elementRef} id='related'>
      <div className="related-products-header">RELATED PRODUCTS</div>
      <RelatedProducts relatedContainerWidth={relatedContainerWidth} currentProduct={props.data.product} addToOutfit={props.addToOutfit} yourOutfit={props.yourOutfit} relatedProducts={props.data.relatedProducts} generateStars={props.generateStars} />
      <div className="your-outfit-header">YOUR OUTFIT</div>
      <YourOutfit
        relatedContainerWidth={relatedContainerWidth}
        objID={props.objID}
        product={props.data.product}
        styles={props.data.styles}
        avgRatings={props.data.avgRatings}
        yourOutfit={props.yourOutfit}
        addToOutfit={props.addToOutfit}
        removeFromOutfit={props.removeFromOutfit}
        generateStars={props.generateStars}
      />
    </div>
  );
};

export default Related;