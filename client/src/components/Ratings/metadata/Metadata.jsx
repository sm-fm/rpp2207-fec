import React from 'react';
import hf from '../helperFunctions.js';
import Metarating from './MetaRating.jsx';
import ProductBreakdown from './productBreakdown.jsx';

let Metadata = (props) => {
  let averageRating = hf.calculateAverageReviews(props.meta.ratings);
  let rec = hf.calculateRecommended(props.meta.recommended);
  return (
    <div className='metadata'>
      <h3>Ratings & Reviews</h3>
      <div className='heading'>
        <div className='average-rating'>
          <h4>{averageRating}</h4>
        </div>
        <div className='average-ratings-holder'>
          {props.generateStars(averageRating, 'metaDataHeader', 'rgb(80, 80, 80)', '15px')}
        </div>
      </div>
      <p className='recommended'>✓ {rec}% of users recommend this product.</p>
      <Metarating data={props.meta.ratings} manipulateShape = {hf.manipulateRatings} useRatings={props.useRatings}/>
      <ProductBreakdown data = {props.meta.characteristics}/>
    </div>
  );
};

export default Metadata;