const Menu = require("../models/menu.model");
const TipoComida = require('../models/tipoComida.model');
const Restaurante = require('../models/restaurante.model');

// crear un registro en la tabla menu
module.exports.createMenu = async(req,res) => {
    try{
        const { menuDate, RestauranteId, TipoComidaId} = req.body;
        const menu = await Menu.create({menuDate, RestauranteId, TipoComidaId});
        res.json(menu);
    } catch (err) {
        res.status(500).json({msg: "Ocurrio un problema al crear un menu"});
    }
}

//Permita obtener los tipos de comida que ofrece un resstaurante por id
module.exports.getTipoComidaByRestauranteId = async(req,res) => {
    try {
        const { id } = req.params;
        const tiposComida = await TipoComida.findAll({
            include: [{
                model: Restaurante,
                where: { _id: id }
            }]
        });
        res.json(tiposComida);
    } catch (err) {
        res.status(500).json({msg: "Ocurrio un problema al obtener los tipos de comida del restaurante"});
    }
}


//Permita obtener los restaurantes por tipo de comida, recibe el id como parametro de ruta, hace una validacion si no existe el id, sale un mensaje, "No existen restaurantes que ofrezcan este tipo de comida", si existe, retorna los restaurantes que ofrecen ese tipo de comida
module.exports.getRestaurantesByTipoComidaId = async(req,res) => {
    try {
        const { id } = req.params;
        const restaurantes = await Restaurante.findAll({
            include: [{
                model: TipoComida,
                where: { _id: id }
            }]
        });
        if (restaurantes.length === 0) {
            return res.status(404).json({ msg: "No existen restaurantes que ofrezcan este tipo de comida" });
        }
        res.json(restaurantes);
    } catch (err) {
        res.status(500).json({ msg: "Ocurrio un problema al obtener los restaurantes por tipo de comida" });
    }
}