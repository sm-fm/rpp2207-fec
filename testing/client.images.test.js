import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Images from '../client/src/components/Overview/ImageViews/Images.jsx';
import ExpandedView from '../client/src/components/Overview/ImageViews/ExpandedView.jsx';
import chosenStyleData from './mockData.js';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useSearchParams
} from "react-router-dom";
import '@testing-library/jest-dom';
const fetch = require('node-fetch');

describe('Overall Images component', () => {
  test('Component renders correct image', async () => {
    render(
      <Images
      chosenStyle={chosenStyleData.results[0]}
      photos={chosenStyleData.results[0].photos} />
    );
    const mainImg = screen.getByAltText('Image of current style');
    expect(mainImg).toHaveAttribute('src', "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });
});

describe('Expanded View component', () => {
  test('Component renders correct image', async () => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={0} />
    );
    const mainImg = screen.getByAltText('Image of current style');
    expect(mainImg).toHaveAttribute('src', "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });
});