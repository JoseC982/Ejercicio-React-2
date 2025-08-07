const Menu = require("../controllers/menu.controller");
const { protect, validateOwnResource, adminOnly } = require('../middlewares/authorization.middleware');

module.exports = function(app){
    app.post("/menu",protect, adminOnly, Menu.createMenu);
    app.get("/menu/:id",protect, Menu.getTipoComidaByRestauranteId);
    app.get("/api/v1/restaurantesByTipoC/:id",protect, Menu.getRestaurantesByTipoComidaId);
}