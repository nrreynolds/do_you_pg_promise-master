//Database model, so its always referencing the same connection

//install dependencies
const express = require('express'),
  app = express(),
  bdPars = require('body-parser'),
  pgp = require('pg-promise')(),
  // connect to the underlying database
  db = pgp(
    process.env.DATABASE_URL
    // get db location
    || 'postgres://jackie@localhost:5432/hogwarts_crud');

// set up body parser
app.use(bdPars.urlencoded({
  extended: false
}));
app.use(bdPars.json());

// export db and pgp
module.exports = {
  db: db,
  pgp: pgp
};
