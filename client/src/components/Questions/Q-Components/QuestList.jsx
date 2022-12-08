import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import MoreQuest from './MoreQuest.jsx';

const QuestList = (props) => {
  let [questions, setQuestions] = useState([]);
  let [rendered, setRendered] = useState([]);
  let [num, setNum] = useState(2);

  useEffect(() => {
    setQuestions(props.questions);
    if (props.questions.length > 2) {
      setRendered([ props.questions[0], props.questions[1] ]);
    } else {
      setRendered(props.questions);
      setNum(props.questions.length);
    }
  }, [props.questions]);

  function handleMore() {
    var temp = rendered;
    if (questions.length - rendered.length >= 2) {
      temp.push(questions[num]);
      temp.push(questions[num+1]);
      setNum(num+2);
    } else {
      temp.push(questions[num]);
      setNum(num+1);
    }
    setRendered(temp);
  };

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
        <button id="more-q-btn" onClick={handleMore}> More Questions </button>
      : null}
    </div>
  )
}

export default QuestList;