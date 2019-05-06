const express = require('express');
const request = require('request');

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
require('dotenv').config();



var Twitter = require('twitter-node-client').Twitter;

var config = {
    "consumerKey": "rsM8Uj6SV4F8BZJyxWhyGU7Yu",
    "consumerSecret": "Fw4M7s7GrsXjgQMp1PIN13z19KHYFVuMm5yh2QBDH1UFOJ36vP",
    "accessToken": "1120055016906285057-eQxPz5VoB91xYQhDgIkBgRlS8D3M0C",
    "accessTokenSecret": "nAEdgJpexImPexdcnRwa6RLVBF8TJsuKfEvZLYMtsRPKz",
    "callBackUrl": "http://localtest.me"
}

var twitter = new Twitter(config);

app.use(express.static('./politipedia-frontend/dist/politipedia-frontend'));
// connection configurations


app.use(express.static('../politipedia-frontend/dist/politipedia-frontend'));

app.get('/getImage', (req, res) => {
    let searchQuery = req.query['candidate-name'];

    request(`https://www.googleapis.com/customsearch/v1?key=${process.env.GAE_KEY}&q=${searchQuery}&imgSize=large&imgType=face&num=1&searchType=image`, function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        if (error == null && response.statusCode === 200) {
            let jsonBody = JSON.parse(body);
            let img = [jsonBody["items"][0]["link"]];
            res.send(JSON.stringify(img));
        } else {
            let err = {err: body};
            res.send(JSON.stringify(err));
        }
    });

});

app.get('/getTwitter', (req, res) => {

    let searchQuery = req.query['query-string'];

    //Callback functions
    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
        res.status(400).send({error: "error querying for candidate twitter"});
    };
    var success = function (data) {
        // console.log('Data [%s]', data);


        jsondata = JSON.parse(data);

        if (jsondata[0] == undefined) {
            res.status(400);
            res.send();
        } else {
            res.status(200);
            res.send(JSON.stringify([jsondata[0]['screen_name']]));
        }
    };

    twitter.getCustomApiCall('/users/search.json', {'q': searchQuery, 'page': 1, 'count': 1}, error, success);
});

app.listen(port, () => console.log(`Politipedia backend server istening on port ${port}!`));






