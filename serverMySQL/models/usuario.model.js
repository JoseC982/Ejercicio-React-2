const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Usuario = sequelize.define('Usuario', {   //la tabla se va a llamar Usuario
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notNull: { msg: "Id is requiered" }
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Nombre is required" }
        }
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Nombre is required" }
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Direccion is required" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notNull: { msg: "Email is required" }
        }
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Numero de telefono is required" }
        }
    },
    rol: {
        type: DataTypes.ENUM('Administrador', 'Cliente'),
        allowNull: false,
        defaultValue: 'Cliente',
        validate: {
            notNull: { msg: "Rol is required" }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Password is required" }
        }
    }
});
module.exports = Usuario;