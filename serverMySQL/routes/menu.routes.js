const Menu = require("../controllers/menu.controller");

module.exports = function(app){
    app.post("/menu",Menu.createMenu);
    app.get("/menu/:id",Menu.getTipoComidaByRestauranteId);
    app.get("/api/v1/restaurantesByTipoC/:id",Menu.getRestaurantesByTipoComidaId);
}