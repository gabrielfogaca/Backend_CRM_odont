// const express = require('express');
const mysql = require('mysql2/promise');

const config = {
  host: '34.122.114.73',
  user: 'root',
  password: 'root123',
  database: 'dentista',
  port: '3306',
};

module.exports = { mysql, config };
