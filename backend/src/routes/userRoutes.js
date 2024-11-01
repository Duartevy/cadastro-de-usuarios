// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rota para registrar usuário
router.post('/register', userController.register);

// Rota para login de usuário
router.post('/login', userController.login);

// Rota para listar todos os usuários
router.get('/', userController.getAllUsers);

// Rota para obter um usuário específico pelo ID
router.get('/:id', userController.getUserById);

// Rota para atualizar um usuário
router.put('/:id', userController.updateUser);

// Rota para excluir um usuário
router.delete('/:id', userController.deleteUser);

// Rota para obter as permissões de um usuário específico
router.get('/permissions/:id', userController.getUserPermissions);

// Rota para resgatar informações do perfil do usuário
router.get('/profile/:id', userController.getUserProfile);

module.exports = router;
