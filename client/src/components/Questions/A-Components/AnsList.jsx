import React, { useState, useEffect } from 'react';
import questionAPI from '../../../API/Questions.js';
import Answer from './Answer.jsx';

const AnsList = (props) => {
  let [answers, setAnswers] = useState([]);
  let [rendered, setRendered] = useState([]);
  let [num, setNum] = useState(2);

  useEffect(() => {
    questionAPI.getAllAnswers(props.q_ID)
      .then(results => {
        setAnswers(results);
        if (results.length >= 2) {
          setRendered([ results[0], results[1] ]);
          setNum(2);
        } else {
          setRendered(results);
          setNum(1);
        }
      })
      .catch(err => console.log(err));
  }, [props.q_ID]);

  function handleMore() {
    var tempArr = rendered;
    var tempNum = num;
    if (answers.length - rendered.length >= 2) {
      tempArr.push(answers[num]);
      tempArr.push(answers[num+1]);
      tempNum += 2;
    } else {
      tempArr.push(answers[num]);
      tempNum += 1;
    }
    setRendered(tempArr);
    setNum(tempNum);
  };

  function handleCollapse() {
    setRendered([ answers[0], answers[1] ]);
    setNum(2);
  };

  return (
    <div id="a-content" className="qna-container">
      <div id="a-list" className="list-container">
        {rendered.map((a, idx) => {
          return (
            <Answer
              key={idx}
              a_ID={a.answer_id}
              body={a.body}
              date={a.date}
              helpful={a.helpfulness}
              name={a.answerer_name}
              photos={a.photos}
            />
          );
        })}
      </div>
      {rendered.length < answers.length ?
        <button id="more-a" className="btn" onClick={handleMore}> More Answers </button>
      : null}
      {rendered.length === answers.length && num > 2 ?
        <button id="collapse-a" className="btn" onClick={handleCollapse}> Collapse Answers </button>
      : null}
    </div>
  )
}

export default AnsList;