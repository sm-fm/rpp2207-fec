import React, { useState } from 'react';
import questionAPI from '../../../API/Questions.js';

const AnsForm = ({ closeForm, itemName, questionBody, questionId }) => {
  let [answer, setAnswer] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [img, setImg] = useState('');
  let [photos, setPhotos] = useState([]);
  let [valid, setValid] = useState(true);
  let [upload, setUpload] = useState(false);

  var handleChange = (type, val) => {
    if (type === 'ans') { setAnswer(val); }
    if (type === 'name') { setName(val); }
    if (type === 'email') { setEmail(val); }
    if (type === 'img') { setImg(val); }
    if (type === 'photo') { setPhotos([...photos, val]); }
  };

  var submit = () => {
    if (answer === '' || name === '' || email === '') {
      setValid(false);
    } else {
      var data = {
        body: answer,
        name: name,
        email: email,
        photos: photos
      };
      questionAPI.addAnswer(questionId, data);
      closeForm();
    }
  };

  var uploadControl = () => {
    if (upload) {
      handleChange('photo', img);
      setUpload(false);
    } else {
      setUpload(true);
    }
  };

  return (
    <div className="form">
      <header className="form-header">
        <button id="form-close" className="btn" onClick={closeForm}>X</button>
        <h1 id="form-title">Submit Your Answer</h1>
        <h2 id="form-subtitle">{itemName}</h2>
        <h2 id="form-subtitle">{questionBody}</h2>
      </header>
      <div className="form-body">
        {!valid ?
          <div id="invalid-form">
            You must enter the following
            {answer === '' ? <p id="invalid-text">Your Answer</p> : null}
            {name === '' ? <p id="invalid-text">What is your nickname?</p> : null}
            {email === '' ? <p id="invalid-text">Your email</p> : null}
          </div>
          : null}
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
        {upload ?
          <input
            id="form-input"
            placeholder="URL"
            onChange={(e) => handleChange('img', e.target.value)}
          ></input>
          : null}
        {photos.length < 5 ?
          <button id="form-upload"
            className="btn"
            onClick={uploadControl}
          >{upload ? 'Upload' : 'Upload Photos'}</button>
          : null}
        <div id="form-photos">
          {photos.map((photo, idx) => {
            return (
              <img
                key={idx}
                className="thumbnail"
                src={photo}
                alt=""
              />
            );
          })}
        </div>
        {}
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