const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Certifique-se de que o caminho está correto

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conecta ao MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado com sucesso'))
.catch(err => console.error('Erro ao conectar com o MongoDB', err));

// Usa as rotas
app.use('/api', routes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
