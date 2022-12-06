import React from 'react';
import hf from './helperFunctions.js';
import Metarating from './MetaRating.jsx';

let Metadata = (props) => {
  let stars = props.generateStars(averageRating);
  let averageRating = hf.calculateAverageReviews(props.meta.ratings);
  let rec = hf.calculateRecommended(props.meta.recommended);
  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className='heading'>
        <h4>{averageRating}</h4>
        <div className='average-ratings-holder'>
          {stars}
        </div>
      </div>
      <p className='recommended'>{rec}% of users recommend this product.</p>
      <Metarating data={props.meta.ratings} manipulateShape = {hf.manipulateRatings}/>

    </div>
  );
};

export default Metadata;