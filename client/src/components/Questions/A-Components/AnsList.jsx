import React, { useState, useEffect } from 'react';
import questionAPI from '../../../API/Questions.js';
import Answer from './Answer.jsx';
import MoreAns from './MoreAns.jsx';

const AnsList = (props) => {
  let [answers, setAnswers] = useState([]);

  useEffect(() => {
    questionAPI.getAllAnswers(props.q_ID)
      .then(results => {
        setAnswers(results);
      })
      .catch(err => console.log(err));
  }, [props.q_ID]);

  return (
    <div id="answers-container">
      <div>
        {answers.map((a, idx) => {
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
      <MoreAns />
    </div>
  )
}

export default AnsList;