const fetch = require('node-fetch');

const questionAPI = {
  getAllQuestions: (productId) => {
    var options = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    return fetch(`qa/questions/${productId}`, options)
      .then(results => {
        return results.json();
      })
      .then(results => {
        return results.results;
      })
      .catch(err => {
        console.log(err);
      });
  },

  getAllAnswers: (questionId) => {
    var options = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    return fetch(`qa/answers/${questionId}`, options)
      .then(results => {
        return results.json();
      })
      .then(results => {
        return results.results;
      })
      .catch(err => {
        console.log(err);
      });
  },

  addQuestion: (data) => {
    var options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    fetch('qa/questions', options)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },

  addAnswer: (questionId, data) => {
    var options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    fetch('qa/answers', options)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },

  markHelpful: (type, id) => {
    var options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return fetch(`qa/${type}/${id}/helpful`, options)
      .then(results => {
        return results;
      })
      .catch(err => {
        return err;
      });
  },

  report: (type, id) => {
    var options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return fetch(`qa/${type}/${id}/report`, options)
      .then(results => {
        return results;
      })
      .catch(err => {
        return err;
      });
  }
};

export default questionAPI;