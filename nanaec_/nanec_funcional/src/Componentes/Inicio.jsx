import { Link, useNavigate } from 'react-router-dom';

function Incio() {
  const navigate = useNavigate();
  const handleLista = () => {
    navigate("/lista");
  }
  const handleCrear = () => {
    navigate("/crear");
  }
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
      
    </div>
  );
}

export default Incio;
