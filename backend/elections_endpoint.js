var mc = require('./db_connect')();

module.exports = function(app) {
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
}