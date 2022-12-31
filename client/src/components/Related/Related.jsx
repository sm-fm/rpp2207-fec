import React, { useState, useEffect } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './related.css';

const Related = (props) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    props.data.product.styles = {};
    props.data.product.styles.results = props.data.styles;
  }, [props.data]);

  return (
    <div className='related-container'>
      <div className="related-products-header">RELATED PRODUCTS</div>
      <RelatedProducts currentProduct={props.data.currentProduct} addToOutfit={props.addToOutfit} yourOutfit={props.yourOutfit} relatedProducts={props.data.relatedProducts} generateStars={props.generateStars} isFetching={isFetching}setIsFetching={setIsFetching} />
      <div className="your-outfit-header">YOUR OUTFIT</div>
      <YourOutfit
        objID={props.objID}
        product={props.data.product}
        styles={props.data.styles}
        avgRatings={props.data.avgRatings}
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