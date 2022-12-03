import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import './rating.css';

let ReviewCard = (props) => {
  // May want to refactor this to happen before the data is returned to this component
  //   could have the date object inside data already have this work done.
  // Could even do this with the body - could send an already shortened portion of the body
  var date = new Date(props.data.date);
  date = format(date, 'MMM d, y');

  const [displayFullBody, setDisplay] = useState(false);
  let shortBody;
  if (props.data.body.length > 250) {
    shortBody = props.data.body.slice(0, 250) + '...';
  } else {
    shortBody = props.data.body;
  }
  let renderBody = null;
  if (displayFullBody) {
    renderBody = props.data.body;
  } else {
    renderBody = shortBody;
  }
  return (
    <div className = 'userReview'>
      <div className='flex-box'>
        <div className='starHolder'>
          {props.generateStars(props.data.rating, 'userReview')}
        </div>
        <h6 id='username'>{`${props.data.reviewer_name}, ${date}`}</h6>
      </div>
      <h3 className='summary'>{props.data.summary}</h3>
      <p className='reviewBody'>{renderBody}</p>
      {!displayFullBody  &&
        <p onClick={() => setDisplay(!displayFullBody)}>Show more.</p>}
        {/* Currently there is no function to display LESS - I think we should implement this too */}
      {props.data.recommend &&
        <p>✓ I recommend this product</p>}
      {props.data.response !== '' &&
        <p className='companyResponse'>{props.data.response}</p>}
      <h6>Helpful? <u>Yes</u> {`(${props.data.helpfulness})`} | <u>Report</u></h6>

      <div className='thumbnail-holder'>
        {props.data.photos.map((element, idx) => {
          return (
            <img key={`${props.data.reviewer_name} image - ${idx + 1}`} className='thumbnail' src={element.url} alt={`${props.data.reviewer_name} image - ${idx + 1}`}/>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewCard;