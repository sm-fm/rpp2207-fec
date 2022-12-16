import React, { useState, useEffect } from 'react';
import api from '../../API/Overview.js';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import Images from './ImageViews/Images.jsx';
import StyleSelector from './StylesSelector/StyleSelector.jsx';
import Cart from './Cart/Cart.jsx';
import ExpandedView from './ImageViews/ExpandedView.jsx';
import RatingsAPI from '../../API/Ratings.js';

const Overview = (props) => {

  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [chosenStyle, setChosenStyle] = useState({});
  const [styleClicked, toggleClick] = useState('');
  const [photos, setPhotos] = useState([]);
  const [expandedView, setExpandedView] = useState(false);
  const [indexOfExpandedImg, setIndexOfExpandedImg] = useState(0);
  const [skus, setSkus] = useState({});
  const [fetching, setFetching] = useState(true);
  const [averageRating, setAverageRating] = useState();
  const [reviews, setReviews] = useState();
  const stars = props.generateStars(averageRating, 'overview');

  useEffect(() => {
    api.getProductById(props.objID)
      .then(result => {
        return result.json();
      })
      .then(result => {
        setProduct(result);
        return RatingsAPI.getReviewMetadata(result.id);
      })
      .then(metadata => {
        setAverageRating(api.getAverageRating(metadata.ratings));
        return api.getStylesById(metadata.product_id);
      })
      .then(styles => {
        return styles.json();
      })
      .then(styles => {
        setStyles(styles.results);
        setChosenStyle(styles.results[0]);
        setPhotos(styles.results[0].photos);
        toggleClick(styles.results[0].name);
        setSkus(styles.results[0].skus);
        setFetching(false);
        return api.getAllReviews(styles.product_id);
      })
      .then(reviews => {
        setReviews(reviews);
      })
      .catch(err => console.log(err));
  }, [props.objID]);

  if (!expandedView) {
    return (
      <div id="main-overview">
        {!fetching
          ? <div>
            <ProductInfo
              id="productInfo"
              stars={stars}
              reviews={reviews}
              setScrollToRatings={props.setScrollToRatings} />
            <StyleSelector
              id="styles"
              setChosenStyle={setChosenStyle}
              styles={styles}
              chosenStyle={chosenStyle}
              styleClicked={styleClicked}
              toggleClick={toggleClick}
              setSkus={setSkus} />
            <Images
              id="images-comp"
              chosenStyle={chosenStyle}
              photos={photos}
              setExpandedView={setExpandedView}
              setIndexOfExpandedImg={setIndexOfExpandedImg} />
            <Cart
              id="cart"
              chosenStyle={chosenStyle}
              skus={skus}
              product={product}
              addToOutfit={props.addToOutfit}
              styles={styles} />
            <p>{product.description}</p>
          </div>
          : null}
      </div>
    );
  } else {
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