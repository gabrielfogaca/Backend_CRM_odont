const { mysql, config } = require('../conection');

// Função para conectar ao banco de dados
async function connect() {
  const connection = await mysql.createConnection(config);
  return connection;
}

//listar usuarios
async function getAllusers(req, res) {
  const connection = await connect();
  const [rows] = await connection.execute('SELECT * FROM usuarios');
  connection.end();
  res.json(rows);
}

// cadastrar usuarios
async function registerUser(req, res) {
  const connection = await connect();
  try {
    const { user_name, password, type } = req.body;

    // Valida se os campos user_name e password estão presentes no corpo da solicitação
    if (!user_name || !password || !type) {
      return res
        .status(400)
        .json({ error: 'User name and password are required' });
    }

    // Insere o novo usuário no banco de dados
    const [result] = await connection.execute(
      'INSERT INTO usuarios (user_name, password) VALUES (?, ?)',
      [user_name, password, type],
    );

    // Retorna o ID do novo usuário inserido
    res.json({ id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//editar usuarios
async function updateUser(req, res) {
  const { id } = req.params;
  const { user_name, password, type } = req.body;
  const connection = await connect();
  await connection.execute(
    'UPDATE usuarios SET user_name = ?, password = ?, type = ? WHERE id = ?',
    [user_name, password, type, id],
  );
  connection.end();
  res.json({ id, user_name, password, type });
}

//excluir usuarios
async function deleteUser(req, res) {
  const { id } = req.params;
  const connection = await connect();
  await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  connection.end();
  res.json({ message: 'User deleted' });
}

//Buscar usuario pelo ID
async function getUserByID(req, res) {
  const { id } = req.params;
  const connection = await connect();
  const [rows] = await connection.execute(
    'SELECT * FROM usuarios WHERE id = ?',
    [id],
  );
  connection.end();
  if (rows.length) {
    res.json(rows[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

userMetod = {
  getAllusers,
  registerUser,
  updateUser,
  deleteUser,
  getUserByID,
};
module.exports = userMetod;
