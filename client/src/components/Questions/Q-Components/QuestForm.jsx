import React, { useState, useEffect } from 'react';

const QuestForm = () => {
  let [question, setQuestion] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');

  function handleChange(type, val) {
    if (type === 'quest') { setQuestion(val); }
    if (type === 'name') { setName(val); }
    if (type === 'email') { setEmail(val); }
  }

  return (
    <div className="form">
      <header id="form-header">
        <h1 id="form-title">Ask Your Question</h1>
        <h2 id="form-subtitle">About the ITEM_NAME_HERE</h2>
      </header>
      <div id="form-body">
        <div id="form-question">
          <h3 id="form-label">Your Question</h3>
          <input
            id="form-box"
            onChange={(e) => handleChange('quest', e.target.value)}
          />
        </div>
        <div id="form-question">
          <h3 id="form-label">What is your nickname?</h3>
          <input
            id="form-input"
            placeholder="Example: jackson11!"
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <p id="form-below">For privacy reasons don't use your full name or email address</p>
        </div>
        <div id="form-question">
          <h3 id="form-label">Your email</h3>
          <input
            id="form-input"
            placeholder="Why did you like the product or not?"
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <p id="form-below">For authentication reasons, you will not be emailed</p>
        </div>
      </div>
      <button id="form-submit">Submit</button>
    </div>
  )
}

export default QuestForm;