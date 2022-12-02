import React from 'react';
import hf from './helperFunctions.js'

let Metadata = (props) => {
  console.log(props.meta.ratings)
  console.log(hf.calculateAverageReviews(props.meta.ratings))
  return (
    <div>
      <h3>Ratings and Reviews</h3>

      <div className='heading'>
        <h4>Rating</h4>
        <div className='average-ratings-holder'>
          {props.generateStars(hf.calculateAverageReviews(props.meta.ratings))}
        </div>
      </div>
    </div>
  )
}

export default Metadata;