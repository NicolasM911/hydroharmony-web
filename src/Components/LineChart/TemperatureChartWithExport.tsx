import React, { useState, useEffect } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../../../firebaseConfig'; // Asegúrate de que la ruta es correcta

const TemperatureChartWithExport: React.FC = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    { name: 'Temperatura', data: [] }
  ]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const sensorDataRef = query(ref(database, 'sensorData'), orderByChild('timestamp'), limitToLast(60));

    onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      const temperatures: { temperature: number; time: string }[] = [];

      Object.keys(data).forEach((key) => {
        const point = data[key];
        const timestampDate = new Date(point.timestamp);
        temperatures.push({
          temperature: point.temperature,
          time: timestampDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      });

      // Ordena los datos por tiempo
      const sortedTemperatures = temperatures.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.time}`).getTime();
        const timeB = new Date(`1970-01-01T${b.time}`).getTime();
        return timeA - timeB;
      });

      // Separa los datos de temperatura y las categorías
      setSeries([{ name: 'Temperatura', data: sortedTemperatures.map((item) => item.temperature) }]);
      setCategories(sortedTemperatures.map((item) => item.time));
    });
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        format: 'HH:mm', // Formato de las etiquetas en el eje X
      },
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Temperatura',
      align: 'left',
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TemperatureChartWithExport;
