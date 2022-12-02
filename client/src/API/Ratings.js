const Ratings = {
  getReviewMetadata: (id) => {
    return fetch(`reviews/meta?product_id=${id}`)
      .then(results => {
        return results.json();
      });
  }
};

export default Ratings;