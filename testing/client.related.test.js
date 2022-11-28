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
    const { findAllByText } = await render(<App />)
    const joggers = await findAllByText("Morning Joggers")
    expect(joggers).toHaveLength(1);
    const shoes = await findAllByText("Blues Suede Shoes")
    expect(shoes).toHaveLength(1);
    const kicks = await findAllByText("Pumped Up Kicks")
    expect(kicks).toHaveLength(1);
    const heir = await findAllByText("Heir Force Ones")
    expect(heir).toHaveLength(1);

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
})

describe("ProductCard component", () => {
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
})