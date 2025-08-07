import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

function InicioUsuario() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar token del localStorage
    localStorage.removeItem('token');
    // Redirigir al login
    navigate('/');
  };

  const handleVerRestaurantes = () => {
    navigate("/lista");
  };

  return (
    <div className="InicioUsuario" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bienvenido Usuario</h1>
      <p>Panel de Usuario - Aplicación de Restaurantes</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Opciones disponibles:</h3>
        
        {/* Usando useNavigate */}
        <div style={{ marginBottom: '10px' }}>
          <button 
            onClick={handleVerRestaurantes}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              margin: '5px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Ver Lista de Restaurantes
          </button>
        </div>

        {/* Usando Link */}
        <div style={{ marginBottom: '10px' }}>
          <Link to="/lista">
            <button style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              margin: '5px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Explorar Restaurantes
            </button>
          </Link>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Link to="/lstRest">
            <button style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              margin: '5px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Ver Restaurantes y Clientes (JSON)
            </button>
          </Link>
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <div style={{ borderTop: '1px solid #ccc', paddingTop: '20px', marginTop: '30px' }}>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Como usuario, puedes ver los restaurantes pero no crear, editar o eliminar.</p>
      </div>
    </div>
  );
}

export default InicioUsuario;