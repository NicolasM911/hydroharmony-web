import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig'; // Asegúrate de que la ruta sea correcta

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        // Redirige al usuario a la página de inicio o de inicio de sesión
        navigate('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Puedes manejar el error aquí si es necesario
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>; // Puedes personalizar este mensaje según tus necesidades
};

export default Logout;
