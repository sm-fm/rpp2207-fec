import { render, waitFor } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import App from '../client/src/components/App.jsx';
// import Related from '../client/src/components/Related/Related.jsx';
import RelatedProducts from '../client/src/components/Related/RelatedProducts.jsx';
// import YourOutfit from '../client/src/components/Related/YourOutfit.jsx';
import ProductCard from '../client/src/components/Related/ProductCard.jsx';
const sampleProduct = require('./mocks.js').sampleProduct;
const reviews = require('./mocks.js').reviews;
const relatedProducts = require('./mocks.js').relatedProducts;

describe('ProductCard component', () => {

  it('tests the data being passed to ProductCard is on the screen', async () => {
    nock('http://127.0.0.1:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/meta')
      .reply(200, reviews);

    const { container } = render(<ProductCard
      product={sampleProduct}
      generateStars={ function() { return 'stars'; }}
      setIsFetching={ function() { return; }}
    />, {wrapper: Router});

    await waitFor(() => {
      expect(container.getElementsByClassName('product-card-name').length).toBe(1);
    });
  });
});

describe('RelatedProducts component', () => {
  it('tests the data being passed to RelatedProducts is on the screen', async () => {
    nock('http://127.0.0.1:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/meta')
      .reply(200, reviews);

    const { container } = render(
      <RelatedProducts
        addToOutfit={() => { return; }}
        yourOutfit={() => { return; }}
        relatedProducts={relatedProducts}
        generateStars={ function() { return 'stars'; }}
        isFetching={() => { return false; }}
        setIsFetching={() => { return; }}
      />
      , {wrapper: Router});

    await waitFor(() => {
      expect(container.getElementsByClassName('related-products-container').length).toBe(1);
    });
  });
});
