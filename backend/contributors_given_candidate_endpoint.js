var mc = require('./db_connect')();

function doQuery(sqlQuery, res){
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
  }

module.exports = function(app) {
    app.get('/contributorsGivenCandidate', (req, res) => {
        let candidateName = req.query['candidate-name'];
        if (candidateName.length > 200) {
            candidateName = candidateName.substring(0, 200);
        }
        var firstName;
        var lastName;
        var nameArray = candidateName.split(" ");
        if (nameArray.length> 2) {
            firstName = candidateName.split(" ")[0];
            if ((candidateName.endsWith("Jr.") || candidateName.endsWith("III") || candidateName.endsWith("IV"))) {
                lastName = nameArray[nameArray.length - 2];
            } else {
                lastName = nameArray[nameArray.length - 1];
            }
            //candidateName = firstName + " " + lastName;
        } else {
            firstName = nameArray[0];
            lastName = nameArray[1];
        }
        //console.log(candidateName);
        let sqlQuery = `SELECT * FROM Contribution WHERE name LIKE '${firstName}%${lastName}' ORDER BY Contribution.contribution DESC`;
        doQuery(sqlQuery, res);
    });
}