import React, { useState, useEffect } from 'react';
import api from '../../API/Overview.js';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import Images from './ImageViews/Images.jsx';
import StyleSelector from './StylesSelector/StyleSelector.jsx';
import Cart from './Cart/Cart.jsx';
import ExpandedView from './ImageViews/ExpandedView.jsx';

const Overview = (props) => {

  let [product, setProduct] = useState({});
  let [styles, setStyles] = useState([]);
  let [chosenStyle, setChosenStyle] = useState({});
  let [styleClicked, toggleClick] = useState('');
  let [photos, setPhotos] = useState([]);
  let [expandedView, setExpandedView] = useState(false);
  let [indexOfExpandedImg, setIndexOfExpandedImg] = useState(0);

  useEffect(() => {
    // api.getAllProducts();
    if (!props.objID) {
      api.getAllProducts()
        .then(results => {
          return results.json();
        })
        .then(results => {
          setProduct(results[0]);
          return api.getStylesById(results[0].id)
        })
        .then(styles => {
          return styles.json();
        })
        .then(styles => {
          setStyles(styles.results);
          setChosenStyle(styles.results[0]);
          setPhotos(styles.results[0].photos);
        })
        .catch(err => console.log(err));
    } else {
      api.getProductById(props.objID)
        .then(result => {
          return result.json();
        })
        .then(result => {
          setProduct(result);
          return api.getStylesById(result.id)
        })
        .then(styles => {
          return styles.json();
        })
        .then(styles => {
          setStyles(styles.results);
          setChosenStyle(styles.results[0]);
          setPhotos(styles.results[0].photos);
        })
        .catch(err => console.log(err));
      }
  }, []);

  if (!expandedView) {
    return (
    <div id="main-overview">
      {Object.keys(chosenStyle).length !== 0
        ? <div>
            <ProductInfo id="productInfo" product={product} />
            <StyleSelector id="styles" setChosenStyle={setChosenStyle} styles={styles} chosenStyle={chosenStyle} styleClicked={styleClicked} toggleClick={toggleClick} />
            <Images id="images-comp" chosenStyle={chosenStyle} photos={photos} setExpandedView={setExpandedView} setIndexOfExpandedImg={setIndexOfExpandedImg} />
            <Cart id="cart" product={product} />
            <p>{product.description}</p>
          </div>
        : null}
    </div>
    )
  } else {
    return (
    <div id="main-overview">
      <ExpandedView chosenStyle={chosenStyle} indexOfExpandedImg={indexOfExpandedImg} photos={photos} />
    </div>
    );
  }
};

export default Overview;