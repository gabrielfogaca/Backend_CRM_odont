const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '34.122.114.73',
  user: 'root',
  password: 'root123',
  database: 'dentista',
  port: '3306',
});

connection.connect(function (err) {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }

  console.log('Conexão bem-sucedida ao banco de dados!');
});

connection.query('SELECT * FROM usuarios', function (err, results, fields) {
  if (err) {
    console.error('Erro ao executar consulta: ' + err.stack);
    return;
  }

  console.log('Resultado da consulta: ', results);
});

connection.end(function (err) {
  if (err) {
    console.error('Erro ao fechar conexão com banco de dados: ' + err.stack);
    return;
  }

  console.log('Conexão com banco de dados fechada.');
});
