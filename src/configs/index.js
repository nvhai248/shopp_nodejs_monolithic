const fs = require("fs");

require("dotenv").config();

const PORT = 8080;

const DB_CONFIG = {
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
  dialect: "postgres",
  host: "localhost",
};

const REDIS_CONFIG = {
  host: process.env.REDIS_HOST,
  socket: {
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};

const REDIS_URL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_USER_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const APP_SECRET = process.env.APP_SECRET;

const ELASTIC_CONFIG = {
  node: process.env.ES_HOST,
  auth: {
    username: process.env.ES_USERNAME,
    password: process.env.ES_PW,
  },
  tls: {
    ca: fs.readFileSync("http-cert.crt"),
    rejectUnauthorized: false,
  },
};

module.exports = {
  PORT,
  DB_CONFIG,
  APP_SECRET,
  REDIS_CONFIG,
  REDIS_URL,
  ELASTIC_CONFIG,
};
