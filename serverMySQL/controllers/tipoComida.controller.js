const TipoComida = require('../models/tipoComida.model');

// CREAR UN NUEVO TIPO DE COMIDA
module.exports.createTipoComida = async (request, response) => {  //async va en la definicion de la funcion, siempre va aqui
    const { nombre, paisOrigen } = request.body;
    try {
        const tipoComida = await TipoComida.create({ nombre, paisOrigen });    //await va a permitir esperar a resolver la promesa
        response.json(tipoComida);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo crear el tipo de comida' }); //response.status(500).json(err);
    }
}

module.exports.getAllTipoComida = async (_, response) => {
    try {
        const tipoComida = await TipoComida.findAll()
        response.json(tipoComida)
    } catch (err) {
        response.status(500).json({ message: 'No se pudo obtener todos los tipos de comida' });
    }

}
// ACTUALIZAR UN RESTAURANTE

module.exports.updateTipoComida = async (request, response) => {
    try {
        // Se actualiza el usuario
        const [updatedRowCount] = await TipoComida.update(request.body, { // muestra la cantidad de registros modificados
            where: { _id: request.params.id }
        });
        // Se verifica si se ha actualizado algún registro
        if (updatedRowCount) {
            // Recupera la información actualizada del usuario
            console.log(request.params);
            const updatedTipoComida = await TipoComida.findOne({ where: { _id: request.params.id } }); 
            console.log("El tipo de comida  se actualizo exitosamente");
            response.json(updatedTipoComida);
        } else {
            response.status(404).json({ message: "Tipo de comida no encontrado" });
        }
    } catch (err) {
        response.status(500).json({ message: 'No se pudo actualizar el tipo de comida', err: err });
    }
};

// ELIMINAR UN RESTAURANTE
module.exports.deleteTipoComida = async (request, response) => {
    try {
        const tipoComida = await TipoComida.findOne({ where: { _id: request.params.id } });
        if (!tipoComida) {
            return response.status(404).json({ message: "Tipo de comida no encontrado" });
        }
        await TipoComida.destroy({ where: { _id: request.params.id } });
        response.json(tipoComida);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo eliminar el tipo de comida' });
    }
};

// BUSCAR USUARIO POR ITEM
module.exports.getTipoComida = async (request, response) => {
    try {
        const tipoComida = await TipoComida.findOne({ where: { _id: request.params.id } }); 
        response.json(tipoComida);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo obtener el tipo de comida con esa id' });
    }
};

