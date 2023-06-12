const { mysql, config } = require('../conection');

// Função para conectar ao banco de dados
async function connect() {
  const connection = await mysql.createConnection(config);
  return connection;
}

//listar consultas
async function getAllConsults(req, res) {
  const connection = await connect();
  const [rows] = await connection.execute('SELECT * FROM consultas');
  connection.end();
  res.json(rows);
}

// cadastrar consultas
async function registerConsults(req, res) {
  const connection = await connect();
  try {
    const { date, time, situation, patientId, patientName, observation } = req.body;

    // Valida se os campos estão presentes no corpo da solicitação
    // if (!date || !time || !patientId) {
    //   return res
    //     .status(400)
    //     .json({ error: 'Algum dos dados não foi preenchido corretamente' });
    // }

    // Insere a nova consulta no banco de dados
    const [result] = await connection.execute(
      'INSERT INTO consultas (date, time, patientId, patientName, situation, observation) VALUES (?, ?, ?, ?, ?, ?)',
      [date, time, patientId, patientName, situation, observation],
    );

    // Retorna o ID da nova consulta inserida
    return res.status(201).send()
    // res.json({ id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//editar consultas
async function updateConsults(req, res) {
  // const { id } = req.params;
  const { date, time, situation, patientId, patientName, observation, appointmentId } = req.body;
  console.log(req.body);
  console.log(req.params);
  const connection = await connect();
  await connection.execute(
    'UPDATE consultas SET date = ?, time = ?, situation = ?, patientId = ?, patientName = ?, observation = ? WHERE appointmentId = ?',
    [date, time, situation, patientId, patientName, observation, appointmentId],
  );
  connection.end();
  res.json({ 
    appointmentId, 
    date, 
    time, 
    situation, 
    patientId, 
    patientName, 
    observation 
  });
}

//excluir consultas
async function deleteConsults(req, res) {
  const { id } = req.params;
  const connection = await connect();
  await connection.execute('DELETE FROM consultas WHERE appointmentId = ?', [
    id,
  ]);
  connection.end();
  res.json({ message: 'Consulta deleteda' });
}

//Buscar consultas pelo ID
async function getConsultByID(req, res) {
  const { id } = req.params;
  const connection = await connect();
  const [rows] = await connection.execute(
    'SELECT * FROM consultas WHERE appointmentId = ?',
    [id],
  );
  connection.end();
  if (rows.length) {
    res.json(rows[0]);
  } else {
    res.status(404).json({ message: 'Paciente não encontrado!' });
  }
}

// busca todas as consultas com situacao = Consultas de Emergência
async function getEmergencyAppointments(req, res) {
  const connection = await connect()
  const [emeregencyAppointments] = await connection.execute('SELECT * FROM consultas WHERE situation = "Consulta de Emergência"')
  connection.end()
  res.json(emeregencyAppointments.length)
}

// busca todas as consultas do dia
async function getTodayAppointments(req, res) {
  const connection = await connect()
  const [todayAppointments] = await connection.execute('SELECT * FROM consultas WHERE date = curdate()')
  connection.end()
  res.json(todayAppointments.length)
}

consultMetods = {
  getAllConsults,
  registerConsults,
  updateConsults,
  deleteConsults,
  getConsultByID,
  getEmergencyAppointments,
  getTodayAppointments,
};
module.exports = consultMetods;
