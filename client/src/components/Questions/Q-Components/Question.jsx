import React, { useState, useEffect } from 'react';
import AnsList from '../A-Components/AnsList.jsx';
import HelpReport from '../HelpReport.jsx';

const Question = (props) => {
  return (
    <div className="question-container">
      <h1><strong>Q: </strong>{props.body}</h1>
      <button id="add-ans" className="btn"> Add an Answer </button>
      <HelpReport
        val={props.q_ID}
        type={'questions'}
        helpful={props.helpful}
      />
      <div>
        <AnsList q_ID={props.q_ID}/>
      </div>
    </div>
  )
}

export default Question;