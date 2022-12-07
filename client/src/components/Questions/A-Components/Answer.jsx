import React, { useState, useEffect } from 'react';
import { parseISO, lightFormat } from 'date-fns';

const Answer = (props) => {
  let [date, setDate] = useState()

  useEffect(() => {
    // var Date = parseISO(props.date);
    // var str = lightFormat(date, 'd, y');
    // setDate(parseISO(str)); IDK
  })

  return (
    <div id="answer-container">
      <h1>A: {props.body}</h1>
      <p>{props.name}, {date}</p>
    </div>
  )
}

export default Answer;