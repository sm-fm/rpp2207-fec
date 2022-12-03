const QuestionAPI = {
  getAllQuestions: (id) => {
    fetch(`/qa/questions/${id}`)
      .then(results => {
        console.log(results);
        return results;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default QuestionAPI;