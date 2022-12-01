import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useSearchParams
} from "react-router-dom";
import nock from 'nock';
import App from '../client/src/components/App.jsx';
import Related from '../client/src/components/Related/Related.jsx';
import RelatedProducts from '../client/src/components/Related/RelatedProducts.jsx';
import YourOutfit from '../client/src/components/Related/YourOutfit.jsx';
import ProductCard from '../client/src/components/Related/ProductCard.jsx';
import sampleProduct from './mocks';

console.log('sampleProduct: ', sampleProduct)

// describe("RelatedProducts component", () => {
//   it('checks if data from the API is rendered into the component', async () => {
//     nock('http://127.0.0.1:3000')
//     .defaultReplyHeaders({
//       'access-control-allow-origin': '*',
//     })
//     .get('/products/:id')
//     .reply(200, product_id)
//     .get('/products/:id/related')
//     .reply(200, related_products)
//     .get('/products/:id/styles')
//     .reply(200, product_styles)

//     render(<App />);

//     await waitFor(() => {
//       screen.getByText("Zebra Stripe")
//       expect(screen.getByText("Zebra Stripe")).toBeInTheDocument();
//     })
//   })
// })

describe("ProductCard component", () => {
  console.log(sampleProduct)
  it('tests the data being passed to ProductCard is on the screen', async () => {
    render(<ProductCard product={sampleProduct} generateStars={ function() { return "stars"}}/>, {wrapper: Router});

    await waitFor(() => {
      screen.getByText("Pumped Up Kicks")
      expect(screen.getByText("Pumped Up Kicks")).toBeInTheDocument();
    })
  })
})

describe("ProductCard component", () => {
  test("Test 1", () => {
    expect(true).toBeTrue;
  });
})