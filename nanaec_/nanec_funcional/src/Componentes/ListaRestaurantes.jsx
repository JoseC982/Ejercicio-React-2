import Restaurante from './Restaurante';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ListaRestaurantes({
  restaurantes,
  eliminarRestaurante,
  getRestaurante  // Esta función viene del App.js
}) {
  const [mensajeErrorLikesNegativos, setMensajeErrorLikesNegativos] = useState("");
  const [likesTotales, setLikesTotales] = useState(0);

  // Cargar restaurantes al montar el componente
  useEffect(() => {
    getRestaurante();
  }, []);

  console.log("Lista de Restaurantes:", restaurantes);

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
    navigate("/inicio"); // Cambié de "/" a "/inicio" para ir al menú correcto
  }

  const handleCrear = () => {
    navigate("/crear");
  }

  return (
    <div className="ListaRestaurantes">
      <button onClick={handleInicio}>Volver al inicio</button>
      <br /><br />
      <button onClick={handleCrear}>Crear un nuevo Restaurante</button>
      <br /><br />
      
      <h1>Cantidad likes: {likesTotales}</h1>
      {mensajeErrorLikesNegativos && (
        <h2 style={{ color: "red" }}>{mensajeErrorLikesNegativos}</h2>
      )}
      
      {/* Mostrar mensaje de carga si no hay restaurantes */}
      {restaurantes.length === 0 ? (
        <p>Cargando restaurantes...</p>
      ) : (
        restaurantes.map((restaurante, index) => (
          <Restaurante
            key={restaurante.id}  // Mejor usar _id como key
            id={restaurante.id}   
            nombre={restaurante.nombre}
            direccion={restaurante.direccion}
            tipo={restaurante.tipo}
            reputacion={restaurante.reputacion}
            UrlImagen={restaurante.UrlImagen}
            SumarLikes={SumarLikes}
            RestarDislikes={RestarDislikes}
            mensajeErrorLikesNegativo={mensajeErrorLikesNegativo}
            eliminarRestaurante={eliminarRestaurante}
          />
        ))
      )}
    </div>
  );
}

export default ListaRestaurantes;