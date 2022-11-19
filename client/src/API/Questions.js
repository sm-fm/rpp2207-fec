const Questions = {
  getAllQuestions: () => {
    fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions', {
      method: 'GET',
      headers: {
        'Authorization': GITHUB_ACCESS_TOKEN
      }
    })
    .then(results => {
      return results.json();
    })
    .then(results => {
      console.log(results);
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export default Questions;