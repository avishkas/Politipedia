var mc = require('./db_connect')();

module.exports = function(app) {
    app.get('/bills', (req, res) => {
        let billTitle = req.query['bill-name'];
    
        if (billTitle.length > 200) {
            billTitle = billTitle.substring(0, 200);
        }
    
        let sqlQuery = `SELECT * FROM Bill WHERE title LIKE '%${billTitle}%'`;
    
        mc.query(sqlQuery, function (err, rows, fields) {
            if (err)
                res.status(500).send({error: 'error querying for bills'});
            else if (rows.length === 0)
                res.status(400).send({error: 'No bill names matched'});
            else
                res.json(rows);
        });
    });
}