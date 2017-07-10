const pgp = require('pg-promise')();
require('dotenv').config(); //TODO use dbUrl from config env to create fallback config for local development

const connection = {
  host: process.env.HEROKU_HOST,
  user: process.env.HEROKU_USER,
  password: process.env.HEROKU_PW,
  database: process.env.HEROKU_DB,
  ssl: true
};

const db = pgp(connection);
module.exports = db;
