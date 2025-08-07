import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListaRestaurantes from "./Componentes/ListaRestaurantes";
import CrearRestaurante from "./Componentes/CrearRestaurante";
import ComponenteAxios from './Componentes/ComponeteAxios';
import Login from './Componentes/Login';
import Inicio from './Componentes/Inicio';
import EditarRestaurante from './Componentes/EditarRestaurante';
import React, { useState } from 'react';
import LstRestJSon from './Componentes/ListaRestaurantesJSon';
import InicioUsuario from './Componentes/inicioUsuario';
import ProtectedRoute from './Componentes/ProtectedRoute';
import axios from 'axios';

function App() {
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

  const getRestaurante = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(baseURL + "restaurantes", config)
      .then(response => setRestaurantes(response.data))
      .catch(error => console.error("Error cargando restaurantes:", error));
  };

  const agregarRestaurante = (nuevoRestaurante) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post(baseURL + "restaurantes", nuevoRestaurante, config)
      .then(response => setRestaurantes((prev) => [...prev, response.data]))
      .catch(error => console.error("Error creando restaurante:", error));
  };

  const eliminarRestaurante = (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.delete(baseURL + "restaurantes/" + id, config)
      .then(() => setRestaurantes((prev) => prev.filter(r => r._id !== id))) // Cambió de r.id a r._id
      .catch(error => console.error("Error eliminando restaurantes:", error));
  };

  const editRestaurante = (restauranteActualizado) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.put(baseURL + "restaurantes/" + restauranteActualizado.id, restauranteActualizado, config)
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
          {/* Ruta pública - Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas solo para Administradores */}
          <Route
            path="/inicio"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Inicio />
              </ProtectedRoute>
            }
          />

          <Route
            path='/crear'
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <CrearRestaurante
                  state={state}
                  setState={setState}
                  agregarRestaurante={agregarRestaurante}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editRest/:id"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <EditarRestaurante
                  state={state}
                  setState={setState}
                  editRestaurante={editRestaurante}
                />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas solo para Clientes */}
          <Route
            path="/inicioUsuario"
            element={
              <ProtectedRoute allowedRoles={['Cliente']}>
                <InicioUsuario />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas para ambos roles */}
          <Route
            path="/lista"
            element={
              <ProtectedRoute allowedRoles={['Administrador', 'Cliente']}>
                <ListaRestaurantes
                  restaurantes={restaurantes}
                  eliminarRestaurante={eliminarRestaurante}
                  getRestaurante={getRestaurante}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lstRest"
            element={
              <ProtectedRoute allowedRoles={['Administrador', 'Cliente']}>
                <LstRestJSon />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;