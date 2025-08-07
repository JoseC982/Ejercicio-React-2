const Restaurante = require("../controllers/restaurante.controller");
const { protect, validateOwnResource, adminOnly } = require('../middlewares/authorization.middleware');

module.exports=function(app){
    app.post("/restaurantes", protect, adminOnly, Restaurante.createRestaurante);
    app.get("/restaurantes",protect, Restaurante.getAllRestaurantes);
    app.get("/restaurantes/:id",protect, Restaurante.getRestaurante);
    //app.get("/restaurantes/:repMin/:repMax",Restaurante.getRestXIntervaloReputacion);
    app.put("/restaurantes/:id",protect, adminOnly, Restaurante.updateRestaurante)
    app.delete("/restaurantes/:id",protect, adminOnly, Restaurante.deleteRestaurante)
    //app.post("/restaurantes",Restaurante.createRestauranteUnico)
}