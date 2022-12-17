import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import { useNavigate } from 'react-router-dom';

const RelatedProduct = (props) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState();
  const stars = props.generateStars(averageRating, 'related');

  useEffect(() => {
    ratingsAPI.getReviewMetadata(props.product.id)
      .then((metadata) => {
        setAverageRating(getAverageRating(metadata.ratings));
        props.setIsFetching(false);
      });
  }, []);

  const routeChange = () => {
    console.log('navigating');
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
    !props.isFetching ?
      <>
        <div className='product-card-container' onClick={() => routeChange(props.product.id)}>
          <img className='product-card-image' src={props.product.styles.results[0].photos[0].thumbnail_url || 'https://ca.slack-edge.com/T5B2RG0JW-U03P8D7RN6S-0c1ef7a3f508-512'}>
          </img>
          {props.parentComponent === 'RelatedProducts'
            ?
            <svg className="open-comparison-btn" width="20px" height="20px" viewBox="0 0 32 32" onClick={(e) => { displayComparison(e); }}>
              <path fill="White" stroke="black" strokeWidth="2px" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
            l11.547-1.2L16.026,0.6L20.388,10.918z"/>
            </svg>
            :
            <div className="close-btn" onClick={() => { props.removeFromOutfit(props.product); }}></div>
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

export default RelatedProduct;