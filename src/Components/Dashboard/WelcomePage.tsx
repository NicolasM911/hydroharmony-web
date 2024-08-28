import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { database, auth } from '../../../firebaseConfig';
import { ref, onValue, query, orderByChild, limitToLast, set } from 'firebase/database';
import './WelcomePage.css';
import Alert from '../Alert/Alert';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; // Asegúrate de que la ruta es correcta





const WelcomePage: React.FC = () => {
  const [humidity, setHumidity] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar el spinner
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sensorDataRef = query(ref(database, 'sensorData'), orderByChild('timestamp'), limitToLast(1));
    const unsubscribeSensorData = onValue(sensorDataRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        if (data) {
          setHumidity(data.humidity);
          setTemperature(data.temperature);
          setTimestamp(new Date(data.timestamp).toLocaleString());
        }
      });
    });
    return () => unsubscribeSensorData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.alertMessage) {
      const { alertMessage, alertType } = location.state as { alertMessage: string; alertType: 'success' | 'error' };
      setAlertMessage(alertMessage);
      setAlertType(alertType);
    }
  }, [location.state]);

  useEffect(() => {
    // Simula un tiempo de carga de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Limpia el temporizador si el componente se desmonta antes de que se ejecute
    return () => clearTimeout(timer);
  }, []);

  const handleIrrigation = () => {
    const irrigationRef = ref(database, 'sensorData/irrigation');
    set(irrigationRef, { activated: true })
      .then(() => {
        setAlertMessage('Riego activado');
        setAlertType('success');
      })
      .catch((error) => {
        console.error('Error al activar el riego:', error);
        setAlertMessage('Error al activar el riego');
        setAlertType('error');
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login'); // Redirige inmediatamente después de cerrar sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        setAlertMessage('Error al cerrar sesión');
        setAlertType('error');
      });
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <LoadingSpinner /> // Muestra el spinner mientras isLoading es true
      ) : (
        <>
          <h1 className="welcome-heading">HydroHarmony IoT Dashboard</h1>
          <div className="variables-container">
            <div className="variable-card">
              <h2>Humidity</h2>
              <p>{humidity !== null ? `${humidity}%` : 'Loading...'}</p>
            </div>
            <div className="variable-card">
              <h2>Temperature</h2>
              <p>{temperature !== null ? `${temperature}°C` : 'Loading...'}</p>
            </div>
            <div className="variable-card">
              <h2>Timestamp</h2>
              <p>{timestamp !== null ? timestamp : 'Loading...'}</p>
            </div>
          </div>
          <button className="irrigation-button" onClick={handleIrrigation}>Activate Irrigation</button>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>

          {alertMessage && (
            <Alert
              message={alertMessage}
              type={alertType}
              onClose={handleCloseAlert}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WelcomePage;
