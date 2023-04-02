// const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

console.log(
  process.env.DB_HOST,
  process.env.DB_USERNAME,
  process.env.PASSWORD,
  process.env.DBNAME,
);

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
  port: '3306',
};

module.exports = { mysql, config };
