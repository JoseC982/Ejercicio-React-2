const TipoComida = require("../controllers/tipoComida.controller");

module.exports=function(app){
    app.post("/tipoComida",TipoComida.createTipoComida);
    app.get("/tipoComida",TipoComida.getAllTipoComida);
    app.get("/tipoComida/:id",TipoComida.getTipoComida);
    //app.get("/restaurantes/:repMin/:repMax",Restaurante.getRestXIntervaloReputacion);
    app.put("/tipoComida/:id",TipoComida.updateTipoComida)
    app.delete("/tipoComida/:id",TipoComida.deleteTipoComida)
    //app.post("/restaurantes",Restaurante.createRestauranteUnico)
}