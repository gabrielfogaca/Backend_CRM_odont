const { mysql, config } = require('../conection');

// Função para conectar ao banco de dados
async function connect() {
  const connection = await mysql.createConnection(config);
  return connection;
}

//listar usuarios
async function getAllusers(res) {
  const connection = await connect();
  const [rows] = await connection.execute('SELECT * FROM usuarios');
  connection.end();
  console.log(rows);
  console.log('conexão encerrada');
  return res.json(rows);
}

// cadastrar usuarios
async function registerUser(req) {}

//editar usuarios
async function updateUser(req) {}

//excluir usuarios
async function deleteUser(req) {}

userMetod = {
  getAllusers,
  registerUser,
  updateUser,
  deleteUser,
};
module.exports = userMetod;
