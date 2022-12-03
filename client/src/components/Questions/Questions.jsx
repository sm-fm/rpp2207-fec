import React, { useState, useEffect } from 'react';
import QuestionAPI from '../../API/Questions.js';
import Search from './Search.jsx';
import QuestList from './Q-Components/QuestList.jsx';
import exampleQuestion from './exData.js';

const Questions = (props) => {
  let [product, setProduct] = useState(props.objID);
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    QuestionAPI.getAllQuestions(product)
      .then(results => {
        setQuestions(questions);
      })
    setQuestions(exampleQuestion.results);
  }, [])

  return (
    <div id="qna-container">
      <h1 id="qna-title">Questions & Answers</h1>
      <Search />
      <QuestList questions={questions}/>
    </div>
  )
}

export default Questions;