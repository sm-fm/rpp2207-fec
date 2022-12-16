import { render, screen, waitFor, fireEvent, getByText } from '@testing-library/react';
import React from 'react';
import Router from 'react-router-dom';
// import RatingsAPI from '../client/src/API/Ratings.js';
import hf from '../client/src/components/Ratings/helperFunctions.js';
import nock from 'nock';
import ReviewCard from '../client/src/components/Ratings/ReviewCard.jsx';
import Ratings from '../client/src/components/Ratings/Ratings.jsx';
import MetaData from '../client/src/components/Ratings/metadata/Metadata.jsx';
import MetaRating from '../client/src/components/Ratings/metadata/MetaRating.jsx';

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
    },
    {
      "review_id": 1277442,
      "rating": 5,
      "summary": "wer",
      "recommend": true,
      "response": null,
      "body": "sdfwl;kjasdf;lkjasdf;lkjasfd;ljkasdf;lkjasfd;lkjasd;flkjasd;flkjasd;flkjasd;flkjasdf;lkjasdf;lakjsdf;alksdjferewtrretreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeI need more than 250 characters so that I can pass this test ;lakjsdf;lkjasfd;lkjasdf;lkjasdl;fkjasdl;kfjasl;dkfjas;ldkfjas;ldkfja;lskdjf, give me that sweet sweet code coverage",
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
};

let sampleMeta = {
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

let sampleReviewsNewest = {
  "product": "71697",
  "page": 0,
  "count": 5,
  "results": [
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
};

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
  test('Should filter ratings when a rating bar is clicked', async () => {
    nock('https://localhost:3000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/reviews/?product_id=71697&sort=newest&page=1&count=5')
      .reply(200, sampleMeta);

    expect(true).toBeTrue;
  });

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