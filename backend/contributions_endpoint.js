var mc = require('./db_connect')();

module.exports = function(app) {
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
}