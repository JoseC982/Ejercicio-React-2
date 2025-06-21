import { Link, useNavigate } from "react-router-dom";

function CrearRestaurante(props) {

    //Se define una función que se encarga de insertar un nuevo restaurante
    const handlerInsertar = () => {
        const nuevoRestaurante = {
            id: props.state.id,
            nombre: props.state.nombre,
            direccion: props.state.direccion,
            tipo: props.state.tipo,
            reputacion: props.state.reputacion,
            UrlImagen: props.state.UrlImagen
        };
        props.agregarRestaurante(nuevoRestaurante);
        alert("Restaurante creado exitosamente");
        console.log("Usuario agregado:", nuevoRestaurante); 
        (props.setState({ id: "", nombre: "", direccion: "", tipo: "", reputacion: "", UrlImagen: "" }))//Se limpia el formulario
    }

    //Se utiliza el hook useNavigate para navegar entre rutas
    const navigate = useNavigate();
    const handleInicio = () => {
        navigate("/");
    }
    const handleLista = () => {
        navigate("/lista");
    }

    return (
        <div className="CrearRestaurante">
            {/*<p>Se utiliza el hook useNavigate</p>*/}
            <button onClick={handleInicio}>Volver al Inicio</button>
            <br />
            <button onClick={handleLista}>Ver lista</button>
            <br />
            {/*
            <p>Se utiliza Link</p>
            <Link to="/">
                <button>Volver al Inicio</button>
            </Link>
            <Link to="/lista">
                <button>Ver Lista de Restaurantes</button>
            </Link>

            <label>Id:</label>
            <input type="text" value={props.state.id} onChange={(e) => props.setState({ ...props.state, id: e.target.value })} />
            <label>Nombre:</label>
            <input type="text" value={props.state.nombre} onChange={(e) => props.setState({ ...props.state, nombre: e.target.value })} />
            <label>Dirección:</label>
            <input type="text" value={props.state.direccion} onChange={(e) => props.setState({ ...props.state, direccion: e.target.value })} />
            <label>Tipo:</label>
            <select
                value={props.state.tipo}
                onChange={(e) => props.setState({ ...props.state, tipo: e.target.value })}
            >
                <option value="">Seleccione un tipo</option>
                <option value="Tradicional">Tradicional</option>
                <option value="Cafeteria">Cafeteria</option>
                <option value="Desayunos">Desayunos</option>
                <option value="Vegana">Vegana</option>
                <option value="Vegetariana">Vegetariana</option>
            </select>
            <label>Reputación:</label>
            <input type="number" value={props.state.reputacion} onChange={(e) => props.setState({ ...props.state, reputacion: e.target.value })} />
            <label>URL Imagen:</label>
            <input type="text" value={props.state.UrlImagen} onChange={(e) => props.setState({ ...props.state, UrlImagen: e.target.value })} />
            <button onClick={handlerInsertar}>Insertar</button>

        </div>
    );

}

export default CrearRestaurante;
