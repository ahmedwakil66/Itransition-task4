const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'brrkgvfv2tndsqoe75pz-mysql.services.clever-cloud.com',
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: 'brrkgvfv2tndsqoe75pz',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

module.exports = db;
