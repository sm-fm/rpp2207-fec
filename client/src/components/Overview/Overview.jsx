import React, { useState, useEffect } from 'react';
import api from '../../API/Overview.js';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import Images from './ImageViews/Images.jsx';
import StyleSelector from './StylesSelector/StyleSelector.jsx';
import Cart from './Cart/Cart.jsx';

const Overview = (props) => {

  let [product, setProduct] = useState({});
  let [styles, setStyles] = useState([]);
  let [chosenStyle, setChosenStyle] = useState({});

  useEffect(() => {
    if (!props.objID) {
      api.getAllProducts()
        .then(results => {
          setProduct(results[0]);
          return api.getStylesById(results[0].id)
        })
        .then(styles => {
          setStyles(styles.results);
          setChosenStyle(styles.results[0]);
        })
        .catch(err => console.log(err));
    } else {
      api.getProductById(props.objID)
        .then(result => {
          setProduct(result);
          return api.getStylesById(results[0].id)
        })
        .then(styles => {
          console.log(styles);
          setStyles(styles.results);
          setChosenStyle(styles.results[0]);
        })
        .catch(err => console.log(err));
      }
  }, []);

  return (
    <div id="main-overview">
      <ProductInfo product={product} />
      <StyleSelector product={product} setChosenStyle={setChosenStyle} setStyles={setStyles} styles={styles} chosenStyle={chosenStyle} />
      <Images product={product} styles={styles} chosenStyle={chosenStyle} setChosenStyle={setChosenStyle} />
      <Cart product={product} />
      <p>{product.description}</p>
    </div>
  )
};

export default Overview;