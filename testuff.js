let reviewFormValidation = (inputData, validationRules) => {
  let errors = {};
  const createPredicate = ([test, errMsg]) => {
    return (a) => {
      return test(a) ? null : errMsg;
    };
  };

  let currentElement, validations, testResult;
  for (let i = 0; i < Object.keys(validationRules).length; i++) {
    currentElement = Object.keys(validationRules)[i];
    for (let j = 0; j < validationRules[currentElement].length; j++) {
      validations = createPredicate(validationRules[currentElement][j]);
      testResult = validations(inputData[currentElement]);
      if (testResult) {
        if (errors[currentElement] === undefined) {
          errors[currentElement] = testResult;
        } else {
          errors[currentElement] = [errors[currentElement], testResult];
        }
      }
    }
  }
  return errors;
};


const validationRules = {
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
console.log(reviewFormValidation(sampleDataOne, validationRules));