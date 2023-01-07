import React, { useState } from 'react';
import Search from './Search.jsx';
import QuestList from './Q-Components/QuestList.jsx';
import AnsForm from './A-Components/AnsForm.jsx';
import QuestForm from './Q-Components/QuestForm.jsx';
import './qna.css';

const Questions = (props) => {
  var data = props.data;
  let [questions, setQuestions] = useState(data.questions);
  let [form, setForm] = useState(-1);
  let [modal, setModal] = useState('');

  var handleSearch = (term) => {
    var results = data.questions.filter(q => {
      return q.question_body.toLowerCase().includes(term.toLowerCase());
    });
    setQuestions(results);
  };

  var openForm = (id) => { setForm(id); };
  var closeForm = () => { setForm(-1); };

  var openModal = (imgUrl) => { setModal(imgUrl); };
  var closeModal = () => { setModal(''); };

  return (
    <div id="qna" className="qna-container">
      {form > -1 ?
        <AnsForm
          closeForm={closeForm}
          itemName={data.product.name}
          questionBody={questions[form].question_body}
          questionId={questions[form].question_id}
        /> : null
      }
      {form < -1 ?
        <QuestForm
          closeForm={closeForm}
          itemName={data.product.name}
          productId={data.id}
        /> : null
      }
      {modal ?
        <div className="modal-thumbnail-container">
          <button onClick={closeModal}
            className="btn"
            id="modal-btn"
          >X</button>
          <img
            className="modal-thumbnail"
            src={modal}
            alt=""
          />
        </div> : null
      }
      <h1 className="qna-title">Questions & Answers</h1>
      <Search handleSearch={handleSearch}/>
      <QuestList
        questions={questions}
        openForm={openForm}
        openModal={openModal}
      />
    </div>
  );
};

export default Questions;