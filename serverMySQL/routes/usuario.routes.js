const usuario = require('../controllers/usuario.controller');
const { protect, validateOwnResource, adminOnly } = require('../middlewares/authorization.middleware');

//borrado, crear, actualizacion de restaurantes van a estar protegidos

module.exports=function(app){
    app.post("/usuario/register",usuario.createUser);
    app.post("/usuario/login",usuario.loginUser);
    app.get("/usuario", usuario.getAllUsuarios);
    app.get("/usuario/:id",protect, validateOwnResource, usuario.getUsuarioById);
    //app.get("/restaurantes/:repMin/:repMax",Restaurante.getRestXIntervaloReputacion);
    app.put("/usuario/:id", protect, validateOwnResource,usuario.updateUsuario)
    app.delete("/usuario/:id", protect, validateOwnResource,usuario.deleteUsuario)
    //app.post("/restaurantes",Restaurante.createRestauranteUnico)
}

