import { render, screen, waitFor, fireEvent, getByText } from '@testing-library/react';
import React from 'react';
import Router from 'react-router-dom';
import hf from '../client/src/components/Ratings/helperFunctions.js';
import nock from 'nock';
import ReviewCard from '../client/src/components/Ratings/ReviewCard.jsx';
import Ratings from '../client/src/components/Ratings/Ratings.jsx';
import MetaData from '../client/src/components/Ratings/metadata/Metadata.jsx';
import MetaRating from '../client/src/components/Ratings/metadata/MetaRating.jsx';
import reviewData from './reviewData.js';

var sampleReview = reviewData.sampleReview;
let sampleMeta = reviewData.sampleMeta;
let sampleMetaError = reviewData.sampleMetaError;
let sampleReviewError = reviewData.sampleReviewError;
let sampleReviewsNewest = reviewData.sampleReviewsNewest;
let formValidationRules = reviewData.validationRules;
let sampleFormData = reviewData.sampleDataOne;

test('Testing review form validation function', () => {
  expect(
    hf.reviewFormValidation(sampleFormData, formValidationRules).email.length
  ).toBe(2);

  expect(
    hf.reviewFormValidation(sampleFormData, formValidationRules).reviewBody
  ).toBeTruthy();

  expect(
    hf.reviewFormValidation(sampleFormData, formValidationRules).rating
  ).toBeUndefined();

  expect(
    hf.reviewFormValidation(sampleFormData, formValidationRules).characteristics
  ).toBeUndefined();

});
test('Test calculateAverageReviews from the Ratings helperfunction suite', () => {
  expect(hf.calculateAverageReviews(undefined)).toBe(null);
  expect(hf.calculateAverageReviews({1: '20', 2: '19', 3: '38', 4: '43', 5: '86'})).toEqual('3.8');
  expect(hf.calculateAverageReviews({1: '0', 2: '20', 3: '0', 4: '0', 5: '0'})).toEqual('2.0');
});

test('Test calculateRcommended from the Ratings helper functions', () => {
  expect(hf.calculateRecommended(undefined)).toBe(null);
  expect(hf.calculateRecommended({false: '54', true: '152'})).toEqual(74);
  expect(hf.calculateRecommended({false: '2', true: '6'})).toEqual(75);
});

test('Test manipulateRatings from the Ratings helper functions', () => {
  expect(hf.manipulateRatings({1: '20'})).toStrictEqual({
    1: {'votes': 20, 'ratio': 1.00},
    2: {'votes': 0, 'ratio': 0},
    3: {'votes': 0, 'ratio': 0},
    4: {'votes': 0, 'ratio': 0},
    5: {'votes': 0, 'ratio': 0},
  });
  expect(hf.manipulateRatings({1: '20', 2: '20'})).toStrictEqual({
    1: {'votes': 20, 'ratio': 0.50},
    2: {'votes': 20, 'ratio': 0.50},
    3: {'votes': 0, 'ratio': 0},
    4: {'votes': 0, 'ratio': 0},
    5: {'votes': 0, 'ratio': 0},
  });
  expect(hf.manipulateRatings({1: '20', 2: '19', 3: '38', 4: '43', 5: '10'})).toStrictEqual({
    1: {'votes': 20, 'ratio': 0.15},
    2: {'votes': 19, 'ratio': 0.15},
    3: {'votes': 38, 'ratio': 0.29},
    4: {'votes': 43, 'ratio': 0.33},
    5: {'votes': 10, 'ratio': 0.08}
  });
  expect(hf.manipulateRatings(123)).toBe(undefined);
});

test('review returnMin function', () => {
  expect(hf.returnMin(1, 2)).toBe(1);
  expect(hf.returnMin(2, 1)).toBe(1);
  expect(hf.returnMin('hi', 'a')).toBe('a');
  expect(hf.returnMin('', 1)).toBe(undefined);
});

describe('ReviewCard component', () => {
  test('tests the data being passed to ReviewCard is on the screen', async () => {
    const { container } = render(<ReviewCard
      generateStars={ function() { return 'stars'; }}
      key={`reviews-${1}`}
      data={sampleReview.results[0]}
    />, {wrapper: Router});

    await waitFor(() => {
      expect(container.getElementsByClassName('userReview').length).toEqual(1);
    });
  });

  test('should display more text when \'show more\' is pressed', async () => {
    const { container } = render(<ReviewCard
      generateStars={ function() { return 'stars'; }}
      key={`reviews-${1}`}
      data={sampleReview.results[1]}
    />, {wrapper: Router});

    await waitFor(() => {
      let prevLen = container.getElementsByClassName('reviewBody')[0].innerHTML.length;
      fireEvent.click(container.getElementsByClassName('show-more-review')[0]);
      let currLen = container.getElementsByClassName('reviewBody')[0].innerHTML.length;
      expect(prevLen).toBeLessThan(currLen);
    });
  });
});

