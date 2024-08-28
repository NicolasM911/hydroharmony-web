// src/Components/IrrigationRecords/IrrigationRecords.tsx
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../firebaseConfig';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const IrrigationRecords = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const irrigationRecordsRef = ref(database, 'sensorData/irrigationRecords');
    const unsubscribe = onValue(irrigationRecordsRef, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach((childSnapshot) => {
        data.push(childSnapshot.val());
      });
      setRecords(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ml-16 md:ml-56 p-5">
        <Header />
        <div className="flex flex-col w-full mb-4">
          <h2 className="text-xl font-bold mb-4">Registros de Riego</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.activated ? 'Activado' : 'Desactivado'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationRecords;
