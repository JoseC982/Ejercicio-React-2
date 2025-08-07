const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Restaurante = sequelize.define('Restaurante', {   //la tabla se va a llamar Restaurante
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
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Direccion is required" }
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Tipo is required" }
        }
    },
    reputacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "La reputación es requerida" },
            min: { args: [1], msg: "La reputación mínima es 1" },
            max: { args: [5], msg: "La reputación máxima es 5" }
        }
    },
    UrlImagen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "URL is required" }
        }
    }
});
module.exports = Restaurante;