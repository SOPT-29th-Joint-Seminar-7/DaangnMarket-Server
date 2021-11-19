const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
};
