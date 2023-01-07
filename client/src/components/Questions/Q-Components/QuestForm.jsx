import React, { useState } from 'react';
import questionAPI from '../../../API/Questions.js';

const QuestForm = ({ closeForm, itemName, productId }) => {
  let [question, setQuestion] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [valid, setValid] = useState(true);

  var handleChange = (type, val) => {
    if (type === 'quest') { setQuestion(val); }
    if (type === 'name') { setName(val); }
    if (type === 'email') { setEmail(val); }
  };

  var submit = () => {
    if (question === '' || name === '' || email === '') {
      setValid(false);
    } else {
      console.log(productId);
      var data = {
        'product_id': parseInt(productId),
        body: question,
        name: name,
        email: email
      };
      questionAPI.addQuestion(data);
      closeForm();
    }
  };

  return (
    <div className="form">
      <header className="form-header">
        <button
          id="form-close"
          className="btn"
          onClick={closeForm}
        >X</button>
        <h1 id="form-title">Ask Your Question</h1>
        <h2 id="form-subtitle">About the {itemName}</h2>
      </header>
      <div className="form-body">
        {!valid ?
          <div id="invalid-form">
            You must enter the following
            {question === '' ? <p id="invalid-text">Your Question</p> : null}
            {name === '' ? <p id="invalid-text">What is your nickname?</p> : null}
            {email === '' ? <p id="invalid-text">Your email</p> : null}
          </div>
          : null}
        <div id="form-question">
          <h3 id="form-label">Your Question</h3>
          <textarea
            id="form-box"
            placeholder="1000 character limit"
            onChange={(e) => handleChange('quest', e.target.value)}
            maxLength="1000"
          />
        </div>
        <div id="form-question">
          <h3 id="form-label">What is your nickname?</h3>
          <input
            id="form-input"
            placeholder="Example: jackson11!"
            onChange={(e) => handleChange('name', e.target.value)}
            maxLength="60"
          />
          <p id="form-below">{'For privacy reasons don\'t use your full name or email address'}</p>
        </div>
        <div id="form-question">
          <h3 id="form-label">Your email</h3>
          <input
            id="form-input"
            placeholder="Why did you like the product or not?"
            onChange={(e) => handleChange('email', e.target.value)}
            maxLength="60"
          />
          <p id="form-below">For authentication reasons, you will not be emailed</p>
        </div>
      </div>
      <footer className="form-footer">
        <button
          id="form-submit"
          className="btn"
          onClick={submit}
        >Submit</button>
      </footer>
    </div>
  );
};

export default QuestForm;