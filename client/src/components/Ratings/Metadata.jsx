import React from 'react';
import hf from './helperFunctions.js'

let Metadata = (props) => {
  console.log(props.meta)
  let averageRating = hf.calculateAverageReviews(props.meta.ratings);
  let rec = hf.calculateRecommended(props.meta.recommended);
  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className='heading'>
        <h4>{averageRating}</h4>
        <div className='average-ratings-holder'>
          {props.generateStars(averageRating)}
        </div>
      </div>
      <p className='recommended'>{rec}% of users recommend this product.</p>
    </div>
  )
}

export default Metadata;