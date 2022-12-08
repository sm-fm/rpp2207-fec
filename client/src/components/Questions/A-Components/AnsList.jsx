import React, { useState, useEffect } from 'react';
import questionAPI from '../../../API/Questions.js';
import Answer from './Answer.jsx';
import MoreAns from './MoreAns.jsx';

const AnsList = (props) => {
  let [answers, setAnswers] = useState([]);
  let [rendered, setRendered] = useState([]);
  let [num, setNum] = useState(2);

  useEffect(() => {
    questionAPI.getAllAnswers(props.q_ID)
      .then(results => {
        setAnswers(results);
        if (results.length > 2) {
          setRendered([ results[0], results[1] ]);
        } else {
          setRendered(results);
          setNum(results.length);
        }
      })
      .catch(err => console.log(err));
  }, [props.q_ID]);

  function handleMore() {
    var temp = rendered;
    if (answers.length - rendered.length >= 2) {
      temp.push(answers[num]);
      temp.push(answers[num+1]);
      setNum(num+2);
    } else {
      temp.push(answers[num]);
      setNum(num+1);
    }
    setRendered(temp);
  };

  return (
    <div id="answers-container">
      <div>
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
        <button id="more-a-btn" onClick={handleMore}> More Answers </button>
      : null}
    </div>
  )
}

export default AnsList;