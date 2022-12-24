let validationRules = {
  rating: [
    [
      ((b) => { return Boolean(b); }).bind(null),
      'Overall Rating is a required field.'
    ],
  ],
  recommend: [
    [
      ((b) => { return Boolean(b); }).bind(null),
      'Recommended is a required field.'
    ]
  ],
  characteristics: [
    [
      ((characteristics) => {
        for (let y = 0; y < Object.keys(characteristics).length; y++) {
          if (!characteristics[Object.keys(characteristics)[y]]) {
            return false;
          }
        }
        return true;
      }).bind(null),
      'All characteristics are required field(s).'
    ]
  ],
  reviewSummary: [
    [
      ((b) => { return b.length <= 60; }).bind(null),
      'Review summary must not exceed 60 characters'
    ]
  ],
  reviewBody: [
    [
      ((b) => { return b.length >= 50; }).bind(null),
      'The review body must have more than 50 characters.'
    ],
    [
      ((b) => { return b.length <= 1000; }).bind(null),
      'The review body must not exceed 1000 characters.'
    ],
  ],
  nickName: [
    [
      ((b) => { return b.length <= 60; }).bind(null),
      'The nickname must not exceed 60 characters.'
    ]
  ],
  email: [
    [
      ((b) => { return (b.includes('@') && b.includes('.')); }).bind(null),
      'The email entered is not valid.',
    ],
    [
      ((b) => { return b.length <= 60; }).bind(null),
      'The email must not exceed 60 characters.'
    ]
  ]
};

const sampleDataOne = {
  rating: 1,
  recommend: true,
  characteristics: {
    fit: 1,
    size: 1,
  },
  reviewSummary: ';lasdfasdfasdfasdfasdfk',
  reviewBody: 'aasdfasdlkjhlkjhlkjhlkjhdfasdfasdfasdffdasdfdf',
  nickName: 'nickname',
  email: 'jnstendara@gmail;lkajsdf;lkjasd;lfkjas;dlfkjas;dlfkjas;ldkfjas;lkdfja;sldkfjas;ldfkjcom'
};

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

export default {
  validationRules: validationRules,
  sampleDataOne: sampleDataOne,
  expected: expected,
  sampleReview: sampleReview,
  sampleMeta: sampleMeta,
  sampleMetaError: sampleMetaError,
  sampleReviewError: sampleReviewError,
  sampleReviewsNewest: sampleReviewsNewest
};