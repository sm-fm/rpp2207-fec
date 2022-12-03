import React, { useState, useEffect } from 'react';
import AnsList from '../A-Components/AnsList.jsx';

const Question = (props) => {
  return (
    <div id="question-container">
      <h1>Q: {props.body}</h1>
      <div>

      </div>
    </div>
  )
}

export default Question;