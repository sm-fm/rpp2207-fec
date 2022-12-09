const questionAPI = {
  getAllQuestions: (product_id) => {
    var options = { method: 'GET' };

    return fetch(`/qa/questions/${product_id}`, options)
      .then(results => {
        return results.json();
      })
      .then(results => {
        console.log(results);
        return results.results;
      })
      .catch(err => {
        console.log(err);
      });
  },

  getAllAnswers: (question_id) => {
    var options = { method: 'GET' };

    return fetch(`/qa/answers/${question_id}`, options)
      .then(results => {
        return results.json();
      })
      .then(results => {
        console.log(results);
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

  markHelpful: (type, id) => {
    var options = { method: 'PUT' };

    return fetch(`/qa/${type}/${id}/helpful`, options)
      .then(results => {
        return results;
      })
      .catch(err => {
        return err;
      });
  },

  report: (type, id) => {
    var options = { method: 'PUT' };

    return fetch(`/qa/${type}/${id}/report`)
      .then(results => {
        return results;
      })
      .catch(err => {
        return err;
      });
  }
};

export default questionAPI;