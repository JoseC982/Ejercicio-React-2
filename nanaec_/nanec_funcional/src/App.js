import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListaRestaurantes from "./Componentes/ListaRestaurantes";
import CrearRestaurante from "./Componentes/CrearRestaurante";
import ComponenteAxios from './Componentes/ComponeteAxios';
import Inicio from './Componentes/Inicio';
import EditarRestaurante from './Componentes/EditarRestaurante';
import React, { useState, useEffect } from 'react';
import LstRestJSon from './Componentes/ListaRestaurantesJSon';
import axios from 'axios';

function App() {
  // Estado vacío, los datos se cargarán desde el backend
  const baseURL = "http://localhost:8000/";
  const [restaurantes, setRestaurantes] = useState([]);
  const [state, setState] = useState({
    id: "",
    nombre: "",
    direccion: "",
    tipo: "",
    reputacion: "",
    UrlImagen: "",
  });

  // Cargar restaurantes desde el backend al montar el componente
  useEffect(() => {
    getRestaurante();
  }, []);

  const getRestaurante = () => {
    axios.get(baseURL + "restaurantes")
      .then(response => setRestaurantes(response.data))
      .catch(error => console.error("Error cargando restaurantes:", error));
  }

  const agregarRestaurante = (nuevoRestaurante) => {
    axios.post(baseURL + "restaurantes", nuevoRestaurante)
      .then(response => setRestaurantes((prev) => [...prev, response.data]))
      .catch(error => console.error("Error cargando restaurantes:", error));
  };

  const eliminarRestaurante = (id) => {
    console.log("El id a eliminar es: ", id);
    axios.delete(baseURL + "restaurantes/" + id)
      .then(() => setRestaurantes((prev) => prev.filter(r => r.id !== id)))
      .catch(error => console.error("Error eliminando restaurantes:", error));
  };

  const editRestaurante = (restauranteActualizado) => {
    console.log("El id a actualizar es: ", restauranteActualizado.id);
    axios.put('http://localhost:3001/restaurantes/' + restauranteActualizado.id, restauranteActualizado)
      .then(response => {
        setRestaurantes(prevrestaurantes => prevrestaurantes.map(rest =>
          rest.id === restauranteActualizado.id ? response.data : rest
        ));
      })
      .catch(error => console.error("Error actualizando restaurante:", error));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path='/crear' element={
            <CrearRestaurante
              state={state}
              setState={setState}
              agregarRestaurante={agregarRestaurante}
            />
          }
          />
          <Route
            path="/lista"
            element={
              <ListaRestaurantes
                restaurantes={restaurantes}
                eliminarRestaurante={eliminarRestaurante}
              />
            }
          ></Route>
          <Route path="/lstRest" element={<LstRestJSon />} />
          <Route path="/editRest/:id" element=
            {<EditarRestaurante
              state={state}
              setState={setState}
              editRestaurante={editRestaurante}
            />
            } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;