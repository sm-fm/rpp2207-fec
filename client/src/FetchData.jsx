import React from 'react';
import OverviewAPI from './API/Overview.js';
import QuestionsAPI from './API/Questions.js';
import RatingsAPI from './API/Ratings.js';
import RelatedAPI from './API/Related.js';

const FetchData = (WrappedComponent, id) => {

  class WithData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '',
        product: {},
        avgRatings: '',
        styles: {},
        chosenStyle: {},
        photos: {},
        toggleClick: '',
        skus: {},
        reviews: {},
        data: {},
        questions: {},
        allData: {},
        reviewData: {},
        metaData: {},
        relatedProducts: {},
        currentProduct: {},
        yourOutfit: [],
        fetching: true,
        error: false
      };
    }

    componentDidMount() {
      this.setState({ id });
      OverviewAPI.getProductById(id)
        .then(result => {
          return result.json();
        })
        .then(result => {
          this.setState({product: result});
          return RatingsAPI.getReviewMetadata(result.id);
        })
        .then(metadata => {
          this.setState({avgRatings: OverviewAPI.getAverageRating(metadata.ratings)});
          return OverviewAPI.getStylesById(metadata.product_id);
        })
        .then(styles => {
          return styles.json();
        })
        .then(styles => {
          this.setState({
            styles: styles.results,
            chosenStyle: styles.results[0],
            photos: styles.results[0].photos,
            toggleClick: styles.results[0].name,
            skus: styles.results[0].skus
          });
          return OverviewAPI.getAllReviews(styles.product_id);
        })
        .then(reviews => {
          this.setState({ reviews });
          return RatingsAPI.getReviewList(reviews.product, 'relevant', 1, 100);
        })
        .then(data => {
          this.setState({
            allData: data
          });
          return RatingsAPI.getAll(data.product);
        })
        .then(data => {
          this.setState({
            metaData: data[1],
            reviewData: data[0],
            allData: data[0]
          });
          return QuestionsAPI.getAllQuestions(data[0].product);
        })
        .then(results => {
          this.setState({
            data: results,
            questions: results
          });
          return RelatedAPI.getRelatedProducts(id);
        })
        .then(products => {
          var productsMap = new Map();
          products.forEach(product => productsMap.set(product.id, product));
          this.setState({
            relatedProducts: [...productsMap.values()]
          });
        })
        .then(() => {
          this.setState({fetching: false});
        })
        .catch(err => {
          console.log(err);
          this.setState({error: true});
        });
    }


    render() {
      if (this.state.error) {
        return <p>There was an error fetching the data</p>;
      }
      if (!this.state.fetching) {
        return <WrappedComponent data={this.state} {...this.props} />;
      } else {
        return <p>Loading...</p>;
      }
    }
  }
  return WithData;
};

export default FetchData;