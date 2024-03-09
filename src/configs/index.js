require("dotenv").config();

const PORT = 3000;

const DB_CONFIG = {
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
  dialect: "postgres",
  host: "localhost",
};

console.log(DB_CONFIG);

const APP_SECRET = process.env.APP_SECRET;

module.exports = { PORT, DB_CONFIG, APP_SECRET };
