import { useState, useEffect } from 'react';
import { LineChart } from "@tremor/react";
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../../../firebaseConfig';

const LineChartTemperature = () => {
  const [chartData, setChartData] = useState<{ time: string; temperature: number }[]>([]);
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null);
  const [latestTemperature, setLatestTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sensorDataRef = query(ref(database, 'sensorData'), orderByChild('timestamp'), limitToLast(60));

    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data: { [key: string]: { temperature: number; timestamp: string } } = snapshot.val();
      if (data) {
        const formattedData = Object.values(data).map((item: { temperature: number; timestamp: string }) => {
          const timestampDate = new Date(item.timestamp);
          return {
            time: timestampDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: item.temperature,
          };
        });

        // Ordenar los datos por tiempo
        const sortedData = formattedData.sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a.time}`).getTime();
          const timeB = new Date(`1970-01-01T${b.time}`).getTime();
          return timeA - timeB;
        });

        // Actualizar el último registro y timestamp
        if (sortedData.length > 0) {
          const lastEntry = sortedData[sortedData.length - 1];
          setLatestTemperature(lastEntry.temperature);
          setLatestTimestamp(lastEntry.time);
        } else {
          setLatestTimestamp(null);
          setLatestTemperature(null);
        }

        setChartData(sortedData);
      } else {
        setChartData([]);
        setLatestTimestamp(null);
        setLatestTemperature(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando datos...</p> // Muestra un mensaje de carga si los datos aún no están disponibles
      ) : (
        <>
          {/* Mostrar el último registro y timestamp */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Gráfica de Temperatura Ambiental</h2>
            <p>Última actualización: {latestTimestamp} / {latestTemperature}°C</p>
          </div>

          {/* Mostrar la gráfica */}
          <LineChart
            className="h-40"
            data={chartData}
            index="time"
            categories={["temperature"]}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat().format(number).toString()}°C`
            }
            yAxisWidth={40}
            startEndOnly={false}
            connectNulls={false}
            showLegend={false}
            showTooltip={true}
          />
        </>
      )}
    </div>
  );
};

export default LineChartTemperature;
