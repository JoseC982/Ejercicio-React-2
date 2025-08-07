const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const TipoComida = sequelize.define('TipoComida', {   //la tabla se va a llamar Restaurante
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
    paisOrigen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Pais de origen is required" }
        }
    }
});
module.exports = TipoComida;