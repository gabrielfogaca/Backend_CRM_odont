const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
var path = require('path');
const userMetod = require('./Routes/userMetods');
const pacientMetods = require('./Routes/pacientMetods');
const consultMetods = require('./Routes/consultMetods');
const { request } = require('http');

const port = process.env.PORT || 5000;

// app.use(session({ secret: 'eB:4U:AHl~H6Zq]AI7=Z&-U=??$DU[l0`P/' }));
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
  }),
);
app.use(cors());

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
  await userMetod.getAllusers(req, res);
});

// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
  await userMetod.registerUser(req, res);
});

// Rota para recuperar um usuário pelo ID
app.get('/users/:id', async (req, res) => {
  await userMetod.getUserByID(req, res);
});

// Rota para atualizar um usuário pelo ID
app.put('/users/:id', async (req, res) => {
  await userMetod.updateUser(req, res);
});

// Rota para excluir um usuário pelo ID
app.delete('/users/:id', async (req, res) => {
  await userMetod.deleteUser(req, res);
});

// Rota para listar todos os pacientes
app.get('/patients', async (req, res) => {
  await pacientMetods.getAllPatients(req, res);
});

// Rota para criar um novo pacientes
app.post('/patients', async (req, res) => {
  await pacientMetods.registerPatients(req, res);
});

// Rota para recuperar um pacientes pelo ID
app.get('/patient/:id', async (req, res) => {
  await pacientMetods.getPatientByID(req, res);
});

// Rota para buscar tudo de um pacientes pelo ID
app.get('/patients/:id', async (req, res) => {
  await pacientMetods.getEverythingFromPatientByID(req, res);
});

// Rota para atualizar um pacientes pelo ID
app.put('/patients/:id', async (req, res) => {
  await pacientMetods.updatePatients(req, res);
});

// Rota para excluir um pacientes pelo ID
app.delete('/patients/:id', async (req, res) => {
  await pacientMetods.deletePatients(req, res);
});

// Rota para listar todos os pacientes
app.get('/consults', async (req, res) => {
  await consultMetods.getAllConsults(req, res);
});

// Rota para criar um novo pacientes
app.post('/consults', async (req, res) => {
  await consultMetods.registerConsults(req, res);
});

// Rota para recuperar um pacientes pelo ID
app.get('/consults/:id', async (req, res) => {
  await consultMetods.getConsultByID(req, res);
});

// Rota para atualizar um pacientes pelo ID
app.put('/consults/:id', async (req, res) => {
  await consultMetods.updateConsults(req, res);
});

// Rota para excluir um pacientes pelo ID
app.delete('/consults/:id', async (req, res) => {
  await consultMetods.deleteConsults(req, res);
});

app.post('/inserirpaciente', async (req, res) => {
  await pacientMetods.teste(req, res);
});

// Inicia o servidor
app.listen(port, () => {
  console.log('Server running on port 5000');
});
