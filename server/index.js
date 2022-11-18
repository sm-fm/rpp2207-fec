let env = require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
// For some reason I am getting an issue that I am not
//   permitted to access the .env file - so I'm not sure
//   what to do about that. I think we should come back
//   we will definitely need to use this for the API token

// I install the dotenv already
// const PATH = process.env.PATH;

const PATH = 3000;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))


app.get('/', (req, res) => {
  res.redirect('./index.html');
})

app.listen(PATH, () => {
  console.log(`Server listening to port: ${PATH}`);
})