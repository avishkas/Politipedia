var mc = require('./db_connect')();

module.exports = function(app) {
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
}
