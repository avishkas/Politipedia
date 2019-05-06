const express = require('express');

const app = express();
const port = 3000;
require('./donors_endpoint')(app);
require('./contributors_given_candidate_endpoint')(app);
require('./contributions_endpoint')(app);
require('./bills_endpoint')(app);
require('./elections_endpoint')(app);
require('./candidate_endpoint')(app);
require('./bill_candidate_endpoint')(app);
require('./c_bill_endpoint')(app);
require('./twitter_endpoint')(app);
require('./google_image_endpoint')(app);

require('dotenv').config();






app.use(express.static('../politipedia-frontend/dist/politipedia-frontend'));
// connection configurations

app.listen(port, () => console.log(`Politipedia backend server listening on port ${port}!`));






