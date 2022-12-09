import React, { useState, useEffect } from 'react';
import questionAPI from '../../API/Questions.js';
import Search from './Search.jsx';
import QuestList from './Q-Components/QuestList.jsx';

const Questions = (props) => {
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    questionAPI.getAllQuestions(props.objID)
      .then(results => {
        setQuestions(results);
      })
      .catch(err => console.log(err));
  }, [props.objID]);

  return (
    <div id="qna" className="qna-container">
      <h1 className="qna-title">Q & A</h1>
      <Search />
      <QuestList questions={questions} length={questions.length}/>
    </div>
  )
}

export default Questions;