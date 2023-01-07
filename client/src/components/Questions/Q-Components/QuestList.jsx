import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';

const QuestList = ({ questions, openForm, openModal }) => {
  let [rendered, setRendered] = useState([]);

  var handleCollapse = () => { setRendered([ questions[0], questions[1] ]); };
  var handleMore = () => {
    let rl = rendered.length;
    let ql = questions.length;
    setRendered(ql - rl > 2 ? [...rendered, questions[rl], questions[rl + 1]] : questions);
  };

  useEffect(() => {
    setRendered(questions.length > 2 ? [questions[0], questions[1]] : questions);
  }, [questions]);

  return (
    <div id="q-content">
      <div id ="q-list" className="list-container">
        {rendered.map((q, idx) => {
          return (
            <Question
              key={idx}
              idx={idx}
              questionId={q.question_id}
              body={q.question_body}
              date={q.question_date}
              helpful={q.question_helpfulness}
              name={q.asker_name}
              answers={q.answers}
              openForm={openForm}
              openModal={openModal}
            />
          );
        })}
      </div>
      <div className="q-btn-wrapper">
        {rendered.length < questions.length ?
          <button id="more-q" className="btn" onClick={handleMore}> More Questions </button>
          : null}
        {rendered.length > 2 ?
          <button id="collapse-q" className="btn" onClick={handleCollapse}> Collapse Questions </button>
          : null}
        <button id="add-q" className="btn" onClick={ () => openForm(-2) }>Ask a Question +</button>
      </div>
    </div>
  );
};

export default QuestList;