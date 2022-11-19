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
let helperFunctions = require('./helperFunctions.js').helperFunctions;

const App = () => {
  let id = helperFunctions.getIDFromURL(window.location.href);

  console.log(id)
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