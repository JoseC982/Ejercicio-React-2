import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // Decodificar el token para verificar si no ha expirado
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    // Si el token ha expirado, eliminarlo y redirigir
    if (payload.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/" replace />;
    }

    // Si se especifican roles permitidos, verificar que el usuario tenga uno de ellos
    if (allowedRoles.length > 0 && !allowedRoles.includes(payload.rol)) {
      return <Navigate to="/" replace />;
    }

    // Si todo está bien, renderizar el componente hijo
    return children;
  } catch (error) {
    // Token inválido, eliminarlo y redirigir
    localStorage.removeItem('token');
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;