
import Restaurante from './Restaurante';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
function ListaRestaurantes({
  restaurantes,
  eliminarRestaurante
}) {
  const [mensajeErrorLikesNegativos, setMensajeErrorLikesNegativos] = useState("");
  const [likesTotales, setLikesTotales] = useState(0);
  console.log(restaurantes);

  const SumarLikes = () => setLikesTotales((prev) => prev + 1);

  const RestarDislikes = () => {
    if (likesTotales <= 0) {
      mensajeErrorLikesNegativo("No se puede restar más likes");
      return;
    }
    setLikesTotales((prev) => prev - 1);
  };

  const mensajeErrorLikesNegativo = (mensaje) => {
    setMensajeErrorLikesNegativos(mensaje);
    setTimeout(() => setMensajeErrorLikesNegativos(""), 3000);
  };

  const navigate = useNavigate();

  const handleInicio = () => {
    navigate("/");
  }
  const handleCrear = () => {
    navigate("/crear");
  }
  console.log("Lista de Restaurantes:", restaurantes);


  console.log("Lista de Restaurantes:", restaurantes);

  return (
    <div className="ListaRestaurantes">
      {/*<p>Se utiliza el hook useNavigate</p>*/}
      <button onClick={handleInicio}>Volver al incio</button>
      <br /><br />
      <button onClick={handleCrear}>Crear un nuevo Restaurante</button>
      <br /><br />
      {/*
      <p>Se utiliza Link</p>
      <Link to="/">
        <button>Volver al Inicio</button>
      </Link>
      */}
      <h1>Cantidad likes: {likesTotales}</h1>
      {mensajeErrorLikesNegativos && (
        <h2 style={{ color: "red" }}>{mensajeErrorLikesNegativos}</h2>
      )}
      {restaurantes.map((restaurantes, index) => (
        <Restaurante
          key={index}
          id={restaurantes._id}   //aqui se actualizo de id a _id porque eso es lo que retorna de la bdd
          nombre={restaurantes.nombre}
          direccion={restaurantes.direccion}
          tipo={restaurantes.tipo}
          reputacion={restaurantes.reputacion}
          UrlImagen={restaurantes.UrlImagen}
          SumarLikes={SumarLikes}
          RestarDislikes={RestarDislikes}
          mensajeErrorLikesNegativo={mensajeErrorLikesNegativo}
          eliminarRestaurante={eliminarRestaurante}
        />
      ))}
    </div>
  );
}

export default ListaRestaurantes;
