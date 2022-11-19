import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useSearchParams
} from "react-router-dom";
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Ratings from './Ratings/Ratings.jsx';
import Related from './Related/Related.jsx';
import '../style.css';

const App = () => {
  let localURL = window.location.href.split('/')
  let id = localURL[localURL.length - 1];

  return (
    <Router>
      <h1>App.jsx</h1>
      <Overview objID={id}/>
      <Questions objID={id}/>
      <Ratings objID={id}/>
      <Related objID={id}/>
    </Router>
  )
}

export default App;