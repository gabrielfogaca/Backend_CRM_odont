//Incluir a dependencia MySQL
const mysql = require('mysql2');

//Criar a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'gifted-loader-380716:southamerica-east1:root',
  socketPath: 'p216654426181-so0cr2@gcp-sa-cloud-sql.iam.gserviceaccount.com',
  user: 'root',
  password: 'root',
  database: 'dentista',
});

// connection.connect(function (err) {
//   console.log('conexão com o banco de dados realizada com sucesso!');
// });

connection.query('Select * from usuarios', function (err, rows, fields) {
  if (!err) {
    console.log('Resultado:', rows);
  } else {
    console.log('Erro: consulta não retornou dados!');
  }
});

connection.query(function (err) {
  var sql =
    "INSERT INTO usuarios (user_name, password) VALUES ('gabriel', 996531172)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('1 record inserted');
  });
});
