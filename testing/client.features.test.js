import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import chosenStyleData from './mockData.js';
import Features from '../client/src/components/Overview/ProductInfo/Features.jsx';
import Description from '../client/src/components/Overview/ProductInfo/Description.jsx';
import IndiFeature from '../client/src/components/Overview/ProductInfo/IndiFeature.jsx';

describe('Features module', () => {
  test('Lists out the appropriate amount of features', async () => {
    render(
      <Features
        product={chosenStyleData.featureData[0]} />
    );
    const features = screen.queryAllByRole('indi-feature');
    expect(features.length).toBe(4);
  });

  test('Should render correct feature info', async () => {
    render(
      <Features
        product={chosenStyleData.featureData[0]} />
    );
    const featureText = screen.getByText(/Sole: Rubber/i);
    expect(featureText).toBeInTheDocument();
  });

  test('Should not render features if no data is passed to component', async () => {
    render(<Features />);
    const features = screen.queryAllByRole('indi-feature');
    expect(features.length).toBe(0);
  });

  test('IndiFeature should not exist if no data passed to Features', async () => {
    render(<Features />);
    const indiFeature = screen.queryByRole('check');
    expect(indiFeature).toBeNull();
  });
});

describe('Description component', () => {
  test('Should render correct product information', async () => {
    render(
      <Description
        product={chosenStyleData.featureData[0]} />
    );
    const slogan = screen.getByText(/A sneaker dynasty/i);
    const description = screen.getByText(/Now where da boxes/i);
    expect(slogan).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('Should not render info if no data is passed to component', async () => {
    render(<Description />);
    const slogan = screen.queryByRole('slogan');
    const description = screen.queryByRole('description');
    expect(slogan).toBeNull;
    expect(description).toBeNull;
  });
});