import React from 'react';
import HelpReport from '../HelpReport.jsx';
import { format } from 'date-fns';

const Answer = ({ date, body, photos, name, answerId, helpful, openModal }) => {
  const _date = format(new Date(date), 'MMM d, y');

  return (
    <div className="answer-container">
      <h1><strong>A: </strong>{body}</h1>
      <div className="thumbnail-container">
        {photos.map((photo, idx) => {
          return (
            <img
              key={idx}
              onClick={() => openModal(photo)}
              className="thumbnail"
              src={photo}
              alt=""
            />
          );
        })}
      </div>
      <span className="a-details">
        {name === 'Seller' ?
          <p id="a-name"><strong>{name}, </strong></p>
          : <p id="a-name">{name}, </p>}
        <p id="a-date">{_date}</p>
        <HelpReport
          val={answerId}
          type={'answers'}
          helpful={helpful}
        />
      </span>
    </div>
  );
};

export default Answer;