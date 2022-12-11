import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import chosenStyleData from './mockData.js';
import QuantitySelector from '../client/src/components/Overview/Cart/QuantitySelector.jsx';
import SpecificQuantity from '../client/src/components/Overview/Cart/SpecificQuantity.jsx';
import Cart from '../client/src/components/Overview/Cart/Cart.jsx';

describe('QuantitySelector Module', () => {
  test('Quantity selector drop down should render appropriate selections', async () => {
    render(<QuantitySelector
      skuSelected={'2580526'}
      sizeSelected={'S'}
      setQuantity={16}
      allSkus={chosenStyleData.results[0].skus} />);
      const quantitySelctor = screen.queryAllByRole('option');
      expect(quantitySelctor.length).toBe(8);
  });

  test('Quantity selector drop down should be disabled when no style in selected', async () => {
    render(<QuantitySelector
      skuSelected={''}
      sizeSelected={''}
      setQuantity={0}
      allSkus={chosenStyleData.results[0].skus} />);
      const quantitySelector = screen.getByRole('quantity');
      expect(quantitySelector).toHaveAttribute('disabled');
  });

  test('Quantity selector drop down should be disabled when no info is inherited', async () => {
    render(<QuantitySelector />);
    const quantitySelector = screen.getByRole('quantity');
    expect(quantitySelector).toHaveAttribute('disabled');
  });

});

describe('SpecificQuantity module', () => {

  test('Specific option should have correct value', async () => {
    render(<SpecificQuantity
      num={1}
      setQuantity={() => {}}
      key={1} />);
      const quantitySelection = screen.getByRole('option', { name: 1 });
      expect(quantitySelection).toBeInTheDocument();
  });

  test('Specific option should still exist when nothing is inherited', async () => {
    render(<SpecificQuantity />);
    const quantitySelection = screen.queryByRole('option');
    expect(quantitySelection).toBeInTheDocument();
  });
});

describe('Integration between SizeSelector and Quantity Selector buttons', () => {
  test('Quantity should correctly change based on size selection', async () => {
    render(<Cart
      skus={chosenStyleData.results[0].skus} />);
    const sizeSelection = screen.getByTestId('select');
    fireEvent.change(sizeSelection, {target: {value: 'S'}});
    const newSizeSelection = screen.queryAllByTestId('quantity');
    expect(newSizeSelection.length).toBe(15);
  });
});