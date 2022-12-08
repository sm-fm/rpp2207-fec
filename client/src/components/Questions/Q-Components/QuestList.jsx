import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import MoreQuest from './MoreQuest.jsx';

const QuestList = (props) => {
  let [questions, setQuestions] = useState([]);
  let [rendered, setRendered] = useState([]);

  useEffect(() => {
    setQuestions(props.questions);
    if (props.questions.length > 2) {
      setRendered([ props.questions[0], props.questions[1] ]);
    } else {
      setRendered(props.questions);
    }
  }, [props.questions]);

  console.log(rendered);

  return (
    <div id="questions-container">
      <div>
        {rendered.map((q, idx) => {
          return (
            <Question
              key={idx}
              q_ID={q.question_id}
              body={q.question_body}
              date={q.question_date}
              helpful={q.question_helpfulness}
              name={q.asker_name}
              answers={q.answers}
            />
          );
        })}
      </div>
      {rendered.length < questions.length ?
        <button id="more-q-btn"> More Questions </button>
      : null}
    </div>
  )
}

export default QuestList;