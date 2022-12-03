import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import MoreAns from './MoreAns.jsx';

const AnsList = () => {
  return (
    <div id="answers-container">
      <h1>---> AnsList</h1>
      <Answer />
      <MoreAns />
    </div>
  )
}

export default AnsList;