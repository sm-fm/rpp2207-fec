import React, { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import Images from './ImageViews/Images.jsx';
import StyleSelector from './StylesSelector/StyleSelector.jsx';
import Cart from './Cart/Cart.jsx';
import ExpandedView from './ImageViews/ExpandedView.jsx';
import Description from './ProductInfo/Description.jsx';

const Overview = (props) => {
  const product = props.data.product;
  const styles = props.data.styles;
  const [chosenStyle, setChosenStyle] = useState(props.data.chosenStyle);
  const [styleClicked, setStyleClicked] = useState(props.data.toggleClick);
  const photos = props.data.photos;
  const [expandedView, setExpandedView] = useState(false);
  const [indexOfExpandedImg, setIndexOfExpandedImg] = useState(0);
  const [skus, setSkus] = useState(props.data.skus);
  const reviews = props.data.reviews;
  const stars = props.generateStars(props.data.avgRatings, 'overview');

  if (Object.keys(props.data).length === 0) {
    return (
      <>
        <p>Something went wrong</p>;
      </>
    );
  }
  if (!expandedView) {
    return (
      <div id="main-overview">
        <div>
          <div id="product-styles-cart">
            <div id="productInfo">
              <ProductInfo
                product={product}
                stars={stars}
                reviews={reviews}
                setScrollToRatings={props.setScrollToRatings} />
            </div>
            <div id="styles">
              <StyleSelector
                setChosenStyle={setChosenStyle}
                styles={styles}
                chosenStyle={chosenStyle}
                styleClicked={styleClicked}
                setStyleClicked={setStyleClicked}
                setSkus={setSkus} />
            </div>
            <div id="cart">
              <Cart
                chosenStyle={chosenStyle}
                skus={skus}
                product={product}
                addToOutfit={props.addToOutfit}
                styles={styles} />
            </div>
          </div>
          <div id="images-comp">
            <Images
              chosenStyle={chosenStyle}
              photos={photos}
              setExpandedView={setExpandedView}
              setIndexOfExpandedImg={setIndexOfExpandedImg} />
          </div>
          <div id="description-container">
            <Description
              product={product} />
          </div>
        </div>
      </div>
    );
  }
  if (expandedView) {
    return (
      <div id="main-overview">
        <ExpandedView
          chosenStyle={chosenStyle}
          indexOfExpandedImg={indexOfExpandedImg}
          photos={photos}
          setExpandedView={setExpandedView} />
      </div>
    );
  }
};

export default Overview;