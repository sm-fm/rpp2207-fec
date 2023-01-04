import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import chosenStyleData from './mockData.js';
import SizeSelector from '../client/src/components/Overview/Cart/SizeSelector.jsx';
import SpecificSize from '../client/src/components/Overview/Cart/SpecificSize.jsx';

describe('SizeSelector module', () => {
  test('Size selector button correctly renders on page', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus} />
    );
    const sizeSelectorbtn = screen.queryAllByRole('option');
    expect(sizeSelectorbtn[0]).toBeInTheDocument();
  });

  test('Size selector button should have the correct number of sizes available', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus} />
    );
    const sizeSelections = screen.queryAllByRole('option');
    expect(sizeSelections.length).toEqual(6);
  });

  test('Size selector button should be inactive if there is no stock available', async () => {
    render(
      <SizeSelector
        skus={{"null": {
          "quantity": null,
          "size": null
        }}}
        setSizeOptions={() => {}}
      />
    );
    const disabledSizeSelectorbtn = screen.getByRole('sizes');
    expect(disabledSizeSelectorbtn).toHaveAttribute('disabled');
  });

  test('Size selector button should correctly set default option', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus} />
    );
    const defaultOption = screen.getByRole('option', {name: 'Select a size'});
    expect(defaultOption.selected).toBe(true);
  });
});

describe('SpecificSize module', () => {
  test('should display the correct information upon render', async () => {
    render(
      <SpecificSize
        size={'S'} />
    );
    const sizeOption = screen.getByRole('option', {name: 'S'});
    expect(sizeOption).toBeInTheDocument();
  });

  test('should not display option if no information is sent to component', async () => {
    render(
      <SpecificSize />
    );
    const sizeOption = screen.queryByRole('option');
    expect(sizeOption).toBeNull();
  });

  test('Value of drop down should change on click of a specific option', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus} />
    );
    const sizeOption = screen.getByRole('option', {name: 'S'});
    fireEvent.click(sizeOption);
    const firstOption = screen.queryAllByRole('option')[0];
    expect(firstOption.value).toBe('S');
  });
});