import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import Router from 'react-router-dom';
import RatingsAPI from '../client/src/API/Ratings.js';
import hf from '../client/src/components/Ratings/helperFunctions.js';
import nock from 'nock';
import ReviewCard from '../client/src/components/Ratings/ReviewCard.jsx';
import Ratings from '../client/src/components/Ratings/Ratings.jsx'
var expected = [
  {
    "product": "71697",
    "page": 0,
    "count": 5,
    "results": [
      {
        "review_id": 1277082,
        "rating": 3,
        "summary": "really like it ",
        "recommend": true,
        "response": null,
        "body": "really like it really like it really like it really like it ",
        "date": "2022-10-23T00:00:00.000Z",
        "reviewer_name": "test",
        "helpfulness": 1,
        "photos": [
          {
            "id": 2456443,
            "url": "http://res.cloudinary.com/dwcubhwiw/image/upload/v1666565658/cmyyueiv89d6l1cywtoy.png"
          }
        ]
      },
      {
        "review_id": 1277442,
        "rating": 5,
        "summary": "wer",
        "recommend": true,
        "response": null,
        "body": "sdfwerewtrretreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "date": "2022-10-31T00:00:00.000Z",
        "reviewer_name": "asd",
        "helpfulness": 1,
        "photos": []
      },
      {
        "review_id": 1277436,
        "rating": 5,
        "summary": "good",
        "recommend": true,
        "response": null,
        "body": "very good very good very good very good very good very good",
        "date": "2022-10-30T00:00:00.000Z",
        "reviewer_name": "Hi",
        "helpfulness": 0,
        "photos": []
      },
      {
        "review_id": 1276246,
        "rating": 3,
        "summary": "It's okay",
        "recommend": true,
        "response": null,
        "body": "This product is not great, it is not bad, it is just ok. ",
        "date": "2022-08-27T00:00:00.000Z",
        "reviewer_name": "test",
        "helpfulness": 0,
        "photos": []
      },
      {
        "review_id": 1276245,
        "rating": 4,
        "summary": "Ok",
        "recommend": true,
        "response": null,
        "body": "Not great, not bad, just ok. I would not buy it again. ",
        "date": "2022-08-27T00:00:00.000Z",
        "reviewer_name": "test",
        "helpfulness": 0,
        "photos": []
      }
    ]
  },
  {
    "product_id": "71697",
    "ratings": {
      "1": "20",
      "2": "19",
      "3": "38",
      "4": "43",
      "5": "86"
    },
    "recommended": {
      "false": "54",
      "true": "152"
    },
    "characteristics": {
      "Fit": {
        "id": 240582,
        "value": "3.3630573248407643"
      },
      "Length": {
        "id": 240583,
        "value": "3.2564102564102564"
      },
      "Comfort": {
        "id": 240584,
        "value": "3.4591194968553459"
      },
      "Quality": {
        "id": 240585,
        "value": "3.5844155844155844"
      }
    }
  }
];

let sampleReview = {
  "product": "71697",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 1277082,
      "rating": 3,
      "summary": "really like it ",
      "recommend": true,
      "response": null,
      "body": "really like it really like it really like it really like it ",
      "date": "2022-10-23T00:00:00.000Z",
      "reviewer_name": "test",
      "helpfulness": 1,
      "photos": [
        {
          "id": 2456443,
          "url": "http://res.cloudinary.com/dwcubhwiw/image/upload/v1666565658/cmyyueiv89d6l1cywtoy.png"
        }
      ]
    }
  ]
};

let sampleMetaError = {
  "product_id": "71",
  "ratings": {},
  "recommended": {},
  "characteristics": {}
};

let sampleReviewError = {
  "product": "71",
  "page": 0,
  "count": 5,
  "results": []
};

// test('getAll returns metadata and customer reviews', async () => {
//   var results = await RatingsAPI.getAll(71697);
//   expect(results.length).toBe(2);
//   expect(results[0].product).toEqual(expected[0].product);
//   expect(results[1].product).toStrictEqual(expected[1].product);
// });

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
    1: {'votes': 20, 'ratio': 1.00}
  });
  expect(hf.manipulateRatings({1: '20', 2: '20'})).toStrictEqual({
    1: {'votes': 20, 'ratio': 0.50},
    2: {'votes': 20, 'ratio': 0.50}
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

describe("ReviewCard component", () => {
  it('tests the data being passed to ReviewCard is on the screen', async () => {
    const { container } = render(<ReviewCard
      generateStars={ function() { return 'stars'; }}
      key={`reviews-${1}`}
      data={sampleReview.results[0]}
    />, {wrapper: Router});

    await waitFor(() => {
      expect(container.getElementsByClassName('userReview').length).toEqual(1);
    });
  });

});

describe('General test of the Ratings component', () => {
  it('Should not break when the API does not return the proper data', async () => {
    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/?product_id=71')
      .reply(200, sampleReviewError);

    nock('http://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/meta/?product_id=71')
      .reply(200, sampleMetaError);

    const { container } = render(<Ratings
      objId={ 71 }
      generateStars = {() => { return 'stars'; }}
    />);

    await waitFor(() => {
      expect(container.getElementsByClassName('metaDataDisplay').length).toEqual(1);
      expect(container.getElementsByClassName('errorMsg').length).toEqual(2);
    });
  });
});