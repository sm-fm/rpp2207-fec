const env = require('dotenv');
const fetch = require("node-fetch");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config()

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PATH = 3000;
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
const getOptions =
{
  method: 'GET',
  headers: {
    'Authorization': process.env.GITHUB_ACCESS_TOKEN
  }
}

// API ROUTES
app.get('/products', (req, res) => {
  fetch(`${baseURL}/products`, getOptions)
  .then(results => {
    return results.json();
  })
  .then(results => {
    res.status(200).send(results);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/products/:query(*)', (req, res) => {
  fetch(`${baseURL}/products/${req.params.query}`, getOptions)
  .then(results => {
    return results.json();
  })
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/reviews', (req, res) => {
  fetch(`${baseURL}/reviews/?product_id=${req.query.product_id}`, getOptions)
  .then(results => {
    return results.json();
  })
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/reviews/meta', (req, res) => {
  fetch(`${baseURL}/reviews/meta/?product_id=${req.query.product_id}`, getOptions)
  .then(results => {
    return results.json();
  })
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/qa/questions', (req, res) => {
  fetch(`${baseURL}/qa/questions/?product_id=${req.query.product_id}`, getOptions)
  .then(results => {
    return results.json();
  })
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/qa/questions/:query(*)', (req, res) => {
  fetch(`${baseURL}/qa/questions/${req.params.query}`, getOptions)
  .then(results => {
    return results.json();
  })
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    console.log(err);
  });
})




// PRODUCT ID ROUTE
app.get('/:id', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '..', 'client', 'dist')})
})

app.listen(PATH, () => {
  console.log(`Server listening to port: ${PATH}`);
})