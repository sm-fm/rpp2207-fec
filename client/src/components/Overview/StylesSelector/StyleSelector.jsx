import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificStyle from './SpecificStyle.jsx';
import api from '../../../API/Overview.js';

const StyleSelector = (props) => {
  const [allStyles, setAllStyles] = useState([]);
  const [specificStyle, setSpecificStyle] = useState([]);
  return (
    <div id="style-selector">
      {props.chosenStyle.sale_price
        ? <h3>{props.chosenStyle.sale_price}</h3>
        : <h3>{props.chosenStyle.original_price}</h3>}
      <h3>STYLE > {props.chosenStyle.name}</h3>
      {props.styles.map(style => {
        return <SpecificStyle style={style} key={uuidv4()} />
      })}
    </div>
  )
};

export default StyleSelector;