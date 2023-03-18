const { conexao } = require('./Conexao');

//listar usuarios
function listarUsuarios() {
  console.log('Conexão estabelecida!');
  conexao.query('SELECT * FROM usuarios', function (err, rows, fields) {
    if (err) {
      console.error('Erro ao executar consulta: ' + err.stack);
      return;
    }
    console.log('Resultado da consulta: ', rows);
  });
}

// cadastrar usuarios
function cadastrarUsuarios(nome, senha) {
  conexao.query(
    `INSERT INTO usuarios (user_name, password) VALUES ('${nome}', '${senha}')`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro ao executar o cadastro: ' + err.stack);
        return;
      }
      console.log('Valores inseridos com sucesso!');
    },
  );
}

//editar usuarios
function editarUsuarios(id, nomeEditar, passEditar) {
  conexao.query(
    `update usuarios set user_name = '${nomeEditar}', password = '${passEditar}'  where id = ${id}`,
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
function deletarUsuarios(id_delete) {
  conexao.query(
    `delete from usuarios where id = ${id_delete}`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro ao deletar o usuario - ' + err.stack);
        return;
      }
      console.log('Delete concluido com sucesso!');
    },
  );
}

module.exports = {
  listarUsuarios,
  cadastrarUsuarios,
  editarUsuarios,
  deletarUsuarios,
};
