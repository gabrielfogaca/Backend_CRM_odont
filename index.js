const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
var path = require('path');
// const { mysql, config } = require('./conection');
const userMetod = require('./Routes/userMetods');
const { request } = require('http');

const port = 5000;

app.use(session({ secret: 'eB:4U:AHl~H6Zq]AI7=Z&-U=??$DU[l0`P/' }));
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
  }),
);
app.use(cors());

// const express = require('express');
const mysql = require('mysql2/promise');

const config = {
  host: '34.122.114.73',
  user: 'root',
  password: 'root123',
  database: 'dentista',
  port: '3306',
};

// Função para conectar ao banco de dados
async function connect() {
  const connection = await mysql.createConnection(config);
  return connection;
}

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
  // await userMetod.getAllusers();
  const connection = await connect();
  const [rows] = await connection.execute('SELECT * FROM usuarios');
  connection.end();
  res.json(rows);
});

// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
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
      'INSERT INTO usuarios (user_name, password) VALUES (?, ?)',
      [user_name, password],
    );

    // Retorna o ID do novo usuário inserido
    res.json({ id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para recuperar um usuário pelo ID
app.get('/users/:id', async (req, res) => {
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
});

// Rota para atualizar um usuário pelo ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const connection = await connect();
  await connection.execute(
    'UPDATE usuarios SET name = ?, password = ? WHERE id = ?',
    [name, email, id],
  );
  connection.end();
  res.json({ id, name, password });
});

// Rota para excluir um usuário pelo ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const connection = await connect();
  await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  connection.end();
  res.json({ message: 'User deleted' });
});

// Inicia o servidor
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
