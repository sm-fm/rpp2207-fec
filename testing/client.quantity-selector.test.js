import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
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
    const quantbtn = screen.getByRole('quantity');
    fireEvent.click(quantbtn);
    const quantitySelector = screen.queryAllByTestId('quantity');
    expect(quantitySelector.length).toBe(7);
  });

  test('Quantity selector drop down should be disabled when no style in selected', async () => {
    render(<QuantitySelector
      skuSelected={''}
      sizeSelected={''}
      setQuantity={0}
      allSkus={chosenStyleData.results[0].skus} />);
    const quantitySelector = screen.getByRole('button');
    expect(quantitySelector).toHaveAttribute('disabled');
  });

  test('Quantity selector btn value should update correctly based on what size was clicked', async () => {
    render(<QuantitySelector
      skuSelected={'2580526'}
      sizeSelected={'S'}
      allSkus={chosenStyleData.results[0].skus}
      setQuantity={() => {}} />);
    const quantitySelector = screen.getByRole('quantity');
    fireEvent.click(quantitySelector);
    waitFor(() => {
      const quantitySelector = screen.queryAllByTestId('quantity');
      fireEvent.click(quantitySelector[1]);
      const btn = screen.getByRole('size');
      expect(btn.value).toBe(2);
    });
  });

  test('Quantity selector btn should close upon quantity selected', async () => {
    render(<QuantitySelector
      skuSelected={'2580526'}
      sizeSelected={'S'}
      allSkus={chosenStyleData.results[0].skus}
      setQuantity={() => {}} />);
    const quantitySelector = screen.getByRole('quantity');
    fireEvent.click(quantitySelector);
    waitFor(() => {
      const quantitySelector = screen.queryAllByTestId('quantity');
      fireEvent.click(quantitySelector[1]);
      const btn = screen.getByText(/1/i);
      expect(btn).toBeNull();
    });
  });

});

describe('SpecificQuantity module', () => {

  test('Specific option should have correct value', async () => {
    render(<SpecificQuantity
      num={1}
      setQuantity={() => {}}
      setQuantClick={() => {}}
      key={1} />);
    const quantitySelection = screen.getByTestId('quantity');
    expect(quantitySelection.value).toBe(1);
  });

  test('Specific option should not exist when nothing is inherited', async () => {
    render(<SpecificQuantity />);
    const quantitySelection = screen.queryByTestId('quantity');
    expect(quantitySelection).toBeNull();
  });
});

describe('Integration between SizeSelector and Quantity Selector buttons', () => {
  test('Quantity should correctly change based on size selection', async () => {
    render(<Cart
      skus={chosenStyleData.results[0].skus} />);
    const sizeSelection = screen.getByRole('sizes-btn');
    fireEvent.click(sizeSelection);
    waitFor(() => {
      const size = screen.getByText(/S/i);
      fireEvent.click(size);
      const newSizeSelection = screen.queryAllByTestId('quantity');
      expect(newSizeSelection.length).toBe(15);
    });
  });
});