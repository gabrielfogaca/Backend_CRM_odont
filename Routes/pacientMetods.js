const { mysql, config } = require('../conection');

// Função para conectar ao banco de dados
async function connect() {
  const connection = await mysql.createConnection(config);
  return connection;
}

//listar pacientes
async function getAllPatients(req, res) {
  const connection = await connect();
  const [rows] = await connection.execute('SELECT * FROM pacientes');
  connection.end();
  res.json(rows);
}

// cadastrar pacientes
async function registerPatients(req, res) {
  const connection = await connect();
  try {
    const { user_name, password } = req.body;

    // Valida se os campos user_name e password estão presentes no corpo da solicitação
    if (!user_name || !password) {
      return res
        .status(400)
        .json({ error: 'User name and password are required' });
    }

    // Insere o novo usuário no banco de dados
    const [result] = await connection.execute(
      'INSERT INTO pacientes (user_name, password) VALUES (?, ?)',
      [user_name, password],
    );

    // Retorna o ID do novo usuário inserido
    res.json({ id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//editar pacientes
async function updatePatients(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  const connection = await connect();
  await connection.execute(
    'UPDATE pacientes SET name = ?, password = ? WHERE id = ?',
    [name, email, id],
  );
  connection.end();
  res.json({ id, name, password });
}

//excluir pacientes
async function deletePatients(req, res) {
  const { id } = req.params;
  const connection = await connect();
  await connection.execute('DELETE FROM pacientes WHERE id = ?', [id]);
  connection.end();
  res.json({ message: 'User deleted' });
}

//Buscar pacientes pelo ID
async function getPatientByID(req, res) {
  const { id } = req.params;
  const connection = await connect();
  const [rows] = await connection.execute(
    'SELECT * FROM pacientes WHERE id = ?',
    [id],
  );
  connection.end();
  if (rows.length) {
    res.json(rows[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

pacientMetods = {
  getAllPatients,
  registerPatients,
  updatePatients,
  deletePatients,
  getPatientByID,
};
module.exports = pacientMetods;
