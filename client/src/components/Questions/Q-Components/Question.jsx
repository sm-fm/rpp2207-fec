import React from 'react';
import AnsList from '../A-Components/AnsList.jsx';
import HelpReport from '../HelpReport.jsx';

const Question = ({ body, questionId, helpful, answers, openForm, openModal, idx }) => {
  return (
    <div className="question-container">
      <h1><strong>Q: </strong>{body}</h1>
      <button
        id="add-ans"
        className="btn"
        onClick={() => openForm(idx)}
      > Add an Answer </button>
      <HelpReport
        val={questionId}
        type={'questions'}
        helpful={helpful}
      />
      <div>
        <AnsList mixedAns={answers} openModal={openModal}/>
      </div>
    </div>
  );
};

export default Question;