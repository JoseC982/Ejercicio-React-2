const Restaurante = require("../controllers/restaurante.controller");

module.exports=function(app){
    app.post("/restaurantes",Restaurante.createRestaurante);
    app.get("/restaurantes",Restaurante.getAllRestaurantes);
    app.get("/restaurantes/:id",Restaurante.getRestaurante);
    //app.get("/restaurantes/:repMin/:repMax",Restaurante.getRestXIntervaloReputacion);
    app.put("/restaurantes/:id",Restaurante.updateRestaurante)
    app.delete("/restaurantes/:id",Restaurante.deleteRestaurante)
    //app.post("/restaurantes",Restaurante.createRestauranteUnico)
}