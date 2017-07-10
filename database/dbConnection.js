const pgp = require('pg-promise')();
require('dotenv').config();

const connection = {
  host: process.env.HEROKU_HOST,
  user: process.env.HEROKU_USER,
  password: process.env.HEROKU_PW,
  database: process.env.HEROKU_DB,
  ssl: true
  //host: 'ec2-23-23-225-12.compute-1.amazonaws.com',
  //port: 5432,
  //user: 'zsjbvcklijjzdx',
  //password: 'fe8f0ebfb82c2089887522ba9532b51ce1ae4005b2707f63d54b75097ec72b7d',
  //database: 'db7tvip5ooa815',
};

const db = pgp(connection);
module.exports = db;
