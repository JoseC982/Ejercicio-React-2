const User = require('../models/usuario.model');
require("dotenv").config();             // Importa el módulo dotenv para cargar variables de entorno
const jwt = require("jsonwebtoken");    // Importa la biblioteca jwt para generar tokens
const bcrypt = require("bcryptjs");     // Importa la biblioteca bcrypt para encriptar contraseñas

// Aqui se crea el token
const generateToken = (id) => {      // Al token se le puede enviar los atributos que creamos necesarios
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
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


// Login
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ where: { email: email }});
    console.log(password, userFound.password);
    if (userFound && (await bcrypt.compare(password, userFound.password))) {
        console.log(password, userFound.password);
        res.json({ message: 'Login User', email: userFound.email, nombre: userFound.nombre, token: generateToken(userFound._id) })
    } else {
        res.status(400).json({ message: 'Login Failed' })
    }
}


module.exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
}


module.exports.getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado.` });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
}


module.exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRowsCount, updatedUsuarios] = await Usuario.update(req.body, {
            where: { _id: id },
            returning: true, // Necesario para obtener el objeto actualizado en PostgreSQL, pero no en MySQL
            plain: true // Para MySQL, esto ayuda a obtener el objeto actualizado si 'returning' no funciona directamente
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado para actualizar.` });
        }

        // Para MySQL, si 'returning: true' no devuelve el objeto actualizado directamente,
        // puedes hacer una nueva consulta para obtenerlo.
        const usuarioActualizado = await Usuario.findByPk(id);
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: 'Error de validación al actualizar', errors });
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El email ya está registrado por otro usuario.', field: 'email' });
        }
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
