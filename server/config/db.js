var mysql = require("mysql");
require("dotenv").config();

// set the connection with .env at /server
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Conexión correcta");
  }
});

module.exports = connection;
