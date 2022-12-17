import React from 'react';
import HelpReport from '../HelpReport.jsx';
import { format } from 'date-fns';

const Answer = (props) => {
  var date = new Date(props.date);
  date = format(date, 'MMM d, y');

  return (
    <div className="answer-container">
      <h1><strong>A: </strong>{props.body}</h1>
      <div className="thumbnail-container">
        {props.photos.map((photo, idx) => {
          return (
            <img
              key={idx}
              className='thumbnail'
              src={photo.url}
              alt={''}
            />
          );
        })}
      </div>
      <span className="a-details">
        {props.name === 'Seller' ?
          <p id="a-name"><strong>{props.name}, </strong></p>
          : <p id="a-name">{props.name}, </p>}
        <p id="a-date">{date}</p>
        <HelpReport
          val={props.a_ID}
          type={'answers'}
          helpful={props.helpful}
        />
      </span>
    </div>
  );
};

export default Answer;