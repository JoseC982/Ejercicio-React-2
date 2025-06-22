import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Importar useState
import axios from "axios";

function EditarRest(props) {
    const { id } = useParams(); // Obtener el id de la URL
    const navigate = useNavigate(); // Hook de navegación
    const [restaurante, setRestaurante] = useState({ // Estado para almacenar los datos del restaurante
        id: "",
        nombre: "",
        direccion: "",
        tipo: "",
        reputacion: "",
        UrlImagen: ""
    });

    const handlerActualizar = () => {
        const restauranteActualizado = {
            id: restaurante.id, // Ahora usamos `restaurante` en lugar de `props.state`
            nombre: restaurante.nombre,
            direccion: restaurante.direccion,
            tipo: restaurante.tipo,
            reputacion: restaurante.reputacion,
            UrlImagen: restaurante.UrlImagen
        };

        console.log("El id a actualizar es el siguiente: ", restauranteActualizado.id);
        console.log("Restaurante actualizado:", restauranteActualizado);

        // Aquí se llama a la función que actualizará el restaurante en App.js
        props.editRestaurante(restauranteActualizado);

        alert("Restaurante actualizado exitosamente");

        // Limpiar el formulario después de la actualización (opcional)
        // props.setState({ id: "", nombre: "", direccion: "", tipo: "", reputacion: "", UrlImagen: "" });
    };

    // Cargar restaurante desde el backend al montar el componente
    useEffect(() => {
        getRestauranteXid();
    }, []); // Se ejecuta una vez al cargar el componente

    // Función para obtener el restaurante por id
    const getRestauranteXid = () => {
        axios.get('http://localhost:3001/restaurantes/' + id)
            .then(response => {
                setRestaurante(response.data); // Actualizar el estado con los datos del restaurante
            })
            .catch(error => console.error("Error cargando restaurante:", error));
    };

    // Función para navegar al inicio
    const handleInicio = () => {
        navigate("/");
    };

    // Función para navegar a la lista de restaurantes
    const handleLista = () => {
        navigate("/lista");
    };

    return (
        <div className="CrearRestaurante">
            <h1>Editar Restaurante</h1>
            <h3>El id del restaurante seleccionado es: {id}</h3>

            <button onClick={handleInicio}>Volver al Inicio</button>
            <button onClick={handleLista}>Ver lista</button>
            <br /><br />

            {/* Mostrar datos del restaurante en los campos del formulario */}
            <label>Id:</label>
            <input type="text" value={restaurante.id} readOnly />

            <label>Nombre:</label>
            <input
                type="text"
                value={restaurante.nombre}
                onChange={(e) => setRestaurante({ ...restaurante, nombre: e.target.value })}
            />

            <label>Dirección:</label>
            <input
                type="text"
                value={restaurante.direccion}
                onChange={(e) => setRestaurante({ ...restaurante, direccion: e.target.value })}
            />

            <label>Tipo:</label>
            <select
                value={restaurante.tipo}
                onChange={(e) => setRestaurante({ ...restaurante, tipo: e.target.value })}
            >
                <option value="">Seleccione un tipo</option>
                <option value="Italiana">Italiana</option>
                <option value="China">China</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Japonesa">Japonesa</option>
                <option value="Vegetariana">Vegetariana</option>
            </select>

            <label>Reputación:</label>
            <input
                type="number"
                value={restaurante.reputacion}
                onChange={(e) => setRestaurante({ ...restaurante, reputacion: e.target.value })}
            />

            <label>URL Imagen:</label>
            <input
                type="text"
                value={restaurante.UrlImagen}
                onChange={(e) => setRestaurante({ ...restaurante, UrlImagen: e.target.value })}
            />

            <button onClick={handlerActualizar}>Guardar Cambios</button>
        </div>
    );
}

export default EditarRest;
