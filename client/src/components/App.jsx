import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Ratings from './Ratings/Ratings.jsx';
import Related from './Related/Related.jsx';
import '../style.css';

const App = () => {
  return (
    <Router>
      <h1>App.jsx</h1>
      <Overview />
      <Questions />
      <Ratings />
      <Related />
    </Router>
  )
}

export default App;