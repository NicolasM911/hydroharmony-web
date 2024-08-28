import React, { useState, useEffect } from 'react';
import { Card } from '@tremor/react';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../../../firebaseConfig'; // Asegúrate de que la ruta es correcta

export const CardHumidity: React.FC = () => {
  const [humidity, setHumidity] = useState<number | null>(null);

  useEffect(() => {
    // Consulta a Firebase para obtener el último valor de humedad
    const sensorDataRef = query(ref(database, 'sensorData'), orderByChild('timestamp'), limitToLast(1));
    const unsubscribeSensorData = onValue(sensorDataRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        if (data) {
          setHumidity(data.humidity); // Guarda el valor de humedad
        }
      });
    });

    return () => unsubscribeSensorData();
  }, []);

  return (
    <Card
      className="max-w-xs mx-auto flex flex-col items-center justify-center p-4"
      decoration="top"
      decorationColor="blue" // Cambia el color según tu preferencia
    >
      {/* Muestra el título con estilo de texto */}
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content text-center whitespace-pre-line">
        SENSOR DTH-11{'\n'}Humedad Ambiental
      </p>
      
      {/* Muestra el valor de humedad */}
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
        {humidity !== null ? `${humidity}%` : 'Loading...'} {/* Si no hay datos, muestra "Loading..." */}
      </p>
    </Card>
  );
};
