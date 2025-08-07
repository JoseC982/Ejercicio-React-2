const User = require('../models/usuario.model');
require("dotenv").config();             // Importa el módulo dotenv para cargar variables de entorno
const jwt = require("jsonwebtoken");    // Importa la biblioteca jwt para generar tokens
const bcrypt = require("bcryptjs");     // Importa la biblioteca bcrypt para encriptar contraseñas

// Aquí se crea el token
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,        // Cambio de _id a id
            email: user.email,
            rol: user.rol
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );
}   //aqui se añade el tiempo de expiracion

// Registro
module.exports.createUser = async (request, response) => {
    const { nombre, apellido, direccion, email, telefono, rol, password } = request.body;
    console.log(request.body);
    if (!nombre || !apellido || !direccion || !email || !telefono || !rol || !password) {
        response.status(400).json({ message: 'Missing fields, all are mandatory!' });
    } else {
        console.log(email);
        const userFound = await User.findOne({ where: { email: request.body.email } });
        console.log('Usuario encontrado: ', userFound);
        if (userFound) {
            response.status(400).json({ message: 'User already exist' });
        } else {
            const salt = await bcrypt.genSalt(10);      //aunque las contraseñas sean iguales, el hash es distinto, añadiendo asi una capa mas de seguridad
            const hashedPassword = await bcrypt.hash(password, salt);

            try {
                const newUser = await User.create({ nombre, apellido, direccion, email, telefono, rol, password: hashedPassword });    //await va a permitir esperar a resolver la promesa
                response.json(newUser);
            } catch (err) {
                response.status(500).json({ message: 'No se pudo crear el usuario' }); //response.status(500).json(err);
            }
        }
    }
}


// Corregir el loginUser
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ where: { email: email }});
        
        if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        
        console.log('Password ingresado:', password);
        console.log('Password en BD:', userFound.password);
        console.log('ID del usuario:', userFound._id); // Cambiar de userFound.id a userFound._id
        
        if (await bcrypt.compare(password, userFound.password)) {
            const token = generateToken(userFound);
            
            res.json({ 
                message: 'Login exitoso', 
                email: userFound.email, 
                nombre: userFound.nombre,
                rol: userFound.rol,
                token: token 
            });
        } else {
            res.status(400).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Corregir getAllUsuarios
module.exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll(); // Cambiar Usuario por User
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
}

// Corregir getUsuarioById
module.exports.getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findOne({ where: { _id: id } }); // Usar _id y User

        if (!usuario) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado.` });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
}

// Corregir updateUsuario
module.exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRowsCount] = await User.update(req.body, { // Usar User
            where: { _id: id }
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado para actualizar.` });
        }

        const usuarioActualizado = await User.findOne({ where: { _id: id } });
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
}


module.exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowsCount = await Usuario.destroy({
            where: { _id: id }
        });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado para eliminar.` });
        }
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
}
