const Restaurante = require('../models/restaurante.model');

/*module.exports.createRestaurante = (request, response) => {
    const { nombre, direccion, tipo, reputacion, UrlImagen } = request.body;
    Restaurante.create({
        nombre, direccion, tipo, reputacion, UrlImagen
    })
        .then(restaurante => response.json(Restaurante))
        .catch(err => response.status(400).json(err));
}*/

module.exports.createRestaurante = async (request, response) => {  //async va en la definicion de la funcion, siempre va aqui
    const { nombre, direccion, tipo, reputacion, UrlImagen } = request.body;
    try {
        const restaurante = await Restaurante.create({ nombre, direccion, tipo, reputacion, UrlImagen });    //await va a permitir esperar a resolver la promesa
        response.json(restaurante);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo crear el usuario' }); //response.status(500).json(err);
    }
}

module.exports.getAllRestaurantes = async (_, response) => {
    try {
        const restaurantes = await Restaurante.findAll()
        response.json(restaurantes)
    } catch (err) {
        response.status(500).json(err);
    }

}
// ACTUALIZAR UN RESTAURANTE

module.exports.updateRestaurante = async (request, response) => {
    try {
        // Se actualiza el usuario
        const [updatedRowCount] = await Restaurante.update(request.body, { // muestra la cantidad de registros modificados
            where: { _id: request.params.id }
        });
        // Se verifica si se ha actualizado algún registro
        if (updatedRowCount) {
            // Recupera la información actualizada del usuario
            console.log(request.params);
            const updatedRestaurante = await Restaurante.findOne({ where: { _id: request.params.id } }); 
            console.log("El restaurante se actualizo exitosamente");
            response.json(updatedRestaurante);
        } else {
            response.status(404).json({ message: "Restaurante no encontrado" });
        }
    } catch (err) {
        response.status(500).json({ message: 'No se pudo actualizar el usuario', err: err });
    }
};

// ELIMINAR UN RESTAURANTE
module.exports.deleteRestaurante = async (request, response) => {
    try {
        const restaurante = await Restaurante.findOne({ where: { _id: request.params.id } });
        if (!restaurante) {
            return response.status(404).json({ message: "Restaurrante no encontrado" });
        }
        await Restaurante.destroy({ where: { _id: request.params.id } });
        response.json(restaurante);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo eliminar el usuario' });
    }
};

// BUSCAR USUARIO POR ITEM
module.exports.getRestaurante = async (request, response) => {
    try {
        const restaurante = await Restaurante.findOne({ where: { _id: request.params.id } }); response.json(restaurante);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo obtener el usuario con esa id' });
    }
};

