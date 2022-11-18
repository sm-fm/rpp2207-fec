import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import Questions from './Questions.jsx';
import Ratings from './Ratings.jsx';
import Related from './Related.jsx';
import '../style.css';

const App = () => {
  return (
    <>
      <h1>App.jsx</h1>
      <Overview />
      <Questions />
      <Ratings />
      <Related />
    </>
  )
}

export default App;