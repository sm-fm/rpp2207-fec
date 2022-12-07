import React, { useState, useEffect } from 'react';
import SpecificSize from './SpecificSize.jsx';
import { v4 as uuidv4 } from 'uuid';

const SizeSelector = (props) => {
  const [open, setOpen] = useState(false);
  const [defaultVal, setDefaultVal] = useState('Select a size');

  useEffect(() => {
    Object.keys(props.skus)[0] === 'null' ? setDefaultVal('OUT OF STOCK') : null;
  });

  if (defaultVal === 'OUT OF STOCK') {
    return (
    <div className="size-selector">
      <select name="sizes" className="sizes">
        <option value={defaultVal} disabled>{defaultVal}</option>
      </select>
    </div>
  );
  } else {
    return (
      <div className="size-selector">
        <select name="sizes" className="sizes">
          <option value={defaultVal}>{defaultVal}</option>
          {Object.keys(props.skus).map(sku => {
            return <SpecificSize
              size={props.skus[sku].size}
              key={uuidv4()}
              setDefaultVal={setDefaultVal} />
          })}
        </select>
      </div>
    );
  }
};

export default SizeSelector;