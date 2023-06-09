const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
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
        type: DataTypes.ENUM("normal", "admin"),
        allowNull: false,
        defaultValue: 'admin',
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'available'
    }

});

module.exports = User;
