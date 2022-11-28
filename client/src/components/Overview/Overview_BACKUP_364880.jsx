import React, { useState, useEffect } from 'react';
import api from '../../API/Overview.js';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import Images from './ImageViews/Images.jsx';
import StyleSelector from './StylesSelector/StyleSelector.jsx';
import Cart from './Cart/Cart.jsx';

const Overview = (props) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
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
=======
    // api.getAllProducts();
>>>>>>> related
  }, [])

  return (
    <div id="main-overview">
      <ProductInfo product={products} />
      <Images product={products} />
      <StyleSelector product={products} />
      <Cart product={products} />
      <p>{products.description}</p>
    </div>
  )
};

export default Overview;