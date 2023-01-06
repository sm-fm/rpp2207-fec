import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SpecificStyle from './SpecificStyle.jsx';

const StyleSelector = (props) => {
  return props.chosenStyle && props.styles ?
    (<div>
      <div id="style-info" data-testid="style-info">
        {props.chosenStyle.sale_price
          ?
          <>
            <h3 className="original-price" data-testid="o-price">${props.chosenStyle.original_price}</h3>
            <h3 className="sale-price" data-testid="s-price">${props.chosenStyle.sale_price}</h3>
          </>
          : <h3 className="o-price-original">${props.chosenStyle.original_price}</h3>}
        <div className="style-name-info">
          <h3 className="style-text">STYLE</h3>
          <h3 className="carrot">{'>'}</h3>
          <h3 className="style-name">{props.chosenStyle.name}</h3>
        </div>
      </div>
      <div id="style-icons">
        {props.styles.map(style => {
          return <SpecificStyle
            style={style}
            setChosenStyle={props.setChosenStyle}
            key={uuidv4()}
            styleClicked={props.styleClicked}
            setStyleClicked={props.setStyleClicked}
            setSkus={props.setSkus} />;
        })}
      </div>
    </div>)
    : null;

};

export default StyleSelector;