import React, {useState} from 'react';
import ReviewRectangle from './reviewRect.jsx';

let Metarating = (props) => {
  var ratings = props.manipulateShape(props.data);

  let [ratingsList, setRatingsList] = useState([]);
  let [errMsg, setErrMsg] = useState('');

  let trackRatings = (e) => {
    props.useRatings(e)
      .then(data => {
        let newList = data || [];
        newList.sort();
        setRatingsList(newList);
        setErrMsg('');
      })
      .catch(err => {
        console.log(err);
        setErrMsg('There was an error when trying to filter the data, please try again later.');
      });
    // setRatingsList();
  };

  let resetFilters = (e) => {
    props.useRatings(e)
      .then(() => {
        setRatingsList([]);
      });
  };

  return (
    <div className='meta-rating'>
      {errMsg !== '' &&
      <p className='errorMsg'>{errMsg}</p>}
      {ratingsList.length !== 0 &&
      <>
        {ratingsList.map((val, idx) => {
          return (
            <button key={'rating-preview-list' + idx} id={val} onClick={trackRatings}>{val}</button>
          );
        })}
        <button className= 'reviews-reset-filter' key='reset-ratings-preview-list' id='resetRatingsFilters' onClick={resetFilters}>Reset Filters</button>
      </>


      }
      {Object.values(ratings).map((val, idx) => {
        return (
          <div key={`rating-${idx + 1} stars`} className='individual-rating-bars'>
            <div className='rating-wrapper' onClick={props.useRatings}>
              <p style={{'paddingRight': '10px'}} className='star-number'><u>{idx + 1} stars</u></p>
              <ReviewRectangle idx={idx + 1} val={val} ratings = {trackRatings} width={'175px'} height={'8px'}/>
              <p style={{'paddingLeft': '10px'}} className='star-number'>{val.votes} votes</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Metarating;