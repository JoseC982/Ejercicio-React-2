const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
//app es una instancia de express
//put, get, delete, son rutas que se pueden definir en express
//app.use() es un middleware, se va a ejecutar antes de todas las rutas
app.use(cors());
app.use(express.json()); // para poder recibir datos en formato JSON, funciones que se van a ejecutar antes de las funciones que coincidad con la peticion, parsea el json y transforma en objeto de js
app.use(express.urlencoded({extended:true}));

//const allRestaurantesRoutes = require("./server/routes/restaurante.routes");  //este es para usar mongodb
const allRestaurantesRoutes = require("./routes/restaurante.routes"); // este es para usar mysql
allRestaurantesRoutes(app);
//const allRestaurantesRoutes = require("./server/routes/restaurante.routes");  //este es para usar mongodb
const allTiposComidaRoutes = require("./routes/tipoComida.routes"); // este es para usar mysql
allTiposComidaRoutes(app);

const allMenuRoutes = require("./routes/menu.routes");
allMenuRoutes(app);

const allUsuariosRoutes = require("./routes/usuario.routes");
allUsuariosRoutes(app);

app.get('/', function (req, res) {
    res.send('¡Hola Mundo!');
});
app.listen(port, function () {
    console.log('server.js escuchando en el siguiente puerto', port);
});

//#region Codigo Anterior
/*
/// *************** de aqui para abajo no es necesario, esto era cuando aun no separabamos los archivos, model, controller,routes

app.listen(port, () => {
console.log("Server escuchando en el puerto", port);
})
app.get("/api/v1/restaurantes", (req, res) => {
    res.json(restaurantes);
});

// aqui se agrega un nuevo restaurante
app.post("/api/v1/restaurantes", (req, res) => {
    // req.body contendrá los datos del formulario desde Postman o desde React
    console.log(req.body);
    // podemos hacer push en el array de usuarios por ahora...
    // más tarde esto se insertará en una base de datos
    restaurantes.push(req.body);
    // siempre tendremos que responder con algo
    res.json({ status: "ok" });
});


// aqui se obtiene un restaurante por id
// si queremos obtener un usuario con un id específico, podemos hacer que el id sea parte de la url
// asegúrate de preceder la variable id con dos puntos `:`
app.get("/api/v1/restaurantes/:id", (req, res) => {
    // podemos obtener esta variable `id` de req.params
    const id = parseInt(req.params.id);
    console.log(req.params.id);
    if (id >= 0 && id < restaurantes.length - 1) {
        res.json(restaurantes[req.params.id]);
    }
    else {
        console.log("El id no es valido");
        res.status(404).json({ mensaje: "El id no es valido" });
        // asumiendo que este id es el índice del array de usuarios podríamos devolver un usuario de esta manera
    }
});

// aqui se actualiza un restaurante por id
app.put("/api/v1/restaurantes/:id", (req, res) => {
    // podemos obtener la variable `id` de req.params
    const id = parseInt(req.params.id);
    console.log(req.params.id);

    if (id >= 0 && id < restaurantes.length - 1) {// asumiendo que este id es el índice del array de usuarios podemos reemplazar el usuario así
        restaurantes[id] = req.body;
        // siempre debemos responder con algo
        res.json({ status: "ok" });
    } else {
        console.log("El id no es valido");
        res.status(404).json({ mensaje: "El id no es valido" });
    }
});



// aqui se elimina un restaurante por id
app.delete("/api/v1/restaurantes/:id", (req, res) => {
    // podemos obtener la variable `id` de req.params
    const id = parseInt(req.params.id);
    if (id >= 0 && id < restaurantes.length - 1) {
        // asumiendo que este id es el índice del array de usuarios podemos eliminar el usuario así
        console.log("Eliminando restaurante con id:", id);
        restaurantes.splice(id, 1); // elimina el restaurante con el id y se desplaza el resto de los elementos del array
        // siempre debemos responder con algo
        res.json({ status: "ok" });
    } else {
        console.log("El id no es valido");
        res.status(404).json({ mensaje: "El id no es valido" });
    }

});



app.get("/restaurantes/:id/:name", (req, response) => {
    console.log("Parametros:", req.params); // vamos a obtener los parametros de ruta
    response.json({ Nombre: "Restaurante San Joser", direccion: "Ladron de guevara" });
})
app.post("/restaurantes/", (req, response) => {
    console.log("Parametros:", req.params); // vamos a obtener los parametros de ruta
    //response.json({ Nombre: "Restaurante San Joser", direccion: "Ladron de guevara" }); // esta respuesta ya cierra la conexion por lo tanto, la siguiente respuesta no se va a ejecutar
    //response.send("¡Hola Mundo!");
    console.log("Cuerpo de la peticion:", req.body); // vamos a obtener el cuerpo de la peticion
    response.status(200).json({ mensaje: "El restaurante se recibio correctamente" }); // status se puede concatenar
})
*/
//#endregion