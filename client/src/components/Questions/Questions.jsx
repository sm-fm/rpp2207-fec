import React, { useState, useEffect } from 'react';
import questionAPI from '../../API/Questions.js';
import Search from './Search.jsx';
import QuestList from './Q-Components/QuestList.jsx';
import AnsForm from './A-Components/AnsForm.jsx';
import QuestForm from './Q-Components/QuestForm.jsx';
import './qna.css';

const Questions = (props) => {
  let [data, setData] = useState([]);
  let [questions, setQuestions] = useState([]);
  let [onAns, setOnAns] = useState(false);
  let [onQuest, setOnQuest] = useState(false);


  useEffect(() => {
    questionAPI.getAllQuestions(props.objID)
      .then(results => {
        setData(results);
        setQuestions(results);
      })
      .catch(err => console.log(err));
  }, [props.objID]);

  var handleSearch = (term) => {
    var results = data.filter(q => {
      return q.question_body.toLowerCase().includes(term.toLowerCase());
    });
    setQuestions(results);
  };

  var openAnsForm = () => { setOnAns(true); };
  var closeAnsForm = () => { setOnAns(false); };

  var openQuestForm = () => { setOnQuest(true); };
  var closeQuestForm = () => { setOnQuest(false); };

  return (
    <div id="qna" className="qna-container">
      {onAns ?
        <AnsForm closeForm={closeAnsForm}/> : null
      }
      {onQuest ?
        <QuestForm closeForm={closeQuestForm}/> : null
      }
      <h1 className="qna-title">Q & A</h1>
      <Search handleSearch={handleSearch}/>
      <QuestList
        questions={questions}
        length={questions.length}
        openAnsForm={openAnsForm}
        openQuestForm={openQuestForm}
      />
    </div>
  );
};

export default Questions;