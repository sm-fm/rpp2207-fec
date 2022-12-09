import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';

const QuestList = (props) => {
  let [questions, setQuestions] = useState([]);
  let [rendered, setRendered] = useState([]);
  let [num, setNum] = useState(2);

  useEffect(() => {
    setQuestions(props.questions);
    if (props.length >= 2) {
      setRendered([ props.questions[0], props.questions[1] ]);
      setNum(2);
    } else {
      setRendered(props.questions);
      setNum(1);
    }
  }, [props.questions, props.length]);

  function handleMore() {
    var tempArr = rendered;
    var tempNum = num;
    if (questions.length - rendered.length >= 2) {
      tempArr.push(questions[num]);
      tempArr.push(questions[num+1]);
      tempNum += 2;
    } else {
      tempArr.push(questions[num]);
      tempNum += 1;
    }
    setRendered(tempArr);
    setNum(tempNum);
  };

  function handleCollapse() {
    setRendered([ questions[0], questions[1] ]);
    setNum(2);
  };

  return (
    <div id="q-content">
      <div id ="q-list" className="list-container">
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
      <div className="q-btn-wrapper">
        {rendered.length < questions.length ?
          <button id="more-q" className="btn" onClick={handleMore}> More Questions </button>
        : null}
        {rendered.length === questions.length && num > 2 ?
          <button id="collapse-q" className="btn" onClick={handleCollapse}> Collapse Questions </button>
        : null}
        <button id="add-q" className="btn">Ask a Question +</button>
      </div>
    </div>
  )
}

export default QuestList;