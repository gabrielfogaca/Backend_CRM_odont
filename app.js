const { conexao } = require('./Conexao');
const listarUsuarios = require('./metodosUsuarios');

//listar usuario
listarUsuarios.listarUsuarios();

//cadastrar usuarios
listarUsuarios.cadastrarUsuarios(nome, senha);

//editar usuario
listarUsuarios.editarUsuarios(id, nomeEditar, passEditar);

//deletar usuario
listarUsuarios.deletarUsuarios(id_delete);

conexao.end(function (err) {
  if (err) {
    console.error('Erro ao fechar conexão com banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão Encerrada!');
});
