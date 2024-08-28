import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../../../firebaseConfig'; // Ajusta la ruta según tu estructura
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; // Asegúrate de que la ruta es correcta

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Una vez que tenemos una respuesta, se detiene el spinner
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Muestra el spinner mientras se verifica la autenticación
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
