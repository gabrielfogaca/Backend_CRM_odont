require("dotenv").config();
const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
var path = require('path');
const userMetod = require('./Routes/userMetods');
const loginMethods = require('./Routes/login');
const pacientMetods = require('./Routes/pacientMetods');
const consultMetods = require('./Routes/consultMetods');
const addressesMetods = require('./Routes/addressesMetods');
const { request } = require('http');
const { json } = require('express');

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

//############## LOGIN ############################

app.post("/login", async (req, res) => {
  await loginMethods.login(req, res)
})

app.post("/register", async (req, res) => {
  await loginMethods.register(req, res)
})

//############## USUARIOS ############################

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

//############## PACIENTES ############################

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

//############## CONSULTAS ############################

// Rota para listar todos as consultas
app.get('/consults', async (req, res) => {
  await consultMetods.getAllConsults(req, res);
});

// Rota para criar uma nova consultas
app.post('/consults', async (req, res) => {
  await consultMetods.registerConsults(req, res);
});

// Rota para recuperar uma consulta pelo ID
app.get('/consults/:id', async (req, res) => {
  await consultMetods.getConsultByID(req, res);
});

// Rota para atualizar uma consultas pelo ID
app.put('/consults/:id', async (req, res) => {
  await consultMetods.updateConsults(req, res);
});

// Rota para excluir uma consultas pelo ID
app.delete('/consults/:id', async (req, res) => {
  await consultMetods.deleteConsults(req, res);
});

//############## ENDEREÇOS ############################

// Rota para listar todos os endereços
app.get('/addresses/patient/:id', async (req, res) => {
  await addressesMetods.getAllPatientAddresses(req, res);
});

// Rota para criar um novo endereço
app.post('/addresses', async (req, res) => {
  await addressesMetods.registerAddresses(req, res);
});

// Rota para recuperar um endereço pelo ID
app.get('/addresses/:id', async (req, res) => {
  await addressesMetods.getAddressesByID(req, res);
});

// Rota para atualizar um endereço pelo ID
app.put('/addresses/:id', async (req, res) => {
  await addressesMetods.updateConsults(req, res);
});

// Rota para excluir um endereço pelo ID
app.delete('/addresses/:id', async (req, res) => {
  await addressesMetods.deleteConsults(req, res);
});

//cadastrar paciente com endereço
app.post('/patientWithAddress', async (req, res) => {
  await pacientMetods.registerPatientsWithaddress(req, res);
});

// Inicia o servidor
app.listen(port, () => {
  console.log('Server running on port 5000');
});
