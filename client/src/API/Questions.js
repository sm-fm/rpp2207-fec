const QuestionAPI = {
  getAllQuestions: (product_id) => {
    var options = { method: 'GET' };

    fetch(`/qa/questions/${product_id}`, options)
      .then(results => {
        console.log(results);
        return results;
      })
      .catch(err => {
        console.log(err);
      });
  },
  getAllAnswers: (question_id) => {
    var options = { method: 'GET' };

    fetch(`/qa/answers/${question_id}`, options)
      .then(results => {
        console.log(results);
        return results;
      })
      .catch(err => {
        console.log(err);
      });
  }
  addQuestion: (data) => {
    var options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(`/qa/questions`, options)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addAnswer: (question_id, data) => {
    var options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(`/qa/answers`, options)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  markQuestionHelpful: (question_id) => {
    var options = { method: 'PUT' };

    fetch(`/qa/questions/${question_id}/helpful`, options)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  markAnswerHelpful: (answer_id) => {
    var options = { method: 'PUT' };

    fetch(`/qa/answers/${answer_id}/helpful`, options)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  reportQuestion: (question_id) => {
    var options = { method: 'PUT' };

    fetch(`/qa/questions/${question_id}/report`)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  reportAnswer: (answer_id) => {
    var options = { method: 'PUT' };

    fetch(`/qa/answers/${answer_id}/report`)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

var queryBuilder = (type, data) => {
  switch(type) {
    case 'gq':
      return `/qa/q/${data.id}`;
    case 'ga':
      return `/qa/a/${data.id}`;
    case 'aq':
      return `/qa/q/${data.id}/${data.body}/${data.name}/${data.email}`;
    case 'aa':
      return `/qa/a/${data.id}/${data.body}/${data.name}/${data.email}/${JSON.stringify(data.photos)}`;
    case 'mq':
      return
  }
}

export default QuestionAPI;