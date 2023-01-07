import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import chosenStyleData from './mockData.js';
import AddToCart from '../client/src/components/Overview/Cart/AddToCart.jsx';
import Overview from '../client/src/components/Overview/Overview.jsx';
import App from '../client/src/components/App.jsx';
import Cart from '../client/src/components/Overview/Cart/Cart.jsx';
import nock from 'nock';

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

  test('Size selector should open if "Add to Cart" btn is clicked without a size selected', async () => {
    render(
      <Overview
        data={chosenStyleData.data}
        yourOutfit={[]}
        addToOutfit={() => {}}
        setScrollToRatings={() => {}}
        generateStars={() => {}} />
    );
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const addToCartBtn = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(addToCartBtn);
    waitFor(() => {
      const sizeList = screen.queryAllByRole('size');
      expect(sizeList.length).toBeGreaterThan(0);
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
  });
});

describe('POST request test', () => {
  test('Should render correct message if put request is successful', async () => {
    render(
      <AddToCart
        sizeOptions={'S'}
        skuSelected={'2580526'}
        allSkus={chosenStyleData.results[0].skus}
        countPurchasing={3}
        handleFocusSizeDropDown={() => {}}
        setNeedSize={() => {}} />
    );
    nock('http://127.0.0.1:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*'
      })
      .post('/cart', {
        'sku_id': '2580526',
        'count': 1
      })
      .reply(201);
    waitFor(() => {
      const message = screen.getByText(/Item added to cart!/i);
      expect(message).toBeInTheDocument();
    });
  });
});