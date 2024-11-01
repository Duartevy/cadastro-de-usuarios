// src/app.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Backend funcionando na porta 3001');
});

sequelize.sync()  // Sincroniza o modelo com o banco
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


  