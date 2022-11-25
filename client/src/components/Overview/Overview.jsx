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
  let [styleClicked, toggleClick] = useState('');
  let [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!props.objID) {
      api.getAllProducts()
        .then(results => {
          setProduct(results[0]);
          return api.getStylesById(results[0].id)
        })
        .then(styles => {
          console.log(styles);
          setStyles(styles.results);
          setChosenStyle(styles.results[0]);
          setPhotos(styles.results[0].photos);
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
          setPhotos(styles.results[0].photos);
        })
        .catch(err => console.log(err));
      }
  }, []);

  return (
    <div id="main-overview">
      {Object.keys(chosenStyle).length !== 0
        ? <div>
            <ProductInfo id="productInfo" product={product} />
            <StyleSelector id="styles" setChosenStyle={setChosenStyle} styles={styles} chosenStyle={chosenStyle} styleClicked={styleClicked} toggleClick={toggleClick} />
            <Images id="images-comp" chosenStyle={chosenStyle} />
            <Cart id="cart" product={product} />
            <p>{product.description}</p>
          </div>
        : null}
    </div>
  )
};

export default Overview;