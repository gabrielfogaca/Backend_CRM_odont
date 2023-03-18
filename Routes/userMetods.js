const { conexao } = require('../conection');

//listar usuarios
function getAllusers(res) {
  console.log('Conexão estabelecida!');
  conexao.query('SELECT * FROM usuarios', function (err, rows, fields) {
    if (err) {
      console.error('Erro ao executar consulta: ' + err.stack);
      return;
    }
    res.send(rows);
  });
}

// cadastrar usuarios
function registerUser(req) {
  conexao.query(
    `INSERT INTO usuarios (user_name, password) VALUES ('${req.body.nome}', '${req.body.password}')`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro ao executar o cadastro: ' + err.stack);
        return;
      }
      console.log('Usuario inserido com sucesso!');
    },
  );
}

//editar usuarios
function updateUser(req) {
  // id, nomeEditar, passEditar
  conexao.query(
    `update usuarios set user_name = '${req.body.nome}', password = '${req.body.password}'  where id = ${req.body.id}`,
    function (err, results, fields) {
      if (err) {
        console.error(
          'Erro ao executar o Edição no cadastro do usuario ' +
            { nomeEditar } +
            ' - ' +
            err.stack,
        );
        return;
      }
      console.log('Edição concluida com sucesso!');
    },
  );
}

//excluir usuarios
function deleteUser(req) {
  conexao.query(
    `delete from usuarios where id = ${req.body.id}`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro ao deletar o usuario - ' + err.stack);
        return;
      }
      return 'Delete concluido com sucesso!';
    },
  );
}
userMetod = {
  getAllusers,
  registerUser,
  updateUser,
  deleteUser,
};
module.exports = userMetod;
