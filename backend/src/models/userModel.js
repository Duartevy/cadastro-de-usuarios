// src/models/userModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
}, {
  timestamps: true, // Habilita timestamps
  createdAt: 'created_at', // Mapeia 'createdAt' para 'created_at'
  updatedAt: 'updated_at', // Mapeia 'updatedAt' para 'updated_at'
  tableName: 'users', // Garante que o Sequelize use o nome correto da tabela
});

module.exports = User;
