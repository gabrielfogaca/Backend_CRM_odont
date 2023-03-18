const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'dentista.cakhynrian25.us-east-2.rds.amazonaws.com',
  user: 'root',
  password: 'root12345',
  database: 'dentista',
  port: '3306',
});

module.exports = { conexao };
