const { mysql, config } = require('../conection');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function connect() {
    const connection = await mysql.createConnection(config);
    return connection;
}

async function register(req, res) {
    const connection = await connect();
    const { username, password, type } = req.body;

    try {
        // Valida se os campos estão presentes no corpo da solicitação
        if (!username || !password || !type) {
            return res
                .status(400)
                .json({ error: 'Algum dos dados não foi preenchido' });
        }

        // Insere o novo paciente no banco de dados
        const [result] = await connection.execute(
            'INSERT INTO usuarios (username, password, type) VALUES (?, ?, ?)',
            [username, password, type],
        );

        // Retorna o ID do novo usuário inserido
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function login(req, res) {
    const connection = await connect();
    const { username, password } = req.body

    const [userWithUsername] = await connection.query("SELECT * FROM usuarios WHERE username = ?", [username], (err) => {
        if (err) {
            console.log("Error: ", err);
        }
    });

    if (!userWithUsername) {
        return res.status(400).json({ message: "Usuário ou senha não batem!" });
    }

    if (userWithUsername[0]?.password !== password) {
        return res.status(400).json({ message: "Usuário ou senha não batem!" });
    }

    const jwtToken = jwt.sign(
        { 
            userId: userWithUsername[0].userId, 
            username: username 
        },
        process.env.JWT_SECRET
    )

    res.json({ 
        message: "Bem-vindo de volta!", 
        token: jwtToken, 
        type: userWithUsername[0].type,
        userId: userWithUsername[0].userId
    })
}

loginMethods = {
    login,
    register,
}

module.exports = loginMethods
