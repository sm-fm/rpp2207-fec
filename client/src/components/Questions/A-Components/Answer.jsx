import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Answer = (props) => {
  var date = new Date(props.date);
  date = format(date, 'MMM d, y');

  return (
    <div id="answer-container">
      <h1>A: {props.body}</h1>
      <p>{props.name}, {date}</p>
    </div>
  )
}

export default Answer;