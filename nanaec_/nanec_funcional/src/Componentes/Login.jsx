import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerData, setRegisterData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    telefono: '',
    rol: 'Cliente',
    password: ''
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/";

  // Verificar si ya hay un token válido al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decodificar el token para obtener el rol
        const payload = JSON.parse(atob(token.split('.')[1]));
        const rol = payload.rol;
        
        // Verificar si el token no ha expirado
        if (payload.exp > Date.now() / 1000) {
          redirectByRole(rol);
        } else {
          // Token expirado, eliminarlo
          localStorage.removeItem('token');
        }
      } catch (error) {
        // Token inválido, eliminarlo
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const redirectByRole = (rol) => {
    if (rol === 'Administrador') {
      navigate('/inicio');
    } else if (rol === 'Cliente') {
      navigate('/inicioUsuario');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(baseURL + 'usuario/login', credentials);
      const { token } = response.data;
      
      // Guardar token en localStorage
      localStorage.setItem('token', token);
      
      // Decodificar el token para obtener el rol
      const payload = JSON.parse(atob(token.split('.')[1]));
      const rol = payload.rol;
      
      // Redirigir según el rol
      redirectByRole(rol);
      
    } catch (error) {
      console.error('Error de login:', error);
      alert('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);

    try {
      const response = await axios.post(baseURL + 'usuario/register', registerData);
      alert('Usuario registrado exitosamente');
      setShowRegisterModal(false);
      setRegisterData({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        telefono: '',
        rol: 'Cliente',
        password: ''
      });
    } catch (error) {
      console.error('Error de registro:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Error al registrar usuario');
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
    setRegisterData({
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      telefono: '',
      rol: 'Cliente',
      password: ''
    });
  };

  return (
    <>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '10px'
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        
        <button 
          onClick={openRegisterModal}
          style={{ 
            width: '100%', 
            padding: '10px', 
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Registrate
        </button>
      </div>

      {/* Modal de Registro */}
      {showRegisterModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90%',
            overflowY: 'auto'
          }}>
            <h3>Registro de Usuario</h3>
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={registerData.nombre}
                  onChange={handleRegisterChange}
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={registerData.apellido}
                  onChange={handleRegisterChange}
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={registerData.direccion}
                  onChange={handleRegisterChange}
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <input
                  type="number"
                  name="telefono"
                  placeholder="Teléfono"
                  value={registerData.telefono}
                  onChange={handleRegisterChange}
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <select
                  name="rol"
                  value={registerData.rol}
                  onChange={handleRegisterChange}
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="submit" 
                  disabled={registerLoading}
                  style={{ 
                    flex: 1,
                    padding: '10px', 
                    fontSize: '14px',
                    backgroundColor: registerLoading ? '#ccc' : '#28a745',
                    color: 'white',
                    border: 'none',
                    cursor: registerLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {registerLoading ? 'Registrando...' : 'Registrar'}
                </button>
                
                <button 
                  type="button"
                  onClick={closeRegisterModal}
                  style={{ 
                    flex: 1,
                    padding: '10px', 
                    fontSize: '14px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;