import React, { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import overviewAPI from '../../API/Overview.js';
import relatedAPI from '../../API/Related.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './related.css';

const Related = (props) => {
  const [relatedProducts, setRelatedProducts] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({});
  const [relatedContainerWidth, setRelatedContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const elementRef = useRef(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    relatedAPI.getRelatedProducts(props.objID)
      .then((products) => {
        var productsMap = new Map();
        products.forEach(product => productsMap.set(product.id, product));
        setRelatedProducts([...productsMap.values()]);
      });
    overviewAPI.getProductById(props.objID)
      .then((result) => {
        return result.json();
      })
      .then((product) => {
        setCurrentProduct(product);
      });
  }, [props.objID]);

  useEffect(() => {
    setRelatedContainerWidth(elementRef.current.getBoundingClientRect().width);
  }, [windowWidth]);

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 300);

    window.addEventListener('resize', debouncedHandleResize);

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <div className='related-container' ref={elementRef}>
      {console.log('related-container width: ', relatedContainerWidth)}
      {console.log('window width: ', windowWidth)}
      <div className="related-products-header">RELATED PRODUCTS</div>
      <RelatedProducts
        relatedContainerWidth={relatedContainerWidth}
        currentProduct={currentProduct}
        addToOutfit={props.addToOutfit}
        yourOutfit={props.yourOutfit}
        relatedProducts={relatedProducts}
        generateStars={props.generateStars}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
      <div className="your-outfit-header">YOUR OUTFIT</div>
      <YourOutfit
        relatedContainerWidth={relatedContainerWidth}
        objID={props.objID}
        yourOutfit={props.yourOutfit}
        addToOutfit={props.addToOutfit}
        removeFromOutfit={props.removeFromOutfit}
        generateStars={props.generateStars}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
    </div>
  );
};

export default Related;