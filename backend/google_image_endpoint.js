const request = require('request');

require('dotenv').config();

module.exports = function (app) {

    app.get('/getImage', (req, res) => {
        let searchQuery = req.query['candidate-name'];

        request(`https://www.googleapis.com/customsearch/v1?key=${process.env.GAE_KEY}&q=${searchQuery}&imgSize=large&imgType=face&num=1&searchType=image`, function (error, response, body) {

            res.setHeader('Content-Type', 'application/json');


            if (error == null && response.statusCode === 200) {
                let jsonBody = JSON.parse(body);
                let img = [jsonBody["items"][0]["link"]];
                res.send(JSON.stringify(img));
            }


            else {
                let err = {err: body};
                res.send(JSON.stringify(err));
            }
        });

    });
}