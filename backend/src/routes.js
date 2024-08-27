const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./User'); // Certifique-se de que o caminho está correto

const routes = express.Router();

// Rota para login
routes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca o usuário no banco de dados
        const user = await User.findOne({ email });
        
        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Responde com o usuário
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

module.exports = routes;
