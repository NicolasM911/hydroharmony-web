import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import LineCharHum from '../LineChart/LineCharHum';
import LineChartTemperature from '../LineChart/LineCharTemperature';
import { CardHumidity } from '../Card/CardHumidity';
import { CardTemperature } from '../Card/CardTemperature';
import { CardTimestamp } from '../Card/CardTimeStamp';
import ActivateIrrigationCard from '../Card/ActivateIrrigationCard';
import { ref, onValue, query, orderByChild, limitToLast, set } from 'firebase/database';
import { database } from '../../../firebaseConfig';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { CardSoilMoisture } from '../Card/CardSoilMoisture';
import LineChartHumSoil from '../LineChart/LineCharHumSoil';
import Alert from '../Alert/Alert';

const Layout = () => {
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success'); // Inicializa como 'success'
  const location = useLocation(); // Para manejar el estado de la ubicación

  useEffect(() => {
    const sensorDataRef = query(ref(database, 'sensorData'), orderByChild('timestamp'), limitToLast(1));
    const unsubscribeSensorData = onValue(sensorDataRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        if (data) {
          setTimestamp(new Date(data.timestamp).toLocaleString());
          setIsLoading(false);
        }
      });
    });

    return () => unsubscribeSensorData();
  }, []);

  useEffect(() => {
    // Maneja la alerta de inicio de sesión
    if (location.state && location.state.alertMessage) {
      const { alertMessage, alertType } = location.state as { alertMessage: string; alertType: 'success' | 'error' };
      setAlertMessage(alertMessage);
      setAlertType(alertType);
    }
  }, [location.state]);

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

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ml-16 md:ml-56 p-5">
        <Header />

        {/* Contenedor de la tarjeta de timestamp */}
        <div className="flex flex-col w-full mb-4">
          <CardTimestamp timestamp={timestamp} />
        </div>

        {/* Contenedor de las tarjetas y gráficas */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Contenedor de la tarjeta de humedad y su gráfica */}
          <div className="flex flex-col w-full md:w-1/3">
            <div className="mb-4">
              <CardHumidity />
            </div>
            <div className="flex-grow">
              <LineCharHum />
            </div>
          </div>

          {/* Contenedor de la tarjeta de temperatura y su gráfica */}
          <div className="flex flex-col w-full md:w-1/3">
            <div className="mb-4">
              <CardTemperature />
            </div>
            <div className="flex-grow">
              <LineChartTemperature />
            </div>
          </div>

          {/* Contenedor de la tarjeta de humedad del suelo y su gráfica */}
          <div className="flex flex-col w-full md:w-1/3">
            <div className="mb-4">
              <CardSoilMoisture />
            </div>
            <div className="flex-grow">
              <LineChartHumSoil />
            </div>
          </div>
        </div>

        {/* Tarjeta para activar el riego */}
        <div className="flex justify-center mt-6">
          <ActivateIrrigationCard onActivate={handleIrrigation} />
        </div>

        {alertMessage && (
          <div className="fixed bottom-5 right-5 z-50">
            <Alert
              message={alertMessage}
              type={alertType}
              onClose={handleCloseAlert}
            />
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
