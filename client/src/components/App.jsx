import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Ratings from './Ratings/Ratings.jsx';
import Related from './Related/Related.jsx';
import '../style.css';
let helperFunctions = require('./helperFunctions.js').helperFunctions;

const App = () => {
  const params = useParams();
  const id = params.id;
  const [yourOutfit, setYourOutfit] = useState([]);
  const addToOutfit = (product) => {
    setYourOutfit(yourOutfit => ([...yourOutfit, product]));
  }

  return (
    <>
      <h1>App.jsx</h1>
      <Overview objID={id} yourOutfit={yourOutfit} addToOutfit={addToOutfit}/>
      <Questions objID={id}/>
      <Ratings objID={id}/>
      <Related objID={id} yourOutfit={yourOutfit} addToOutfit={addToOutfit}/>
    </>
  )
}

export default App;