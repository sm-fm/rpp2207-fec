import React, { useState, useEffect } from 'react';
import api from '../../API/Overview.js';

const Overview = (props) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!props.objID) {
      api.getAllProducts()
        .then(results => {
          setProducts(results[0]);
        })
        .catch(err => console.log(err));
    } else {
      api.getProductById(props.objID)
        .then(result => {
          setProducts(result);
        })
        .catch(err => console.log(err));
    }
  }, [])

  return (
    <div>
      <p>{products.id}</p>
      <p>{products.name}</p>
    </div>
  )
}

export default Overview;