import React, { useState, useEffect } from 'react';
import ratingsAPI from '../../API/Ratings.js';
import { useNavigate } from 'react-router-dom';

const RelatedProduct = (props) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);
  const stars = props.generateStars(averageRating, 'related');

  const isInYourOutfit = () => {
    return props.yourOutfit.filter((product) => product.id === props.product.id).length > 0
  }

  const routeChange = () => {
    const path = `/${props.product.id.toString()}`;
    console.log('card clicked')
    navigate(path);
  }

  const displayComparison = () => {
    alert("comparison modal")
  }
  const getAverageRating = (ratings) => {
    var sum = 0;
    var count = 0;
    Object.keys(ratings).forEach(function(rating) {
      sum += rating * parseInt(ratings[rating]);
      count += parseInt(ratings[rating]);
    })
    return sum / count;
  }

  useEffect(() => {
    ratingsAPI.getReviewMetadata(props.product.id)
    .then((metadata) => {
      setAverageRating(getAverageRating(metadata.ratings));
      props.setIsFetching(false);
    })
  }, [])

  return (
    !props.isFetching ?
    <div className='product-card-container' onClick={() => routeChange(props.product.id)}>
      <img className='product-card-image' src={props.product.styles.results[0].photos[0].thumbnail_url}>
      </img>
      {props.parentComponent === 'RelatedProducts' ?
      <svg className="add-outfit-btn" width="20px" height="20px" viewBox="0 0 32 32" onClick={() => {displayComparison()}}>
          <path fill="White" stroke="black" strokeWidth="2px" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
        l11.547-1.2L16.026,0.6L20.388,10.918z"/>
      </svg>
      :
      <div className="remove-outfit-btn" onClick={() => {props.removeFromOutfit(props.product)}}></div>
      }

      <div className='product-card-description'>
        <div className='product-card-category'>{props.product.category}</div>
        <div className='product-card-name'>{props.product.name}</div>
        <div className='product-card-price'>${props.product.default_price}</div>
        <div className='product-card-stars'>{props.generateStars(averageRating, 'related')}</div>
      </div>
    </div>
    : null
  )
}

export default RelatedProduct;