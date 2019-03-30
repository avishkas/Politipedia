const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');


app.use(express.static('./politipedia-frontend/dist/politipedia-frontend'));
// connection configurations
const mc = mysql.createConnection({
    host     : 'mydbinstance2.c4rwwzce94u4.us-east-2.rds.amazonaws.com',
    user     : 'meberlein',
    password : 'EE461LEE461L',
    database : 'Politipedia'
});

app.use(express.static('./Politipedia/politipedia-frontend/dist/politipedia-frontend'));

app.get('/candidate', (req, res) => {
    //get candidate name
   let candidateName = req.query['candidate-name'];

   //limit size of user input, for security
   if(candidateName.length > 200){
       candidateName = candidateName.substring(0, 200);
   }

   //create query
   let sqlQuery = `SELECT * FROM Candidate WHERE name='${candidateName}'`;

   //query database
   mc.query(sqlQuery, function (err, rows, fields) {
       //wdatabase error, we should log this but whatever
       if(err)
           res.status(500).send({error: "error querying for candidates"});

       //more than one candidate is queried rip
       else if(rows.length > 1)
           res.state(500).send({error: "more than one candidate queried"});

       //invalid request
       else if(rows.length === 0)
           res.status(400).send({error: "invalid request, couldn't find matching results"});

       else
           res.json(rows);
   });
   //query database;

});


app.get('/elections', (req, res) => {
    let electionYear = req.query['election-year'];
    if(electionYear.length !== 4)
        res.state(400).send({error: "Invalid year size"});

    let sqlQuery = `SELECT * FROM Election WHERE year='${electionYear}'`;
    mc.query(sqlQuery, function(err, rows, fields){
        if(err)
            res.state(500).send({error: "Issue Querying Database"});
        else if(rows.length === 0)
            res.state(400).send({error: "No matched elections"});

        else
            res.json(rows);
    });
});

app.get('/bills', (req, res) => {
    let billTitle = req.query['bill-name'];

    if(billTitle.length > 200){
        billTitle = billTitle.substring(0,200);
    }

    let sqlQuery = `SELECT * FROM Bill WHERE title='${billTitle}'`;

    mc.query(sqlQuery, function(err, rows, fields){
       if(err)
           res.state(500).send({error: 'error querying for bills'});
       else if(rows.length === 0)
           res.state(400).send({error: 'No bill names matched'});
       else
           res.json(rows);
    });
});

app.get('/donor', (req, res) => {
    let donorName=req.query['donor-name'];
    if(donorName.length > 200) {
        donorName = donorName.substring(0,200);
    }

    let sqlQuery = `SELECT * FROM Donor WHERE name='${donorName}'`;
    mc.query(sqlQuery, function (err, rows, fields) {
 
        if(err || rows.length > 1)
            res.status(500).send({error: "error querying database"});
        else
            res.json(rows);
    });
});

app.listen(port, () => console.log(`Politipedia backend server istening on port ${port}!`));






