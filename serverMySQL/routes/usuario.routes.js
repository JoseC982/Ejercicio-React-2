const usuario = require('../controllers/usuario.controller');
//borrado, crear, actualizacion de restaurantes van a estar protegidos

module.exports=function(app){
    app.post("/usuario/register",usuario.createUser);
    app.post("/usuario/login",usuario.loginUser);
    app.get("/usuario",usuario.getAllUsuarios);
    app.get("/usuario/:id",usuario.getUsuarioById);
    //app.get("/restaurantes/:repMin/:repMax",Restaurante.getRestXIntervaloReputacion);
    app.put("/usuario/:id",usuario.updateUsuario)
    app.delete("/usuario/:id",usuario.deleteUsuario)
    //app.post("/restaurantes",Restaurante.createRestauranteUnico)
}

