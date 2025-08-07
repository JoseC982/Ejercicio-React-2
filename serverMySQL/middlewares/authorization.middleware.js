/**
 * CONFIGURACIÓN E IMPORTACIONES
 */
require("dotenv").config();                     // Cargar variables de entorno
const jwt = require('jsonwebtoken');            // Librería para manejo de JWT
const User = require('../models/usuario.model'); // Modelo de usuarios

/**
 * MIDDLEWARE PRINCIPAL DE PROTECCIÓN
 * Verifica que el usuario tenga un token JWT válido
 * Extrae la información del usuario y la adjunta a la request
 */
module.exports.protect = async (req, res, next) => {
    console.log('🔍 MIDDLEWARE PROTECT - INICIANDO');
    console.log('Headers de authorization:', req.headers.authorization);
    
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token extraído: ', token);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token decodificado:', decoded); // Para verificar que incluye el id
            
            // Buscar usando _id (como está en tu modelo)
            req.user = await User.findOne({
                where: { _id: decoded.id }, // decoded.id contiene el _id del usuario
                attributes: { exclude: ['password'] } // Cambiar 'pass' por 'password'
            });
            console.log('Usuario encontrado:', req.user?._id, req.user?.rol);
            
            if (req.user) {
                console.log('✅ MIDDLEWARE PROTECT - USUARIO VÁLIDO, CONTINUANDO');
                next();
            } else {
                console.log('❌ MIDDLEWARE PROTECT - USUARIO NO ENCONTRADO');
                res.status(401).json({ message: 'User not found!' });
            }
            
        } catch (error) {
            console.log('❌ MIDDLEWARE PROTECT - ERROR:', error.message);
            res.status(401).json({ message: 'Not authorized!' });
        }
    } else {
        console.log('❌ MIDDLEWARE PROTECT - SIN TOKEN');
        res.status(401).json({ message: 'Not authorized, missed token!' });
    }
}

// Corregir adminOnly
module.exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.rol === 'Administrador') { // Cambiar role por rol
        next();
    } else {
        res.status(403).json({ message: 'Requiere acceso de administrador!' });
    }
};

// Corregir validateOwnResource
module.exports.validateOwnResource = (req, res, next) => {
    try {
        const userIdFromToken = req.user._id;          // Cambiar id por _id
        const userIdFromParams = parseInt(req.params.id);

        if (req.user.rol === 'Administrador') {        // Cambiar role por rol
            return next();
        }

        if (userIdFromToken === userIdFromParams) {
            return next();
        }

        return res.status(403).json({
            error: "Al parecer la información que usted desea editar no le pertenece"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};