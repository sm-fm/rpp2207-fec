import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificStyle from './SpecificStyle.jsx';
import api from '../../../API/Overview.js';

const StyleSelector = (props) => {

  return (
    <div>
      <div id="style-info">
        {props.chosenStyle.sale_price
          ? <h3>{props.chosenStyle.sale_price}</h3>
          : <h3>{props.chosenStyle.original_price}</h3>}
        <h3>STYLE > {props.chosenStyle.name}</h3>
      </div>
      <div id="style-icons">
      {props.styles.map(style => {
        return <SpecificStyle style={style} allStyles={props.styles} setChosenStyle={props.setChosenStyle} key={uuidv4()} styleClicked={props.styleClicked} toggleClick={props.toggleClick} setMainImg={props.setMainImg} />
      })}
      </div>
    </div>
  )
};

export default StyleSelector;