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
//console.log("1");
app.get('/candidate', (req, res) => {
   let candidateName = req.query['candidate-name'];
   //console.log("2");
   if(candidateName.length > 200){
       candidateName = candidateName.substring(0, 200);
   }
   //console.log("3");
   let split = candidateName.split(" ");
   let firstName = split[0];
   let lastName = "";
   for(let i = 1; i < split.length; i++){
       if(i === split.length - 1){
           lastName += split[i];
       }else{
           lastName += split[i] + " ";
       }
   }
   //console.log(firstName);
   //console.log(lastName);

   let sqlQuery = "SELECT * FROM Candidate WHERE first_name=" + firstName + " AND last_name=" + lastName;

   //query candidate
   mc.query(sqlQuery, function (err, rows, fields) {
       if(err || rows.length > 1)
           res.status(500).send({error: "error querying database"});


       //get candidate_id

       //use it to query related bills

       //get list of bills

       res.json(rows);
   });
   //query database;

});

app.get('/elections', (req, res) => {
    var electionYear = req.query('election-year');

});

app.get('/bills', (req, res) => {
});

app.get('/donor', (req, res) => {

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));








