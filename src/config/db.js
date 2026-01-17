const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3307,
  database: "retail_store"
});

module.exports = db;
