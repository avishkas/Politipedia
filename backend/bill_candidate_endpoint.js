var mc = require('./db_connect')();

module.exports = function(app) {
    app.get('/billCandidate', (req, res) => {
        let billId = req.query['bill-id'];
        //console.log(billId);
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
}

