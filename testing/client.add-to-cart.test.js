import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import chosenStyleData from './mockData.js';
import AddToCart from '../client/src/components/Overview/Cart/AddToCart.jsx';
import Cart from '../client/src/components/Overview/Cart/Cart.jsx';

describe('Add to cart module', () => {
  test('Button should render on the page', async () => {
    render(<AddToCart
      sizeOptions={'S'}
      skuSelected={'2580526'}
      allSkus={chosenStyleData.results[0].skus}
      countPurchasing={3}
      handleFocusSizeDropDown={() => {}}
      setNeedSize={() => {}} />);
    const AddToCartBtn = screen.getByRole('button');
    expect(AddToCartBtn).toBeInTheDocument();
  });

  test('Button should not render when no sizes are in stock', async () => {
    render(<AddToCart
      sizeOptions="OUT OF STOCK" />);
    const AddToCartBtn = screen.queryByRole('button');
    expect(AddToCartBtn).toBeNull();
  });

  test('Message "Please select a size" should display if btn is clicked without size selected', async () => {
    render(<Cart skus={chosenStyleData.results[0].skus} />);
    const addtoCartBtn = screen.getByRole('button', {name: 'Add to Cart'});
    fireEvent.click(addtoCartBtn);
    const message = screen.getByText(/Please select a size/i);
    expect(message).toBeInTheDocument();
  });
});