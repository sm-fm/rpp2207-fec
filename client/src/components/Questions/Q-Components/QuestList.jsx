import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import MoreQuest from './MoreQuest.jsx';

const QuestList = (props) => {
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(props.questions);
  })

  return (
    <div id="questions-container">
      {/* <h1>{questions.length}</h1> */}
      <div>
        {questions.map((q, idx) => {
          return (
            <Question key={idx} body={q.question_body}/>
          );
        })}
      </div>
      <Question />
      <MoreQuest />
    </div>
  )
}

export default QuestList;