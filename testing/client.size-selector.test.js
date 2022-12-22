import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    const sizeSelectorbtn = screen.getByRole('sizes-btn');
    expect(sizeSelectorbtn).toBeInTheDocument();
  });

  test('Size selector button should have the correct number of sizes available', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus} />
    );
    const sizebtn = screen.getByRole('sizes-btn');
    fireEvent.click(sizebtn);
    const sizeSelections = screen.queryAllByRole('size');
    expect(sizeSelections.length).toEqual(5);
  });

  test('Size selector button should be disabled if there is no stock available', async () => {
    render(
      <SizeSelector
        skus={{"null": {
          "quantity": null,
          "size": null
        }}}
        setSizeOptions={() => {}}
      />
    );
    const disabledSizeSelectorbtn = screen.getByRole('button');
    expect(disabledSizeSelectorbtn).toHaveAttribute('disabled');
  });

  test('Size selector button should correctly set default option', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus} />
    );
    const defaultOption = screen.getByRole('sizes-btn');
    expect(defaultOption.value).toBe('Select a size');
  });

  test('Size drop down should close when a size has been selected', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus}
        setDefaultVal={() => {}} />
    );
    const sizeOption = screen.getByRole('sizes-btn');
    fireEvent.click(sizeOption);
    waitFor(() => {
      const firstOption = screen.getByText(/S/i);
      fireEvent.click(firstOption);
      const size = screen.queryByText(/M/i);
      expect(size).toBeNull();
    });
  });
});

describe('SpecificSize module', () => {
  test('should display the correct information upon render', async () => {
    render(
      <SpecificSize
        setDefaultVal={() => {}}
        setSizeSelected={() => {}}
        setNeedSize={() => {}}
        setSizeOptions={() => {}}
        setSkuSelected={() => {}}
        setSizeChanged={() => {}}
        setOpen={() => {}}
        skus={chosenStyleData.results[0].skus}
        size={'S'} />
    );
    const sizeOption = screen.getByText(/S/i);
    expect(sizeOption).toBeInTheDocument();
  });

  test('should not display option if no information is sent to component', async () => {
    render(
      <SpecificSize />
    );
    const sizeOption = screen.queryByRole('size');
    expect(sizeOption).toBeNull();
  });

  test('Value of drop down should change on click of a specific option', async () => {
    render(
      <SizeSelector
        skus={chosenStyleData.results[0].skus} />
    );
    const sizeOption = screen.getByRole('sizes-btn');
    fireEvent.click(sizeOption);
    waitFor(() => {
      const firstOption = screen.getByText(/S/i);
      fireEvent.click(firstOption);
      const btn = screen.getByRole('button');
      expect(btn.value).toBe('S');
    });
  });
});