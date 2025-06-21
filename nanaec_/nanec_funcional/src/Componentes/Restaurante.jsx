import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Restaurante.css";
function Restaurante(props) {

    const { index, id, nombre, direccion, tipo, UrlImagen, SumarLikes, RestarDislikes, reputacion, eliminarRestaurante } = props;

    const [preferencias, setPreferencias] = useState({
        likes: 0,
        dislikes: 0,
    });
    //Podría ocurrir que esta linea no funcione, dado que 
    //react busca la optimización, y solo renderiza cuando
    //es necesario. Espera varias operaciones antes de renderizar
    //

    const handlerLike = () => {
        //setLikes(likes + 1); //Forma correcta de modificar el estado
        setPreferencias(prevPreferencias => {

            //Se crea una copia del estado actual   
            return { ...prevPreferencias, likes: prevPreferencias.likes + 1 }
        });
        SumarLikes();
    }


    const estrellas = () => {
        let resultado = '';
        for (let i = 0; i < reputacion; i++) {
            resultado += '⭐';
        }
        return resultado;
    };




    const handlerDislike = () => {
        setPreferencias(prevPreferencias => {
            //setDislikes(prevDislikes => prevDislikes - 1);
            return { ...prevPreferencias, dislikes: prevPreferencias.dislikes - 1 }

        });
        RestarDislikes();
    }



    return (
        <div className="Restaurante">
            <img src={UrlImagen} alt="" />
            <h3>{id}</h3>
            <h1>{nombre}</h1>
            <h3>{direccion}</h3>
            <h4>{tipo}</h4>
            <h4>Reputación: {estrellas()}</h4>
            <h4>Me gusta:{preferencias.likes}</h4>
            <h4>No me gusta:{preferencias.dislikes}</h4>
            <button onClick={handlerLike}>👍</button>
            <button onClick={handlerDislike}>👎</button>
            <button onClick={() => eliminarRestaurante(id)}>eliminar</button>
            <Link to={`/editRest/${id}`}>
                <button>Editar Restaurante</button>
            </Link>


        </div>
    );

}

export default Restaurante;
