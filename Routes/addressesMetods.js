const { mysql, config } = require('../conection');

// Função para conectar ao banco de dados
async function connect() {
  const connection = await mysql.createConnection(config);
  return connection;
}

//listar endereços
async function getAllPatientAddresses(req, res) {
  const { id } = req.params;
  const connection = await connect();
  const [rows] = await connection.execute('SELECT * FROM enderecos WHERE patientId = ?', [id]);
  connection.end();
  res.json(rows);
}

// cadastrar endereços
async function registerAddresses(req, res) {
  const connection = await connect();
  try {
    const { street, number, district, city, state, cep, patientId } = req.body;

    // Valida se os campos estão presentes no corpo da solicitação
    if (
      !street ||
      !number ||
      !district ||
      !city ||
      !state ||
      !cep ||
      !patientId
    ) {
      return res
        .status(400)
        .json({ error: 'Algum dos dados não foi preenchido corretamente' });
    }

    // Insere o novo endereços no banco de dados
    const [result] = await connection.execute(
      'INSERT INTO enderecos ( street, number, district, city, state, cep, patientId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [street, number, district, city, state, cep, patientId],
    );

    // Retorna o ID do novo endereço inserido
    res.json({ id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//editar endereços
async function updateAddresses(req, res) {
  const { id } = req.params;
  const { street, number, district, city, state, cep, patientId } = req.body;
  console.log(req.body);
  console.log(req.params);
  const connection = await connect();
  await connection.execute(
    'UPDATE enderecos SET street = ?, number = ?, district = ?, city = ?, state = ?, cep = ?, patientId = ?, WHERE addressId = ?',
    [street, number, district, city, state, cep, patientId],
  );
  connection.end();
  res.json({ street, number, district, city, state, cep, patientId });
}

//excluir endereços
async function deleteAddresses(req, res) {
  const { id } = req.params;
  const connection = await connect();
  await connection.execute('DELETE FROM enderecos WHERE addressId = ?', [id]);
  connection.end();
  res.json({ message: 'Endereço deleteda' });
}

//Buscar endereços pelo ID
async function getAddressesByID(req, res) {
  const { id } = req.params;
  const connection = await connect();
  const [rows] = await connection.execute(
    'SELECT * FROM enderecos WHERE patientId = ?',
    [id],
  );
  connection.end();
  res.json(rows);
}

addressesMetods = {
  getAllPatientAddresses,
  registerAddresses,
  updateAddresses,
  deleteAddresses,
  getAddressesByID,
};
module.exports = addressesMetods;
