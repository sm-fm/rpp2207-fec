import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Ratings from './Ratings/Ratings.jsx';
import Related from './Related/Related.jsx';
import '../style.css';

const App = (props) => {
  const params = useParams();
  const id = params.id || '71697';
  const [yourOutfit, setYourOutfit] = useState([]);
  const [scrollToRatings, setScrollToRatings] = useState(false);
  const ratingsRef = useRef(null);

  const addToOutfit = (product) => {
    console.log(yourOutfit, product);
    if (!(yourOutfit.filter((item) => item.id === product.id).length > 0)) {
      setYourOutfit(yourOutfit => ([product, ...yourOutfit]));
    }
  };

  const removeFromOutfit = (product) => {
    const id = product.id;
    setYourOutfit(yourOutfit.filter(outfit => outfit.id !== id));
  };

  const fullStar = (id, st, key) => {
    if (st === 'f') {
      return (
        <svg key={`${key}-${id}`} width="11px" height="11px" viewBox="0 0 31 31">
          <defs>
            <linearGradient id="grad-full">
              <stop offset="100%" stopColor="black"/>
            </linearGradient>
          </defs>
          <path fill="url(#grad-full)" stroke="black" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
        l11.547-1.2L16.026,0.6L20.388,10.918z"/>
        </svg>
      );
    } else if (st === 'e') {
      return (
        <svg key={`${key}-${id}`} width="11px" height="11px" viewBox="0 0 31 31">
          <defs>
            <linearGradient id="grad-full">
              <stop offset="100%" stopColor="white"/>
            </linearGradient>
          </defs>
          <path fill="white" stroke="black" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
        l11.547-1.2L16.026,0.6L20.388,10.918z"/>
        </svg>
      );
    }

  };

  const halfStar = (id, key, amount) => {
    return (
      <svg key={`${key}-${id}`} width="11px" height="11px" viewBox="0 0 31 31">
        <defs>
          <linearGradient id={`grad-${key}-${amount}-${id}`}>
            <stop offset={`${amount}%`} stopColor="black" stopOpacity='1'/>
            <stop offset={`${amount}%`} stopColor="white" stopOpacity='1'/>
          </linearGradient>
        </defs>
        <path fill={`url(#grad-${key}-${amount}-${id})`} stroke="black" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
      l11.547-1.2L16.026,0.6L20.388,10.918z"/>
      </svg>
    );
  };

  const generateStars = (rating, key) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i === fullStars) {
        let values = [0, 0.25, 0.5, 0.75, 1];
        let roundedStarVal = values.map((val) => {
          return Math.abs(val - (rating % 1));
        });
        if (rating % 1 > 0.0001) {
          let partialStar = values[roundedStarVal.indexOf(Math.min(...roundedStarVal))] * 100;
          stars.push(halfStar(i, key, partialStar));
        } else {
          stars.push(fullStar(i, 'e', key));
        }
        continue;
      }

      if (i < fullStars) {
        stars.push(fullStar(i, 'f', key));
      } else if ( i > fullStars - 1) {
        stars.push(fullStar(i, 'e', key));
      }
    }
    return stars;
  };

  useEffect(() => {
    localStorage.setItem('yourOutfit', JSON.stringify(yourOutfit));
  }, [yourOutfit]);

  if (scrollToRatings) {
    window.scrollTo({top: ratingsRef.current.offsetTop, behavior: 'smooth'});
  }

  return (
    <div>
      <h1>App.jsx</h1>
      <Overview objID={id} yourOutfit={yourOutfit} addToOutfit={addToOutfit} setScrollToRatings={setScrollToRatings} generateStars={generateStars} data={props.data} />
      <Related objID={id} yourOutfit={yourOutfit} addToOutfit={addToOutfit} removeFromOutfit={removeFromOutfit} generateStars={generateStars} />
      <Questions objID={id}/>
      <div ref={ratingsRef}>
        <Ratings objID={id} generateStars={generateStars} />
      </div>
    </div>
  );
};

export default App;