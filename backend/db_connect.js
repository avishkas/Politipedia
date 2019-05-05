const mysql = require('mysql');

const mc = mysql.createConnection({
    host: 'mydbinstance2.c4rwwzce94u4.us-east-2.rds.amazonaws.com',
    user: 'meberlein',
    password: 'EE461LEE461L',
    database: 'Politipedia'
});

module.exports = function() {
    return mc;
}
