// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

// Chave secreta para JWT (deve ser configurada no .env)
const JWT_SECRET = process.env.JWT_SECRET;

const userController = {
  // Registro de usuário
  register: async (req, res) => {
    try {
      console.log("Dados recebidos:", req.body); // Log dos dados recebidos
      const { name, email, password, role } = req.body;

      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
      }

      // Criptografar senha
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role });

      res.status(201).json({ message: 'Usuário registrado com sucesso.', user: newUser });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  },

  // Login de usuário
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado.' });
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Senha incorreta.' });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login realizado com sucesso.', token });
    } catch (error) {
      console.error("Erro ao fazer login:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  },

  // Listar todos os usuários
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  },

  // Obter usuário por ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  },

  // Atualizar usuário
  updateUser: async (req, res) => {
    try {
      const { name, email, role } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      await user.update({ name, email, role });
      res.status(200).json({ message: 'Usuário atualizado com sucesso.', user });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  },

  // Excluir usuário
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      await user.destroy();
      res.status(204).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  },

  // Obter permissões do usuário
  getUserPermissions: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      res.status(200).json({ id: user.id, role: user.role });
    } catch (error) {
      console.error("Erro ao obter permissões do usuário:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  },

  // Resgatar informações do perfil do usuário
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      res.status(200).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      console.error("Erro ao resgatar informações do perfil do usuário:", error); // Log de erro
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
  }
};

module.exports = userController;
