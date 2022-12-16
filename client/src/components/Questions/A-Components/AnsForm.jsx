import React, { useState } from 'react';

const AnsForm = ({ closeForm }) => {
  let [answer, setAnswer] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [photos, setPhotos] = useState([]);

  var handleChange = (type, val) => {
    if (type === 'ans') { setAnswer(val); }
    if (type === 'name') { setName(val); }
    if (type === 'email') { setEmail(val); }
    if (type === 'photo') { setPhotos([...photos, val]); }
  };

  var submit = () => {
    var data = {
      body: answer,
      name: name,
      email: email,
      photos: photos
    };
    return data;
  };

  return (
    <div className="form">
      <header className="form-header">
        <button id="form-close" className="btn" onClick={closeForm}>X</button>
        <h1 id="form-title">Submit Your Answer</h1>
        <h2 id="form-subtitle">ITEM_NAME_HERE: QUESTION_BODY_HERE</h2>
      </header>
      <div className="form-body">
        <div id="form-question">
          <h3 id="form-label">Your Answer</h3>
          <textarea
            id="form-box"
            placeholder="1000 character limit"
            onChange={(e) => handleChange('ans', e.target.value)}
            maxLength="1000"
          />
        </div>
        <div id="form-question">
          <h3 id="form-label">What is your nickname?</h3>
          <input
            id="form-input"
            placeholder="Example: jack543!"
            onChange={(e) => handleChange('name', e.target.value)}
            maxLength="60"
          />
          <p id="form-below">{'For privacy reasons don\'t use your full name or email address'}</p>
        </div>
        <div id="form-question">
          <h3 id="form-label">Your email</h3>
          <input
            id="form-input"
            placeholder="Example: jack@email.com"
            onChange={(e) => handleChange('email', e.target.value)}
            maxLength="60"
          />
          <p id="form-below">For authentication reasons, you will not be emailed</p>
        </div>
        <div id="form-photos">
          {photos.length < 5 ?
            <button id="form-upload" className="btn">Upload Photo</button>
            : null}
          {/* onClick will open a second modal where you will input your link */}
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

export default AnsForm;