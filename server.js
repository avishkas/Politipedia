const express = require('express');
const request = require('request');
const app = express();
const port = 3000;
require('dotenv').config();

const mysql = require('mysql');

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
const mc = mysql.createConnection({
    host: 'mydbinstance2.c4rwwzce94u4.us-east-2.rds.amazonaws.com',
    user: 'meberlein',
    password: 'EE461LEE461L',
    database: 'Politipedia'
});

app.use(express.static('./Politipedia/politipedia-frontend/dist/politipedia-frontend'));

app.get('/candidateBill', (req, res) => {
    let candidateName = req.query['candidate-name'];
    if (candidateName.length > 200) {
        candidateName = candidateName.substring(0, 200)
    }
    let sqlQuery = `SELECT title, vote FROM Politipedia.Candidate, Politipedia.CandidateBillVote, Politipedia.Bill WHERE Candidate.person = CandidateBillVote.candidate_id AND CandidateBillVote.bill_id = Bill.id AND name = '${candidateName}'`;
    mc.query(sqlQuery, function (err, rows, fields) {
        if (err)
            res.status(500).send({error: "error querying for candidates"});
        else if (rows.length == 0) {
            res.status(400).send({error: "invalid request, couldn't find matching results"});
        } else {
            res.json(rows);
        }
    });
});

app.get('/billCandidate', (req, res) => {
    let billId = req.query['bill-id'];
    console.log(billId);
    let sqlQuery = `SELECT * FROM (SELECT * FROM CandidateBillVote WHERE bill_id=${billId}) temp INNER JOIN Candidate ON temp.candidate_id = Candidate.person`;
    mc.query(sqlQuery, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).send({error: "error querying candidates and bills"});
        } else if (rows.length == 0) {
            res.status(400).send({error: "invalid request, couldn't find matching results"});
        } else {
            res.json(rows);
        }
    });
});

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


app.get('/candidate', (req, res) => {
    //get candidate name
    let candidateName = req.query['candidate-name'];

    //limit size of user input, for security
    if (candidateName.length > 200) {
        candidateName = candidateName.substring(0, 200);
    }

    //create query
    let sqlQuery = `SELECT * FROM Candidate WHERE name LIKE '%${candidateName}%'`;

    //query database
    mc.query(sqlQuery, function (err, rows, fields) {
        //wdatabase error, we should log this but whatever
        if (err)
            res.status(500).send({error: "error querying for candidates"});

        //invalid request
        else if (rows.length === 0)
            res.status(400).send({error: "invalid request, couldn't find matching results"});

        else
            res.json(rows);
    });
    //query database;

});


app.get('/elections', (req, res) => {
    let electionYear = req.query['election-year'];
    if (electionYear.length !== 4) {
        res.status(400).send({error: "Invalid year size"});
        return;
    }

    let sqlQuery = `SELECT * FROM Election WHERE year='${electionYear}'`;
    mc.query(sqlQuery, function (err, rows, fields) {
        if (err)
            res.status(500).send({error: "Issue Querying Database"});
        else if (rows.length === 0)
            res.status(400).send({error: "No matched elections"});

        else
            res.json(rows);
    });
});

app.get('/bills', (req, res) => {
    let billTitle = req.query['bill-name'];

    if (billTitle.length > 200) {
        billTitle = billTitle.substring(0, 200);
    }

    let sqlQuery = `SELECT * FROM Bill WHERE title LIKE '%${billTitle}%'`;

    mc.query(sqlQuery, function (err, rows, fields) {
        if (err)
            res.status(500).send({error: 'error querying for bills'});
        else if (rows.length === 0)
            res.status(400).send({error: 'No bill names matched'});
        else
            res.json(rows);
    });
});

app.get('/contribution', (req, res) => {
    let donorName = req.query['donor-name'];
    if (donorName.length > 200) {
        donorName = donorName.substring(0, 200);
    }

    let sqlQuery = `SELECT * FROM Contribution WHERE donor='${donorName}'`;
    mc.query(sqlQuery, function (err, rows, fields) {
        if (err)
            res.status(500).send({error: 'error querying for donors'});
        else if (rows.length == 0)
            res.status(400).send({error: 'No donor names matched'});
        else
            res.json(rows);
    });
});

app.get('/contributorsGivenCandidate', (req, res) => {
    let candidateName = req.query['candidate-name'];
    if (candidateName.length > 200) {
        candidateName = candidateName.substring(0, 200);
    }
    //console.log(candidateName);
    let sqlQuery = `SELECT * FROM Contribution WHERE name='${candidateName}' ORDER BY Contribution.contribution DESC`;
    mc.query(sqlQuery, function (err, rows, fields) {
        if (err)
            res.status(500).send({error: 'error querying for contributors given candidate name'});
        else if (rows.length == 0)
            res.status(400).send({error: 'No candidate names matched'});
        else {
            if (rows.length === 1) {
                rows.push({
                    "name": "--",
                    "donor": "--",
                    "contribution": "--"
                });
                rows.push({
                    "name": "--",
                    "donor": "--",
                    "contribution": "--"
                });
            } else if (rows.length === 2) {
                rows.push({
                    "name": "--",
                    "donor": "--",
                    "contribution": "--"
                });
            }

            res.json(rows);

        }

    });
});

app.get('/donor', (req, res) => {
    let donorName = req.query['donor-name'];
    if (donorName.length > 200) {
        donorName = donorName.substring(0, 200);
    }

    let sqlQuery = `SELECT Contribution.donor FROM Contribution WHERE donor LIKE '%${donorName}%'`;
    mc.query(sqlQuery, function (err, rows, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err)
            res.status(500).send({error: 'error querying for donors'});
        else if (rows.length == 0)
            res.status(400).send({error: 'No donor names matched'});
        else {
            let toReturn = [];
            let seenDonorNames = new Set();
            for (let i = 0; i < rows.length; i++) {
                if (!seenDonorNames.has(rows[i]["donor"])) {
                    seenDonorNames.add(rows[i]["donor"]);
                    toReturn.push({"name": rows[i]["donor"]});
                }
            }
            res.json(toReturn);
        }
    });
});

app.listen(port, () => console.log(`Politipedia backend server istening on port ${port}!`));






