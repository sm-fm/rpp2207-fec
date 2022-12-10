import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificStyle from './SpecificStyle.jsx';
import api from '../../../API/Overview.js';

const StyleSelector = (props) => {
<<<<<<< HEAD

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
        return <SpecificStyle
          style={style}
          setChosenStyle={props.setChosenStyle}
          key={uuidv4()}
          styleClicked={props.styleClicked}
          toggleClick={props.toggleClick} />
      })}
      </div>
    </div>
  )
=======
  return props.chosenStyle && props.styles ?
      (<div>
        <div id="style-info" data-testid="style-info">
          {props.chosenStyle.sale_price
            ? <h3>{props.chosenStyle.sale_price}</h3>
            : <h3>{props.chosenStyle.original_price}</h3>}
          <h3>STYLE > {props.chosenStyle.name}</h3>
        </div>
        <div id="style-icons">
        {props.styles.map(style => {
          return <SpecificStyle
            style={style}
            setChosenStyle={props.setChosenStyle}
            key={uuidv4()}
            styleClicked={props.styleClicked}
            toggleClick={props.toggleClick}
            setSkus={props.setSkus} />
        })}
        </div>
      </div>)
    : null

>>>>>>> size-selector
};

export default StyleSelector;