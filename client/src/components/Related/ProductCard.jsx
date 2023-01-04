import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState();
  const stars = props.generateStars(averageRating, 'related');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    ratingsAPI.getReviewMetadata(props.product.id)
      .then((metadata) => {
        setAverageRating(getAverageRating(metadata.ratings));
      });
  }, []);

  useEffect(() => {
    setIsFetching(false);
  }, [averageRating]);

  const routeChange = () => {
    const path = `/${props.product.id.toString()}`;
    navigate(path);
  };

  const displayComparison = (e) => {
    props.setComparisonProduct(props.product);
    props.setModalShowing(true);
    e.stopPropagation();
  };

  const getAverageRating = (ratings) => {
    var sum = 0;
    var count = 0;
    Object.keys(ratings).forEach(function(rating) {
      sum += rating * parseInt(ratings[rating]);
      count += parseInt(ratings[rating]);
    });
    return sum / count;
  };

  return (
    !isFetching ?
      <>
        <div className='product-card-container' onClick={() => routeChange(props.product.id)}>
          <img className='product-card-image' src={props.product.styles.results[0].photos[0].thumbnail_url}>
          </img>
          {props.parentComponent === 'RelatedProducts'
            ?
            <svg className="open-comparison-btn" role='button' aria-label='open comparison' width="20px" height="20px" viewBox="0 0 32 32" onClick={(e) => { displayComparison(e); }}>
              <path fill="White" stroke="black" strokeWidth="2px" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
            l11.547-1.2L16.026,0.6L20.388,10.918z"/>
            </svg>
            :
            <div className="close-btn" role='button' aria-label='remove from your outfit' onClick={(e) => { props.removeFromOutfit(props.product, e); }}></div>
          }

          <div className='product-card-description'>
            <div className='product-card-category'>{props.product.category}</div>
            <div className='product-card-name'>{props.product.name}</div>
            <div className='product-card-price'>${props.product.default_price}</div>
            <div className='product-card-stars'>{ stars }</div>
          </div>
        </div>
      </>
      : null
  );
};

export default ProductCard;