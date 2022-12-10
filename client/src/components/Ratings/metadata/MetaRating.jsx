import React, {useState} from 'react';
import ReviewRectangle from './reviewRect.jsx';

let Metarating = (props) => {
  var ratings = props.manipulateShape(props.data);

  let [ratingsList, setRatingsList] = useState([]);

  let trackRatings = (e) => {
    props.useRatings(e)
      .then(() => {
        let holder;
        if (!ratingsList.includes(e.target.id)) {
          holder = [...ratingsList, e.target.id];
          holder.sort();
          setRatingsList(holder);
        } else {
          holder = JSON.parse(JSON.stringify(ratingsList));
          holder.splice(holder.indexOf(e.target.id), 1);
          holder.sort();
          setRatingsList(holder);
        }
      });
  };

  let resetFilters = (e) => {
    props.useRatings(e)
      .then(() => {
        setRatingsList([]);
      });
  };

  return (
    <div className='meta-rating'>
      <h3>Ratings break down</h3>
      {ratingsList.length !== 0 &&
      [<p key='rating-preview-list' id='ratingsList'>{ratingsList.join(', ')}</p>,
        <p key='reset-ratings-preview-list' id='resetRatingsFilters' onClick={resetFilters}>Reset Filters</p>
      ]

      }
      {Object.values(ratings).map((val, idx) => {
        return (
          <div key={`rating-${idx + 1} stars`} className='individual-rating-bars'>
            <div className='rating-wrapper' onClick={props.useRatings}>
              <p style={{'paddingRight': '10px'}}>{idx + 1} stars</p>
              <ReviewRectangle idx={idx + 1} val={val} ratings = {trackRatings}/>
              <p style={{'paddingLeft': '10px'}}>{val.votes} votes</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Metarating;