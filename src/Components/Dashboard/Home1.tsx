import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

import { ref, onValue, query, orderByChild, limitToLast, set } from 'firebase/database';
import { database } from '../../../firebaseConfig';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import Alert from '../Alert/Alert';
import GreenFodderIntro from './hydroharmony';

const Layout1 = () => {
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
      <GreenFodderIntro/>
      </div>
    </div>
  );
};

export default Layout1;
