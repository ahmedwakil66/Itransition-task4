const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'brrkgvfv2tndsqoe75pz-mysql.services.clever-cloud.com',
    user: 'ulptb6fkyafsegwv',
    password: 's11coATa57vqdUJREXqd',
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
