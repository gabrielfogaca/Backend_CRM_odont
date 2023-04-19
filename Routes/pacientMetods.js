const { mysql, config } = require('../conection');

// Função para conectar ao banco de dados
async function connect() {
  const connection = await mysql.createConnection(config);
  return connection;
}

//listar pacientes
async function getAllPatients(req, res) {
  const connection = await connect();
  const [pacientes] = await connection.execute('SELECT * FROM pacientes');
  connection.end();
  res.json(pacientes);
}

// cadastrar pacientes
async function registerPatients(req, res) {
  const connection = await connect();
  try {
    const { name, phone, email, cpf, birthdate } = req.body;

    // Valida se os campos estão presentes no corpo da solicitação
    if (!name || !phone || !email || !cpf || !birthdate) {
      return res
        .status(400)
        .json({ error: 'Algum dos dados não foi preenchido corretamente' });
    }

    // Insere o novo paciente no banco de dados
    const [result] = await connection.execute(
      'INSERT INTO pacientes (name, phone, email, cpf, birthdate) VALUES (?, ?, ?, ?, ?)',
      [name, phone, email, cpf, birthdate],
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
  const { patientId } = req.params;
  const { name, phone, email, cpf, birthdate } = req.body;
  const connection = await connect();
  await connection.execute(
    'UPDATE pacientes SET name = ?, phone = ?, email = ?, cpf = ?, birthdate = ? WHERE patientId = ?',
    [name, phone, email, cpf, birthdate, addresses, patientId],
  );
  connection.end();
  res.json({
    patientId,
    name,
    phone,
    email,
    cpf,
    birthdate,
  });
}

//excluir pacientes
async function deletePatients(req, res) {
  const { id } = req.params;
  const connection = await connect();
  await connection.execute('DELETE FROM pacientes WHERE patientId = ?', [id]);
  connection.end();
  res.json({ message: 'Paciente deletedo' });
}

//Buscar pacientes pelo ID
async function getPatientByID(req, res) {
  const { id } = req.params;
  const connection = await connect();
  const [rows] = await connection.execute(
    'SELECT * FROM pacientes WHERE patientId = ?',
    [id],
  );
  connection.end();
  if (rows.length) {
    res.json(rows[0]);
  } else {
    res.status(404).json({ message: 'Paciente não encontrado!' });
  }
}

//Buscar tudo do pacientes pelo ID
async function getEverythingFromPatientByID(req, res) {
  const { id } = req.params;
  const connection = await connect();
  const [pacientes] = await connection.execute(
    'SELECT * FROM pacientes WHERE patientId = ?',
    [id],
  );
  const [consultas] = await connection.execute(
    'SELECT * FROM consultas where patientId = ?',
    [id],
  );
  const [enderecos] = await connection.execute(
    'SELECT * FROM enderecos where patientId = ?',
    [id],
  );
  pacientes[0]['addresses'] = enderecos;
  pacientes[0]['appointments'] = consultas;

  connection.end();
  if (pacientes.length) {
    res.json(pacientes);
  } else {
    res.status(404).json({ message: 'Paciente não encontrado!' });
  }
}

// cadastrar pacientes
async function registerPatientsWithaddress(req, res) {
  const connection = await connect();
  try {
    const { name, phone, email, cpf, birthdate } = req.body;

    // Valida se os campos estão presentes no corpo da solicitação
    if (!name || !phone || !email || !cpf || !birthdate) {
      return res
        .status(400)
        .json({ error: 'Algum dos dados não foi preenchido corretamente' });
    }

    // Insere o novo paciente no banco de dados
    const [result] = await connection.execute(
      'INSERT INTO pacientes (name, phone, email, cpf, birthdate) VALUES (?, ?, ?, ?, ?)',
      [name, phone, email, cpf, birthdate],
    );

    // Retorna o ID do novo usuário inserido
    return result.insertId;
    res.json({ id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

pacientMetods = {
  getAllPatients,
  registerPatients,
  updatePatients,
  deletePatients,
  getPatientByID,
  getEverythingFromPatientByID,
  registerPatientsWithaddress,
};
module.exports = pacientMetods;
