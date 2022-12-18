import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './mockApp.jsx';
import RelatedProducts from '../client/src/components/Related/RelatedProducts.jsx';
const sampleProduct = require('./mocks.js').sampleProduct;
const styles = require('./mocks.js').styles;
const sampleReview = require('./mocks.js').sampleReview;
const relatedProducts = require('./mocks.js').relatedProducts;
const generateStars = require('./mocks.js').generateStars;

beforeAll(() => {
  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .persist()
    .get(/\/reviews\/meta\/.*/)
    .query(true)
    .reply(200, sampleReview);
  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .persist()
    .get(/\/products\/.*\/related/)
    .reply(200, [11111, 11112, 11113, 11114, 71702]);
  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .persist()
    .get(/\/products\/.*\/styles/)
    .reply(200, styles);
  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .persist()
    .get(/\/products\/.*/)
    .reply(200, sampleProduct);
});

const RelatedProductsComponent = () => {
  return render(
    <RelatedProducts
      addToOutfit={() => { return; }}
      yourOutfit={() => { return; }}
      relatedProducts={relatedProducts}
      generateStars={ generateStars }
      isFetching={false}
      setIsFetching={() => { return; }}
      currentProduct={ relatedProducts[0] }
    />, {wrapper: Router});
};

const AppComponent = () => {
  return render(
    <App
      yourOutfit={[]}
    />, {wrapper: Router});
};


describe('RelatedProducts component', () => {
  it('tests that the expected classes are present in the document', async () => {
    const { container } = await AppComponent();
    await waitFor(() => {
      expect(container.getElementsByClassName('related-products-container').length).toBe(1);
      expect(container.getElementsByClassName('fade-top').length).toBe(1);
    });
  });
  it('tests that the related-products-container element has a margin-left of -0px on first render', async () => {
    const { container } = await AppComponent();
    await waitFor(() => {
      const div = container.getElementsByClassName('related-products-container')[0];
      expect(div).toHaveStyle('margin-left: -0px;');
    });
  });
  it('tests that the arrow-right button is in the document', async () => {
    await RelatedProductsComponent();
    const rightArrow = await screen.findByRole('button', {name: 'scroll right'});
    expect(rightArrow).toBeInTheDocument();
  });
  it('tests that clicking the arrow-right button substracts 250 from the margin-left attribute of the related-products listbox', async () => {
    await RelatedProductsComponent();
    fireEvent(
      await screen.findByRole('button', {name: 'scroll right'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const products = await screen.findByRole('listbox', {name: 'related products'});
    expect(products).toHaveStyle('margin-left: -250px;');
  });
  it('tests that clicking the arrow-left button adds 250 from the margin-left attribute of the related-products listbox', async () => {
    await RelatedProductsComponent();
    fireEvent(
      await screen.findByRole('button', {name: 'scroll right'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      await screen.findByRole('button', {name: 'scroll right'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      await screen.findByRole('button', {name: 'scroll left'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const products = await screen.findByRole('listbox', {name: 'related products'});
    expect(products).toHaveStyle('margin-left: -250px;');
  });
});

describe('ProductCard components inside RelatedProducts', () => {
  it('tests that the expected number of product-card-container elements are on the screen', async () => {
    const { container } = await RelatedProductsComponent();
    const productCard = await container.getElementsByClassName('product-card-name');
    expect(productCard.length).toBe(5);
  });
  it('tests that the expected number of product-card-image elements are on the screen', async () => {
    const { container } = await RelatedProductsComponent();
    const productCardImage = await container.getElementsByClassName('product-card-image');
    expect(productCardImage.length).toBe(5);
  });
  it('tests that the expected number of open-comparison-btn elements are on the screen', async () => {
    const { container } = await RelatedProductsComponent();
    const openComparisonButton = await container.getElementsByClassName('open-comparison-btn');
    expect(openComparisonButton.length).toBe(5);
  });
  it('tests that a name passed to ProductCard is on the screen', async () => {
    await RelatedProductsComponent();
    const name = await screen.findByText('Product #1');
    expect(name).toBeInTheDocument();
  });
  it('tests that a category passed to ProductCard is on the screen', async () => {
    await RelatedProductsComponent();
    const category = await screen.findAllByText('Kicks');
    expect(category.length).toBe(5);
  });
  it('tests that a price passed to ProductCard is on the screen', async () => {
    await RelatedProductsComponent();
    const price = await screen.findByText(/5.55/);
    expect(price).toBeInTheDocument();
  });
  it('tests that the expected number of product-card-stars elements are on the screen', async () => {
    const { container } = await RelatedProductsComponent();
    const stars = container.getElementsByClassName('product-card-stars');
    expect(stars.length).toBe(5);
  });
  it('tests that clicking the open-comparison-btn opens the modal window', async () => {
    await RelatedProductsComponent();
    fireEvent(
      await screen.getAllByRole('button', {name: 'open comparison'})[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const modal = screen.getByRole('dialog', {name: 'comparison window'});
    expect(modal).toBeInTheDocument();
  });
  it('tests that clicking the x button on the modal closes the modal window', async () => {
    await RelatedProductsComponent();
    fireEvent(
      await screen.getAllByRole('button', {name: 'open comparison'})[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      await screen.findByRole('button', {name: 'close comparison'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const modal = screen.queryByRole('dialog', {name: 'comparison window'});
    const modalCloseButton = screen.queryByRole('button', {name: 'close comparison window'});
    expect(modal).not.toBeInTheDocument();
    expect(modalCloseButton).not.toBeInTheDocument();
  });
});

describe('YourOutfit component', () => {
  it('tests that clicking the add-to-outfit button adds the product to yourOutfit', async () => {
    const { container } = await AppComponent();
    fireEvent(
      await screen.findByRole('button', {name: 'add to your outfit'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const productCardContainer = await container.getElementsByClassName('product-card-container');
    expect(productCardContainer.length).toBe(2);
  });
  it('tests that clicking the x button on a product in yourOutfit removes the item', async () => {
    const { container } = await AppComponent();
    fireEvent(
      await screen.findByRole('button', {name: 'add to your outfit'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      await screen.findByRole('button', {name: 'remove from your outfit'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const productCardContainer = await container.getElementsByClassName('product-card-container');
    expect(productCardContainer.length).toBe(1);
  });
  it('tests that clicking the arrow-right & arrow-left buttons in yourOutfit functions as expected', async () => {
    const AppComponent = () => {
      return render(
        <App
          yourOutfit={relatedProducts}
        />, {wrapper: Router});
    };

    await AppComponent();
    const rightArrow = await screen.findByRole('button', {name: 'scroll right'});
    expect(rightArrow).toBeInTheDocument();
    fireEvent(
      await screen.findByRole('button', {name: 'scroll right'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const leftArrow = await screen.findByRole('button', {name: 'scroll left'});
    expect(leftArrow).toBeInTheDocument();
    fireEvent(
      await screen.findByRole('button', {name: 'scroll left'}),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(leftArrow).not.toBeInTheDocument();
  });
});