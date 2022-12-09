import React, { useState, useEffect } from 'react';

const AnsForm = () => {
  let [answer, setAnswer] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');

  function handleChange(type, val) {
    if (type === 'ans') { setAnswer(val); }
    if (type === 'name') { setName(val); }
    if (type === 'email') { setEmail(val); }
  }

  return (
    <div className="form">
      <header id="form-header">
        <h1 id="form-title">Submit Your Answer</h1>
        <h2 id="form-subtitle">ITEM_NAME_HERE: QUESTION_BODY_HERE</h2>
      </header>
      <div id="form-body">
        <div id="form-question">
          <h3 id="form-label">Your Answer</h3>
          <input
            id="form-box"
            onChange={(e) => handleChange('ans', e.target.value)}
          />
        </div>
        <div id="form-question">
          <h3 id="form-label">What is your nickname?</h3>
          <input
            id="form-input"
            placeholder="Example: jack543!"
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <p id="form-below">For privacy reasons don't use your full name or email address</p>
        </div>
        <div id="form-question">
          <h3 id="form-label">Your email</h3>
          <input
            id="form-input"
            placeholder="Example: jack@email.com"
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <p id="form-below">For authentication reasons, you will not be emailed</p>
        </div>
        <div id="form-photos">
          <button id="form-upload">Upload Photo</button>
          /* onClick will open a second modal where you will input your link */
        </div>
      </div>
      <button id="form-submit">Submit</button>
    </div>
  )
}

export default AnsForm;