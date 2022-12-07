import React from 'react';
import ReviewRectangle from './reviewRect.jsx';

let Metarating = (props) => {
  var ratings = props.manipulateShape(props.data);
  console.log(props)
  return (
    <div className='meta-rating'>
      <h3>Ratings break down</h3>
      {Object.values(ratings).map((val, idx) => {
        return (
          <div key={`rating-${idx + 1} stars`} className='individual-rating-bars'>
            <div className='rating-wrapper' onClick={props.useRatings}>
              <p style={{'paddingRight': '10px'}}>{idx + 1} stars</p>
              <ReviewRectangle idx={idx + 1} val={val}/>
              <p style={{'paddingLeft': '10px'}}>{val.votes} votes</p>
            </div>
          </div>

        );
      })}
    </div>
  );
};

export default Metarating;