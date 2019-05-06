require('dotenv').config();

var config = {
    "consumerKey": process.env.consumerKey,
    "consumerSecret": process.env.consumerSecret,
    "accessToken": process.env.accessToken,
    "accessTokenSecret": process.env.accessTokenSecret,
    "callBackUrl": "http://localtest.me"
}

var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter(config);

module.exports = function (app) {
    app.get('/getTwitter', (req, res) => {

        let searchQuery = req.query['query-string'];

        //Strategy Pattern: error
        var error = function (err, response, body) {
            console.log('ERROR [%s]', err);
            res.status(400).send({error: "error querying for candidate twitter"});
        };

        //Strategy pattern: Success
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
}
