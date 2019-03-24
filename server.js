const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host     : 'mydbinstance2.c4rwwzce94u4.us-east-2.rds.amazonaws.com',
    user     : 'meberlein',
    password : 'EE461LEE461L',
    database : 'Politipedia'
});

app.use(express.static('./Politipedia/politipedia-frontend/dist/politipedia-frontend'));

app.get('/callme', (req, res) => res.send('Hello World!'));

app.get('/search/candidate', (req, res) => {
   var candidateName = req.query['candidate-name'];

   mc.query("Select * from Candidate", function (err, rows, fields) {


       if(err)
           res.status(500).send({error: "error querying database"});

       res.json(rows);
   });
   //query database;

});

app.get('/search/elections', (req, res) => {
    var electionYear = req.query('election-year');

});

app.get('/search/bills', (req, res) => {
});

app.get('/search/donor', (req, res) => {

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));








