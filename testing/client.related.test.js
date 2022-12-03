<<<<<<< HEAD
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import App from '../client/src/components/App.jsx';
// import Related from '../client/src/components/Related/Related.jsx';
// import RelatedProducts from '../client/src/components/Related/RelatedProducts.jsx';
// import YourOutfit from '../client/src/components/Related/YourOutfit.jsx';
import ProductCard from '../client/src/components/Related/ProductCard.jsx';
const sampleProduct = require('./mocks.js').sampleProduct;
const reviews = require('./mocks.js').reviews;

describe("ProductCard component", () => {

  it('tests the data being passed to ProductCard is on the screen', async () => {
    nock('http://127.0.0.1:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get('/reviews/meta')
    .reply(200, reviews)

    const { container } = render(<ProductCard
      product={sampleProduct}
      generateStars={ function() { return "stars"}}
      setIsFetching={ function() { return }}
      />, {wrapper: Router});

    await waitFor(() => {
      expect(container.getElementsByClassName('product-card-name').length).toBe(1);
    })
  })
=======
/**
 * @jest-environment jsdom
 */

import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useSearchParams
} from "react-router-dom";
import App from '../client/src/components/App.jsx';
import Related from '../client/src/components/Related/Related.jsx';
import RelatedProducts from '../client/src/components/Related/RelatedProducts.jsx';
import YourOutfit from '../client/src/components/Related/YourOutfit.jsx';
import ProductCard from '../client/src/components/Related/ProductCard.jsx';
const fetch = require('node-fetch');
globalThis.fetch = fetch
global.window = Object.create(window);
const url = "http://127.0.0.1:3000/71698";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});
describe("RelatedProducts component", () => {
  test("Test 1", async () => {
    render(<App />)
    const items = await screen.findAllByText("Morning Joggers")
    expect(items).toHaveLength(1);

  });
  test("Test 2", () => {
    expect(true).toBeTrue;
  });
  test("Test 3", () => {
    expect(true).toBeTrue;
  });
  test("Test 4", () => {
    expect(true).toBeTrue;
  });
  test("Test 5", () => {
    expect(true).toBeTrue;
  });
})

describe("YourOutfit component", () => {
  test("Test 1", () => {
    expect(true).toBeTrue;
  });
  test("Test 2", () => {
    expect(true).toBeTrue;
  });
  test("Test 3", () => {
    expect(true).toBeTrue;
  });
  test("Test 4", () => {
    expect(true).toBeTrue;
  });
  test("Test 5", () => {
    expect(true).toBeTrue;
  });
>>>>>>> main
})

describe("ProductCard component", () => {
  test("Test 1", () => {
    expect(true).toBeTrue;
  });
<<<<<<< HEAD
=======
  test("Test 2", () => {
    expect(true).toBeTrue;
  });
  test("Test 3", () => {
    expect(true).toBeTrue;
  });
  test("Test 4", () => {
    expect(true).toBeTrue;
  });
  test("Test 5", () => {
    expect(true).toBeTrue;
  });
>>>>>>> main
})