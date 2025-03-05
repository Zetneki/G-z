const Pool = require("pg").Pool;

const pool = new Pool({
  user: "your_username", // Replace with your PostgreSQL username
  host: "localhost", // If you're running PostgreSQL locally, the host will be 'localhost'
  database: "your_database_name", // Replace with your database name
  password: "your_password", // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port is 5432
  ssl: {
    rejectUnauthorized: false, // Usually false for local databases
  },
});

module.exports = pool;
