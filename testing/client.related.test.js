import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import App from '../client/src/components/App.jsx';
// import Related from '../client/src/components/Related/Related.jsx';
import RelatedProducts from '../client/src/components/Related/RelatedProducts.jsx';
// import YourOutfit from '../client/src/components/Related/YourOutfit.jsx';
import ProductCard from '../client/src/components/Related/ProductCard.jsx';
const sampleProduct = require('./mocks.js').sampleProduct;
const reviews = require('./mocks.js').reviews;
const relatedProducts = require('./mocks.js').relatedProducts;
const generateStars = require('./mocks.js').generateStars;

beforeAll(() => {
  nock('http://127.0.0.1:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get('/reviews/meta')
    .reply(200, reviews);
});

describe('ProductCard component', () => {
  const renderComponent = () => {
    return render(<ProductCard
      product={sampleProduct}
      generateStars={ generateStars }
      setIsFetching={ function() { return; }}
    />, {wrapper: Router});
  };

  it('tests that the product-card-container element is in the document', async () => {
    const { container } = renderComponent();
    await waitFor(() => {
      expect(container.getElementsByClassName('product-card-name').length).toBe(1);
    });
  });
  it('tests that the product-card-image element is in the document', async () => {
    const { container } = renderComponent();
    await waitFor(() => {
      expect(container.getElementsByClassName('product-card-image').length).toBe(1);
    });
  });
  it('tests that the open-comparison-btn element is in the document', async () => {
    const renderComponent = () => {
      return render(<ProductCard
        product={sampleProduct}
        generateStars={ generateStars }
        setIsFetching={ function() { return; }}
        parentComponent={ 'RelatedProducts' }
      />, {wrapper: Router});
    };
    const { container } = renderComponent();
    await waitFor(() => {
      expect(container.getElementsByClassName('open-comparison-btn').length).toBe(1);
    });
  });
  it('tests that the close-btn element is in the document', async () => {
    const renderComponent = () => {
      return render(<ProductCard
        product={sampleProduct}
        generateStars={ generateStars }
        setIsFetching={ function() { return; }}
        parentComponent={ 'YourOutfit' }
      />, {wrapper: Router});
    };
    const { container } = renderComponent();
    await waitFor(() => {
      expect(container.getElementsByClassName('close-btn').length).toBe(1);
    });
  });
  it('tests that the name passed to ProductCard is on the screen', async () => {
    renderComponent();
    await waitFor(() => {
      const name = screen.getByText('Pumped Up Kicks');
      expect(name).toBeInTheDocument();
    });
  });
  it('tests that the category passed to ProductCard is on the screen', async () => {
    renderComponent();
    await waitFor(() => {
      const name = screen.getByText('Kicks');
      expect(name).toBeInTheDocument();
    });
  });
  it('tests that the price passed to ProductCard is on the screen', async () => {
    renderComponent();
    await waitFor(() => {
      const name = screen.getByText(/89.00/);
      expect(name).toBeInTheDocument();
    });
  });
  it('tests that the data returned by generateStars is on the screen', async () => {
    const { container } = renderComponent();
    await waitFor(() => {
      expect(container.getElementsByClassName('product-card-stars').length).toBe(1);
    });
  });
});

describe('RelatedProducts component', () => {
  const renderComponent = () => {
    return render(
      <RelatedProducts
        addToOutfit={() => { return; }}
        yourOutfit={() => { return; }}
        relatedProducts={relatedProducts}
        generateStars={ function() { return 'stars'; }}
        isFetching={() => { return false; }}
        setIsFetching={() => { return; }}
        position={0}
      />, {wrapper: Router});
  };

  it('tests that the expected classes are present in the document', async () => {
    const { container } = renderComponent();
    await waitFor(() => {
      expect(container.getElementsByClassName('related-products-container').length).toBe(1);
      expect(container.getElementsByClassName('fade-top').length).toBe(1);
    });
  });
  it('tests that the related-products-container element has a margin-left of -0px on first render', async () => {
    const { container } = renderComponent();
    await waitFor(() => {
      const div = container.getElementsByClassName('related-products-container')[0];
      expect(div).toHaveStyle('margin-left: -0px;');
    });
  });
  it('tests that the arrow-right button is in the document', async () => {
    renderComponent();
    await waitFor(() => {
      const rightArrow = screen.getByRole('button', {name: 'scroll right'});
      expect(rightArrow).toBeInTheDocument();
    });
  });
  it('tests that clicking the arrow-right button substracts 250 from the margin-left attribute of the related-products listbox', async () => {
    renderComponent();
    fireEvent(
      screen.getByRole('button', {name: 'scroll right'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const products = screen.getByRole('listbox', {name: 'related products'});
    expect(products).toHaveStyle('margin-left: -250px;');
  });
});
