import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import StyleSelector from '../client/src/components/Overview/StylesSelector/StyleSelector.jsx';
import SpecificStyle from '../client/src/components/Overview/StylesSelector/SpecificStyle.jsx';
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


describe('StyleSelector Module', () => {
  test('renders correct style information in StyleSelector', async () => {
    render(<StyleSelector
      chosenStyle={ chosenStyleData.results[0] }
      styles={ chosenStyleData.results } />);
    const styleSelectorInfo = screen.getByText(/Forest Green & Black/i);
    expect(styleSelectorInfo).toBeInTheDocument();
  });

  test('doesn\'t render style information when not passed as props', async () => {
    render(<StyleSelector />);
    const styleSelectorInfo = screen.queryByTestId('style-info');
    expect(styleSelectorInfo).toBeNull();
  });

  test('renders correct price for current style in StyleSelector', async () => {
    render(<StyleSelector
      chosenStyle={ chosenStyleData.results[0] }
      styles={ chosenStyleData.results } />);
    const styleSelectorInfo = screen.getByText(/140.00/i);
    expect(styleSelectorInfo).toBeInTheDocument();
  });

});

describe('SpecificStyle Module', () => {
  test('renders correct style image for SpecificStyle', async () => {
    render(<SpecificStyle
      styleClicked={ chosenStyleData.results[0] }
      style={ chosenStyleData.results[0] } />);
    const image = screen.getByAltText('thumbnail of current style');
    expect(image).toHaveAttribute('src', "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });

  test('renders checkmark over currently clicked style', async () => {
    render(<SpecificStyle
      styleClicked={ chosenStyleData.results[0].name }
      style={ chosenStyleData.results[0] } />);
    const checkmark = await screen.getByTestId('checkmark');
    expect(checkmark).toBeInTheDocument();
  });

});