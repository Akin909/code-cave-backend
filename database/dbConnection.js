const pgp = require('pg-promise')();
require('dotenv').config(); //TODO use dbUrl from config env to create fallback config for local development

const herokuDB = {
  host: process.env.HEROKU_HOST,
  user: process.env.HEROKU_USER,
  password: process.env.HEROKU_PW,
  database: process.env.HEROKU_DB,
  ssl: true
};

const localDB = {
  host: 'localhost',
  port: 5432,
  database: 'code_cave'
};

const connection = process.env.NODE_ENV === 'production' ? herokuDB : localDB;

const db = pgp(connection);
module.exports = db;
