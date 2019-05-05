var mc = require('./db_connect')();

module.exports = function(app) {
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
}