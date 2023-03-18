const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
var path = require('path');
const { conexao } = require('./conection');
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

app.get('/users', (req, res) => {
  userMetod.getAllusers(res);
});

app.post('/users', (req, res) => {
  userMetod.registerUser(req);
});

app.put('/users', (req, res) => {
  userMetod.updateUser(req);
});

app.delete('/users', (req, res) => {
  userMetod.deleteUser(req);
});

app.listen(port, () => {
  console.log('Rodando na port 5000...');
});