describe('General test of the Ratings component', () => {
  test('sad path - Should not break when the API does not return the proper data', async () => {
    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/?product_id=71&sort=relevant&page=1&count=100')
      .reply(200, sampleReviewError);

    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/meta/?product_id=71')
      .reply(200, sampleMetaError);

    const { container } = render(<Ratings
      objID={ 71 }
      generateStars = {() => { return 'stars'; }}
    />);

    await waitFor(() => {
      expect(container.getElementsByClassName('metaDataDisplay').length).toEqual(1);
      expect(container.getElementsByClassName('errorMsg').length).toEqual(2);
    });
  });

  test('happy path - should properly display data when it recieves data', async () => {
    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/?product_id=71697&sort=relevant&page=1&count=100')
      .reply(200, sampleReview);

    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/meta/?product_id=71697')
      .reply(200, sampleMeta);

    const { container } = render(<Ratings
      objID={ 71697 }
      generateStars = {() => { return 'stars'; }}
    />);

    await waitFor(() => {
      expect(container.getElementsByClassName('metadata').length).toEqual(1);
      expect(container.getElementsByClassName('userReview').length).toEqual(2);
    });
  });

  test('should respond to changes in sort by drop downs', async () => {
    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/?product_id=71697&sort=relevant&page=1&count=100')
      .reply(200, sampleReview);

    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/meta/?product_id=71697')
      .reply(200, sampleMeta);

    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/?product_id=71697&sort=newest&page=&count=5')
      .reply(200, sampleReviewsNewest);

    const { container } = render(<Ratings
      objID={ 71697 }
      generateStars = {() => { return 'stars'; }}
    />);

    fireEvent.change(container.getElementsByTagName('select')[0], {target: {value: 'newest'}});
    let options = container.getElementsByTagName('option');
    await waitFor(() => {
      expect(container.getElementsByTagName('select')[0].value).toBe(options[1].text);
    });
  });
});

describe('Testing of Metareveiws: ', () => {
  // test('Should filter ratings when a rating bar is clicked', async () => {
  //   nock('https://localhost:3000')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //     })
  //     .get('/reviews/?product_id=71697&sort=newest&page=1&count=5')
  //     .reply(200, sampleMeta);

  //   expect(true).toBeTrue;
  // });

  test('Should call the ratings filter function when a rating is clicked', async () => {
    let testClick = 0;
    const { container } = render(<MetaData
      meta={sampleMeta}
      generateStars = {() => { return 'stars'; }}
      useRatings = {() => {
        return new Promise((resolve) => {
          testClick++;
          resolve([]);
        });
      }}
    />);

    await waitFor(() => {
      let rects = container.getElementsByTagName('svg');
      fireEvent.click(rects[0]);
      expect(testClick).toBeGreaterThan(1);
    });
  });

  test('Should reset filters when the reset filters link is pressed', async () => {
    const { container } = render(<MetaRating
      data={sampleMeta.ratings}
      manipulateShape = {hf.manipulateRatings}
      useRatings = {() => {
        return new Promise((resolve) => {
          resolve([1]);
        });
      }}
    />);

    let rects = container.getElementsByTagName('rect');
    fireEvent.click(rects[0]);
    fireEvent.click(rects[1]);
    await waitFor(async () => {
      expect(getByText(container, 'Reset Filters')).toBeTruthy();
      fireEvent.click(container.getElementsByClassName('reviews-reset-filter')[0]);
      await waitFor( () => {
        expect(container.getElementsByClassName('rating-preview-list').length).toBe(0);
      });
    });
  });
});

describe('Testing of reviews', () => {
  test('Clicking on \'yes\' helpful will increment the helpful button', async () => {
    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/helpful/?review_id=1277082')
      .reply(200, true);

    const { container } = render(<ReviewCard
      generateStars={ function() { return 'stars'; }}
      key={`reviews-${1}`}
      data={sampleReview.results[0]}
    />, {wrapper: Router});

    expect(getByText(container, '(1)', {exact: false})).toBeTruthy();
    fireEvent.click(container.getElementsByClassName('reviews-helpful')[0]);
    await waitFor(() => {
      expect(getByText(container, '(2)', {exact: false})).toBeTruthy();
      fireEvent.click(container.getElementsByClassName('reviews-helpful')[0]);
      expect(getByText(container, '(2)', {exact: false})).toBeTruthy();
    });
  });

  test('Clicking on \'reported\' will change the text of reported', async () => {
    nock('http://localhost:3000')
      .defaultReplyHeaders({
        method: 'PUT',
        'access-control-allow-origin': '*',
      })
      .put("/reviews/report/?review_id=1277082")
      .reply(200, true);

    const { container } = render(<ReviewCard
      generateStars={ function() { return 'stars'; }}
      key={`reviews-${1}`}
      data={sampleReview.results[0]}

    />, {wrapper: Router});

    expect(getByText(container, 'Report', {exact: false})).toBeTruthy();
    fireEvent.click(container.getElementsByClassName('reviews-report')[0]);
    await waitFor(() => {
      expect(getByText(container, 'REPORTED', {exact: false})).toBeTruthy();
    });
  });

  test('Clicking on a review thumbnail loads a modal', async () => {
    const { container } = render(<ReviewCard
      generateStars={ function() { return 'stars'; }}
      key={`reviews-${1}`}
      data={sampleReview.results[0]}

    />, {wrapper: Router});

    expect(container.getElementsByClassName('reviews-modal').length).toBe(0);
    fireEvent.click(container.getElementsByClassName('review-thumbnail')[0]);
    await waitFor(() => {
      expect(container.getElementsByClassName('reviews-modal').length).toBe(1);
      fireEvent.click(container.getElementsByClassName('review-exit-modal')[0]);
      expect(container.getElementsByClassName('reviews-modal').length).toBe(0);
    });
    await waitFor(() => {
    });
  });
});