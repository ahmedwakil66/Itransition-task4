const db = require("./models/db");

const createUsersTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            last_login_time TIMESTAMP NOT NULL,
            registration_time TIMESTAMP NOT NULL,
            status VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Users table created successfully.");
    }
  });
};

// Call the function to create the table
createUsersTable();
