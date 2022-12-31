import { render, screen, fireEvent, waitFor, rerender } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import chosenStyleData from './mockData.js';
import Overview from '../client/src/components/Overview/Overview.jsx';

describe('Overview module', () => {
  test('Should render correct information', async () => {
    render(
      <Overview
        data={chosenStyleData.data}
        yourOutfit={[]}
        addToOutfit={() => {}}
        setScrollToRatings={() => {}}
        generateStars={() => {}} />
    );
    waitFor(() => {
      const productInfo = screen.getByText(/Blend in to your crowd/i);
      const productInfo2 = screen.getByText(/The So Fatigues/i);
      const features = screen.getByText(/Fabric: Canvas/i);
      const styleInfo = screen.getByText(/Forest Green & Black/i);
      const productName = screen.getByText(/Camo Onesie/i);
      const productCat = screen.getByText(/Jackets/i);
      const reviews = screen.getByText(/Read all 5 reviews/i);
      const price = screen.getByText(/$140.00/i);
      expect(productInfo).toBeInTheDocument();
      expect(productInfo2).toBeInTheDocument();
      expect(features).toBeInTheDocument();
      expect(styleInfo).toBeInTheDocument();
      expect(productName).toBeInTheDocument();
      expect(productCat).toBeInTheDocument();
      expect(reviews).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });

  test('Should render expanded view when main img is clicked', async () => {
    const { container } = render(
      <Overview
        data={chosenStyleData.data}
        yourOutfit={[]}
        addToOutfit={() => {}}
        setScrollToRatings={() => {}}
        generateStars={() => {}} />
    );
    const mainImg = screen.getByAltText('Image of current style');
    fireEvent.click(mainImg);
    waitFor(() => {
      const expandedImg = container.getElementById('expanded-img');
      expect(expandedImg).toBeInTheDocument();
    });
  });

  test('Should render error handling message if no data is passed to it', async () => {
    render(<Overview
      data={{}}
      yourOutfit={[]}
      addToOutfit={() => {}}
      setScrollToRatings={() => {}}
      generateStars={() => {}} />);
    waitFor(() => {
      const error = screen.getByText(/Something went wrong/i);
      expect(error).toBeInTheDocument();
    });
  });
});