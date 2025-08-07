const TipoComida = require("../controllers/tipoComida.controller");
const { protect, validateOwnResource, adminOnly } = require('../middlewares/authorization.middleware');

module.exports=function(app){
    app.post("/tipoComida",protect, adminOnly,TipoComida.createTipoComida);
    app.get("/tipoComida",protect,TipoComida.getAllTipoComida);
    app.get("/tipoComida/:id",protect, TipoComida.getTipoComida);
    //app.get("/restaurantes/:repMin/:repMax",Restaurante.getRestXIntervaloReputacion);
    app.put("/tipoComida/:id",protect, adminOnly,TipoComida.updateTipoComida)
    app.delete("/tipoComida/:id",protect, adminOnly,TipoComida.deleteTipoComida)
    //app.post("/restaurantes",Restaurante.createRestauranteUnico)
}