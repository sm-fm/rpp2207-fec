import React from 'react';

let Metarating = (props) => {
  var ratings = props.manipulateShape(props.data);
  console.log(Object.values(ratings));
  return (
    <div className='meta-rating'>
      <h3>Ratings break down</h3>
      {Object.values(ratings).map((val, idx) => {
        return (
          <div key={`rating-${idx + 1} stars`} className='individual-rating-bars'>
            <div className='rating-wrapper'>
              <p>{idx + 1} stars</p>

              <svg width='100px' height='10px'>
                <linearGradient id={`Gradient${idx + 1}`}>
                  <stop offset="0%" stopColor="rgb(60, 201, 107)" />
                  <stop offset={`${val.ratio * 100}%`} stopColor="rgb(60, 201, 107)" stopOpacity="1" />
                  <stop offset={`${val.ratio}%`} stopColor="rgb(213, 216, 222)" />
                  <stop offset="100%" stopColor="rgb(213, 216, 222)" stopOpacity="1" />
                </linearGradient>
                <rect width='100px' height='10px' fill={`url(#Gradient${idx + 1})`}/>
              </svg>
              <p>{val.votes} votes</p>
            </div>
          </div>

        );
      })}
    </div>
  );
};

export default Metarating;