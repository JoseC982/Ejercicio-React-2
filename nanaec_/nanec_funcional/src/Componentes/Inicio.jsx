import { Link, useNavigate } from 'react-router-dom';

function Incio() {
  const navigate = useNavigate();
  
  const handleLista = () => {
    navigate("/lista");
  }
  
  const handleCrear = () => {
    navigate("/crear");
  }

  const handleLogout = () => {
    // Eliminar token del localStorage
    localStorage.removeItem('token');
    // Redirigir al login
    navigate('/');
  };

  return (
    <div className="Inicio">
      <h1>
        Bienvenido a la Aplicación de Restaurantes
      </h1>
      <p>Se utiliza el hook useNavigate</p>
      <button onClick={handleLista}>Ver lista de restaurantes</button>
      <button onClick={handleCrear}>Crear nuevo restaurante</button>
      <br /><br />
      <p>Se utiliza Link</p>
      <Link to="/lista">
        <button>Ir a Restaurantes</button>
      </Link>
      <Link to="/crear">
        <button>Crear Restaurante</button>
      </Link>

      <Link to="/lstRest">
        <button>Ir a Clientes y Restaurantes con Json</button>
      </Link>

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
      
    </div>
  );
}

export default Incio;