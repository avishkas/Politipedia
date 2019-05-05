var mc = require('./db_connect')();

module.exports = function(app) {
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
}
