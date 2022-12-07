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
      <MoreQuest />
    </div>
  )
}

export default QuestList;