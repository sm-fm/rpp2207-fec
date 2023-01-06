import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Images from '../client/src/components/Overview/ImageViews/Images.jsx';
import ExpandedView from '../client/src/components/Overview/ImageViews/ExpandedView.jsx';
import SpecificImage from '../client/src/components/Overview/ImageViews/SpecificImage.jsx';
import Zoom from '../client/src/components/Overview/ImageViews/Zoom.jsx';
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
const onClick = jest.fn();

// OVERALL IMAGES COMPONENT ---------------------------------------------------------------
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

  test('Component doesn\'t render image when not passed images', async () => {
    render(
      <Images />
    );
    const mainImg = screen.queryByAltText('Image of current style');
    expect(mainImg).toBeNull();
  });

  test('Image changes to correct image upon clicking right arrow', async() => {
    const { container } = render(
      <Images
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos} />
    );
    const rightButton = screen.getByTestId('right-btn');
    fireEvent.click(rightButton);
    const img = screen.getByAltText('Image of current style');
    expect(img).toHaveAttribute('src', "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80")
  });

  test('Image changes to correct image upon clicking left arrow', async() => {
    const { container } = render(
      <Images
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos} />
    );
    const rightButton = screen.getByTestId('right-btn');
    fireEvent.click(rightButton);
    const leftButton = screen.getByTestId('left-btn');
    fireEvent.click(leftButton);
    const img = screen.getByAltText('Image of current style');
    expect(img).toHaveAttribute('src', "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });
});

// EXPANDED VIEW COMPONENT ---------------------------------------------------------------
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

  test('Right arrow renders upon mounting of component', async () => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={0} />
    );
    const rightArrow = screen.getByTestId('right-arrow');
    expect(rightArrow).toBeInTheDocument();
  });

  test('Right arrow does not render when viewing last image in list', async () => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={5} />
    );
    const rightArrow = screen.queryByTestId('right-arrow');
    expect(rightArrow).toBeNull();
  });

  test('Left arrow renders when viewing any image other than first image in list', async () => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={1} />
    );
    const leftArrow = screen.getByTestId('left-arrow');
    expect(leftArrow).toBeInTheDocument();
  });

  test('Left arrow should not render upon mounting of component', async () => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={0} />
    );
    const leftArrow = screen.queryByTestId('left-arrow');
    expect(leftArrow).toBeNull();
  });

  test('Circle icons should render upon mounting component', async () => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={0} />
    );
    var circleIcons = [];
    for (var i = 0; i < 6; i++) {
      circleIcons.push(screen.queryByTestId(`circle ${i}`));
    }
    expect(circleIcons.length).toBe(6);
  });

  test('Circle icons should not render when no images are passed to component', async () => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        indexOfExpandedImg={0} />
    );
    const circleIcon = screen.queryAllByTestId('circle');
    expect(circleIcon.length).toBe(0);
  });

  test('Image changes to correct image upon clicking right arrow', async() => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={0} />
    );
    const rightButton = screen.getByTestId('right-arrow');
    fireEvent.click(rightButton);
    const img = screen.getByAltText('Image of current style');
    expect(img).toHaveAttribute('src', "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });

  test('Image changes to correct image upon clicking left arrow', async() => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={1} />
    );
    const leftButton = screen.getByTestId('left-arrow');
    fireEvent.click(leftButton);
    const img = screen.getByAltText('Image of current style');
    expect(img).toHaveAttribute('src', "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });

  test('Image changes to correct image upon clicking circle icon', async() => {
    render(
      <ExpandedView
        chosenStyle={chosenStyleData.results[0]}
        photos={chosenStyleData.results[0].photos}
        indexOfExpandedImg={0} />
    );
    const circleBtn = screen.getByTestId('circle 1');
    fireEvent.click(circleBtn);
    const img = screen.getByAltText('Image of current style');
    expect(img).toHaveAttribute('src', "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });
});

// SPECIFIC IMAGE COMPONENT -------------------------------------------------------------
describe('SpecificImage component', () => {
  test('Correct image is rendered upon component mounting', async () => {
    render(
      <SpecificImage
        photo={chosenStyleData.results[0].photos[0]} />
    );
    const specificImage = screen.getByAltText('thumbnail of image style');
    expect(specificImage).toHaveAttribute('src', "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });

  test('No image is rendered when compnent is not passed one', async () => {
    render(
      <SpecificImage />
    );
    const specificImage = screen.queryByAltText('thumbnail of image style');
    expect(specificImage).toBeNull();
  });

  test('Thumbnail image that is currently main image should have a bottom border', async() => {
    render(
      <SpecificImage
        photo={chosenStyleData.results[0].photos[1]}
        setIndexOfMainImg={() => {}} />
    );
    const clickedImg = screen.getByAltText('thumbnail of image style');
    fireEvent.click(clickedImg);
    expect(clickedImg).toHaveStyle('border-bottom: 5px solid black;');
  });
});

// ZOOM COMPONENT -------------------------------------------------------------------
describe('Zoom component', () => {
  test('Correct image is rendered upon component mounting', async () => {
    render(
      <Zoom
        img={chosenStyleData.results[0].photos[0].thumbnail_url} />
    );
    const specificImage = screen.getByAltText('main image zoomed');
    expect(specificImage).toHaveAttribute('src', "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80");
  });

  test('No image is rendered if it isn\'t passed an image', async () => {
    render(
      <Zoom />
    );
    const specificImage = screen.queryByAltText('main image zoomed');
    expect(specificImage).toBeNull();
  });

  test('Image should zoom 2.5x when clicked', async() => {
    render(
      <Zoom
        img={chosenStyleData.results[0].photos[0].thumbnail_url} />
    );
    const zoomedImgContainer = screen.getByRole("zoom-container");
    fireEvent.mouseMove(zoomedImgContainer);
    const zoomedImg = screen.getByAltText('main image zoomed');
    expect(zoomedImg).toHaveStyle('transform: scale(2.5);');
  });
});