import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import chosenStyleData from './mockData.js';
import ProductInfo from '../client/src/components/Overview/ProductInfo/ProductInfo.jsx';

describe('Product Info module', () => {
  test('Stars should render in component when give correct data', async () => {
    render(
      <ProductInfo
        product={chosenStyleData.featureData[1]}
        stars={[]} />
    );
    const starsRendered = screen.getByRole('stars');
    expect(starsRendered).toBeInTheDocument();
  });

  test('Number of reviews should render', async () => {
    render(
      <ProductInfo
        product={chosenStyleData.featureData[1]}
        stars={'stars'}
        reviews={{count: 5}}
        setScrollToRatings={() => {}} />
    );
    const ratings = screen.getByText(/Read all 5 reviews/i);
    expect(ratings).toBeInTheDocument();
  });

  test('Number of reviews should not render when review data is not sent to it', async () => {
    render(
      <ProductInfo
        product={chosenStyleData.featureData[1]}/>
    );
    const ratings = screen.queryByText(/Read all/i);
    expect(ratings).toBeNull();
  });
});
