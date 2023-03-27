const { conexao } = require('../conection');

//listar paciente
function getAllPatients(res) {
  conexao.query('SELECT * FROM pacientes', function (err, rows, fields) {
    if (err) {
      console.error('Erro ao executar consulta: ' + err.stack);
      return;
    }
    res.send(rows);
  });
}

// cadastrar paciente
async function registerPatients(req) {
  await conexao.query(
    `INSERT INTO pacientes (name, endereco, cpf) VALUES ('${req.body.nome}', '${req.body.endereco}', '${req.body.cpf}')`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro ao executar o cadastro: ' + err.stack);
        return;
      }
      console.log('Usuario inserido com sucesso!');
    },
  );
}

//editar paciente
function updatePatients(req) {
  // id, nomeEditar, endEditar, cpfEditar
  conexao.query(
    `update pacientes set name = '${req.body.nome}', password = '${req.body.endereco}', cpf = '${req.body.cpf}' where id = ${req.body.id}`,
    function (err, results, fields) {
      if (err) {
        console.error(
          'Erro ao executar o Edição no cadastro do paciente ' + err.stack,
        );
        return;
      }
      console.log('Edição concluida com sucesso!');
    },
  );
}

//excluir paciente
function deletePatients(req) {
  conexao.query(
    `delete from pacientes where id = ${req.body.id}`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro ao deletar o usuario - ' + err.stack);
        return;
      }
      return 'Delete concluido com sucesso!';
    },
  );
}
pacientMetods = {
  getAllPatients,
  registerPatients,
  updatePatients,
  deletePatients,
};
module.exports = pacientMetods;
