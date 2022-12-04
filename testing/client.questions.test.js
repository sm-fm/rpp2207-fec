import QuestionAPI from '../client/src/API/Overview.js';
const fetch = require('node-fetch');

const exampleQuestion = {
  "product_id": "71697",
  "results": [
      {
          "question_id": 642705,
          "question_body": "test test test?",
          "question_date": "2022-08-26T00:00:00.000Z",
          "asker_name": "not_ricky",
          "question_helpfulness": 12,
          "reported": false,
          "answers": {
              "5989327": {
                  "id": 5989327,
                  "body": "How are U doing mate",
                  "date": "2022-10-29T00:00:00.000Z",
                  "answerer_name": "theBomb.com",
                  "helpfulness": 4,
                  "photos": [
                      "https://res.cloudinary.com/dskwqzkmr/image/upload/v1667073383/jmibjnrbgthkephusi6t.png",
                      "https://res.cloudinary.com/dskwqzkmr/image/upload/v1667073383/kh1hhlqxdbftxsn4t4ee.jpg"
                  ]
              },
              "5989374": {
                  "id": 5989374,
                  "body": "asdf",
                  "date": "2022-11-02T00:00:00.000Z",
                  "answerer_name": "asdf",
                  "helpfulness": 0,
                  "photos": []
              },
              "5989375": {
                  "id": 5989375,
                  "body": "dsf",
                  "date": "2022-11-02T00:00:00.000Z",
                  "answerer_name": "dsf",
                  "helpfulness": 0,
                  "photos": []
              }
          }
      }
  ]
};

test('getAllQuestions returns correct data', async () => {
  var expected = {
    "product_id": "71697"
    "question_id": 642705,
    "question_body": "test test test?",
  };
  var actual = await QuestionAPI.getAllQuestions(71697);

  expect(actual.product_id).toStrictEqual(expected.product_id);
  expect(actual.results[0].question_id).toStrictEqual(expected.question_id);
  expect(actual.results[0].question_body).toStrictEqual(expected.question_body);
});

test('getAllAnswers returns correct data', async () => {
  var expected = {
    q_id: 642705,
    len: 3,
    id_1: 5989327,
    id_2: 5989374,
    id_3: 5989375
  };
  var actual = await QuestionAPI.getAllAnswers(642705);

  expect(actual.question).toStrictEqual(expected.q_id);
  expect(actual.results.length).toStrictEqual(expected.len);
  expect(actual.results[0].answer_id).toStrictEqual(expected.id_1);
  expect(actual.results[1].answer_id).toStrictEqual(expected.id_2);
  expect(actual.results[2].answer_id).toStrictEqual(expected.id_3);
});