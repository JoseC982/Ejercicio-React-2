import React from 'react';

function Login() {
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;