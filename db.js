/* eslint-disable @typescript-eslint/no-require-imports */
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "electronic_computer_store",
});

module.exports = pool;
